import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">CS Studio</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Build. Learn. Compete. Grow.</p>
        </div>
        {[
          { h: "Product", l: ["Cloud IDE", "Web Studio", "Challenges", "Certificates"] },
          { h: "Learn", l: ["Roadmaps", "Modules", "Algorithm Visualizer", "AI Projects"] },
          { h: "Company", l: ["About", "Community", "Careers", "Contact"] },
        ].map((c) => (
          <div key={c.h}>
            <div className="mb-3 text-sm font-medium">{c.h}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.l.map((i) => <li key={i}><a className="hover:text-foreground transition" href="#">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-6 text-xs text-muted-foreground">
        © 2026 CS Studio. All rights reserved.
      </div>
    </footer>
  );
}
