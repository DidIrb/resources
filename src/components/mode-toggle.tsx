import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button  variant="ghost" className="w-8 hidden rounded-full md:flex" size="icon">
      <SunIcon  onClick={() => setTheme("dark")} className="icon rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon onClick={() => setTheme("light")} className="absolute icon rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
