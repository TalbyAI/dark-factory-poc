export interface FactorySnapshot {
  readonly headline: string;
  readonly summary: string;
  readonly pillars: readonly string[];
}

export function buildFactorySnapshot(): FactorySnapshot {
  return {
    headline: "TanStack Start monorepo ready",
    summary:
      "Frontend and backend live in apps/web, while shared UI and domain code stay reusable in libs.",
    pillars: [
      "Strict TypeScript across app and packages",
      "Tailwind-first UI components in libs/ui",
      "Server functions for backend behavior inside the web app",
    ],
  };
}
