import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sun, Moon, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
// @ts-ignore
import { ThemeContext } from "../../contexts/ThemeContext";

export function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext) as any;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[min(1100px,calc(100%-2rem))] -translate-x-1/2">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-strong shadow-glass flex items-center justify-between rounded-2xl px-4 py-3 md:px-5"
      >
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-glow">
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline-block text-base font-semibold tracking-tight">CS Studio</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a className="hover:text-foreground transition" href="#product">Product</a>
          <a className="hover:text-foreground transition" href="#paths">Learn</a>
          <a className="hover:text-foreground transition" href="#arena">Arena</a>
          <a className="hover:text-foreground transition" href="#community">Community</a>
          <a className="hover:text-foreground transition" href="#pricing">Why us</a>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <button 
            onClick={toggleTheme} 
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="hidden text-sm text-muted-foreground hover:text-foreground md:block mr-2">Sign in</button>
          <button className="rounded-lg bg-gradient-to-r from-primary to-accent px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90">
            Get started
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full glass-strong shadow-glass rounded-2xl p-4 flex flex-col gap-4 md:hidden"
          >
            <a onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-foreground transition" href="#product">Product</a>
            <a onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-foreground transition" href="#paths">Learn</a>
            <a onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-foreground transition" href="#arena">Arena</a>
            <a onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-foreground transition" href="#community">Community</a>
            <a onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-foreground transition" href="#pricing">Why us</a>
            <div className="h-px w-full bg-border" />
            <button className="text-sm font-medium hover:text-foreground transition text-left">Sign in</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
