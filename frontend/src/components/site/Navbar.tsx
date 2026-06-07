import { motion } from "framer-motion";
import { Code2, Sun, Moon } from "lucide-react";
import { useContext } from "react";
// @ts-ignore
import { ThemeContext } from "../../contexts/ThemeContext";

export function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext) as any;

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[min(1100px,calc(100%-2rem))] -translate-x-1/2">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-strong shadow-glass flex items-center justify-between rounded-2xl px-5 py-3">
          <a href="#" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-glow">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold tracking-tight">CS Studio</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a className="hover:text-foreground transition" href="#product">Product</a>
            <a className="hover:text-foreground transition" href="#paths">Learn</a>
            <a className="hover:text-foreground transition" href="#arena">Arena</a>
            <a className="hover:text-foreground transition" href="#community">Community</a>
            <a className="hover:text-foreground transition" href="#pricing">Why us</a>
          </nav>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme} 
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition md:mr-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="hidden text-sm text-muted-foreground hover:text-foreground md:block">Sign in</button>
            <button className="rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90">
              Get started
            </button>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
