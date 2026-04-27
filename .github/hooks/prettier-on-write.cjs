const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const WRITE_TOOL_NAMES = new Set(["apply_patch", "create_file"]);

function readStdin() {
  try {
    return fs.readFileSync(0, "utf8").trim();
  } catch {
    return "";
  }
}

function parsePayload(raw) {
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function findValue(input, predicate) {
  if (!input || typeof input !== "object") return undefined;

  if (predicate(input)) return input;

  for (const value of Object.values(input)) {
    if (!value || typeof value !== "object") continue;
    const match = findValue(value, predicate);
    if (match) return match;
  }

  return undefined;
}

function getToolName(payload) {
  return (
    payload.toolName ||
    payload.tool_name ||
    payload.tool?.name ||
    payload.name ||
    findValue(payload, (value) => typeof value.toolName === "string")
      ?.toolName ||
    findValue(payload, (value) => typeof value.name === "string" && value.input)
      ?.name
  );
}

function getToolInput(payload) {
  return (
    payload.toolInput ||
    payload.tool_input ||
    payload.input ||
    payload.tool?.input ||
    findValue(
      payload,
      (value) =>
        value &&
        typeof value === "object" &&
        (value.toolInput || value.tool_input || value.input),
    )?.toolInput ||
    findValue(
      payload,
      (value) =>
        value &&
        typeof value === "object" &&
        (value.toolInput || value.tool_input || value.input),
    )?.tool_input ||
    findValue(
      payload,
      (value) =>
        value &&
        typeof value === "object" &&
        (value.toolInput || value.tool_input || value.input),
    )?.input ||
    {}
  );
}

function extractPatchPaths(patchText) {
  if (typeof patchText !== "string") return [];

  const matches = patchText.matchAll(/^\*\*\* (Add|Update) File: (.+)$/gm);
  return Array.from(matches, (match) => match[2].trim());
}

function normalizeFilePath(filePath) {
  if (typeof filePath !== "string" || filePath.length === 0) return undefined;
  return path.normalize(
    path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath),
  );
}

function collectCandidateFiles(toolName, toolInput) {
  const candidates = new Set();

  if (typeof toolInput?.filePath === "string") {
    candidates.add(toolInput.filePath);
  }

  if (toolName === "apply_patch" && typeof toolInput?.input === "string") {
    for (const filePath of extractPatchPaths(toolInput.input)) {
      candidates.add(filePath);
    }
  }

  return Array.from(candidates)
    .map(normalizeFilePath)
    .filter(
      (filePath) =>
        filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile(),
    );
}

function getPrettierInfo(filePath) {
  const result = runPnpm(["exec", "prettier", "--file-info", filePath]);

  return JSON.parse(result);
}

function formatFiles(filePaths) {
  if (filePaths.length === 0) return;

  runPnpm(["exec", "prettier", "--write", ...filePaths]);
}

function runPnpm(args) {
  if (process.platform === "win32") {
    const command = ["pnpm", ...args].map(quoteForCmd).join(" ");

    return execFileSync("cmd.exe", ["/d", "/s", "/c", command], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  }

  return execFileSync("pnpm", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function quoteForCmd(value) {
  if (!/[\s"]/u.test(value)) return value;
  return `"${value.replaceAll('"', '""')}"`;
}

function main() {
  const payload = parsePayload(readStdin());
  const toolName = getToolName(payload);

  if (!WRITE_TOOL_NAMES.has(toolName)) {
    process.stdout.write(JSON.stringify({ continue: true }));
    return;
  }

  const toolInput = getToolInput(payload);
  const supportedFiles = collectCandidateFiles(toolName, toolInput).filter(
    (filePath) => {
      const info = getPrettierInfo(filePath);
      return info?.ignored === false && Boolean(info.inferredParser);
    },
  );

  formatFiles(supportedFiles);
  process.stdout.write(JSON.stringify({ continue: true }));
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`prettier-on-write hook failed: ${message}\n`);
  process.exit(1);
}
