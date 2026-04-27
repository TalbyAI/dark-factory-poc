import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";
const DARK_MODE_MEDIA_QUERY = "(prefers-color-scheme: dark)";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function getBrowserStorage(): Storage | undefined {
  if (typeof window === "undefined") return undefined;
  return window.localStorage;
}

function getBrowserMediaMatcher():
  | ((query: string) => MediaQueryList)
  | undefined {
  if (typeof window === "undefined") return undefined;
  return window.matchMedia.bind(window);
}

function getRootElement(): HTMLElement | undefined {
  if (typeof document === "undefined") return undefined;
  return document.documentElement;
}

export function getStoredTheme(
  storage: Storage | undefined = getBrowserStorage(),
): Theme | null {
  if (!storage) return null;

  try {
    const storedTheme = storage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
}

export function getPreferredTheme(
  matchMedia:
    | ((query: string) => MediaQueryList)
    | undefined = getBrowserMediaMatcher(),
): Theme {
  if (!matchMedia) return "light";
  return matchMedia(DARK_MODE_MEDIA_QUERY).matches ? "dark" : "light";
}

export function getInitialTheme(options?: {
  readonly storage?: Storage;
  readonly matchMedia?: (query: string) => MediaQueryList;
}): Theme {
  const storedTheme = getStoredTheme(options?.storage);
  if (storedTheme) return storedTheme;
  return getPreferredTheme(options?.matchMedia);
}

export function syncTheme(
  theme: Theme,
  options?: {
    readonly root?: HTMLElement;
    readonly storage?: Storage;
  },
) {
  const root = options?.root ?? getRootElement();
  root?.classList.toggle("dark", theme === "dark");

  const storage = options?.storage ?? getBrowserStorage();
  if (!storage) return;

  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage failures. The DOM still reflects the active theme.
  }
}

export function toggleTheme(theme: Theme): Theme {
  return theme === "light" ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    syncTheme(theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme((currentTheme) => toggleTheme(currentTheme)),
  };
}

export function getThemeBootScript() {
  return `(function(){try{var key='${THEME_STORAGE_KEY}';var root=document.documentElement;var stored=localStorage.getItem(key);var theme=stored==='light'||stored==='dark'?stored:(matchMedia('${DARK_MODE_MEDIA_QUERY}').matches?'dark':'light');root.classList.toggle('dark',theme==='dark');localStorage.setItem(key,theme)}catch(error){}})()`;
}

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getThemeBootScript(),
      }}
    />
  );
}
