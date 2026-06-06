"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

import {
  type MuseumTheme,
  useTimelineStore
} from "@/store/useTimelineStore";

const themeStorageKey = "hcm-museum-theme";

function applyTheme(theme: MuseumTheme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
}

export default function ThemeToggle() {
  const theme = useTimelineStore((state) => state.theme);
  const setTheme = useTimelineStore((state) => state.setTheme);

  useEffect(() => {
    const initialTheme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";

    setTheme(initialTheme);
  }, [setTheme]);

  const nextTheme: MuseumTheme = theme === "dark" ? "light" : "dark";
  const label =
    nextTheme === "light" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="theme-toggle"
      onClick={() => {
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }}
    >
      {theme === "light" ? (
        <Moon aria-hidden="true" className="h-5 w-5" />
      ) : (
        <Sun aria-hidden="true" className="h-5 w-5" />
      )}
      <span>{theme === "light" ? "Tối" : "Sáng"}</span>
    </button>
  );
}
