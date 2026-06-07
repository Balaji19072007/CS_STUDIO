export function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 mask-fade-b" />
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[oklch(0.70_0.22_280/0.35)] blur-3xl animate-aurora" />
      <div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-[oklch(0.72_0.20_200/0.30)] blur-3xl animate-aurora" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[oklch(0.75_0.20_330/0.25)] blur-3xl animate-aurora" style={{ animationDelay: "-12s" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/0 to-background" />
    </div>
  );
}
