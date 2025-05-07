
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle
      aria-label="Toggle dark mode"
      className="rounded-full p-2 hover:bg-muted"
      onClick={toggleTheme}
      pressed={theme === "dark"}
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
}
