import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("text-left font-headline uppercase", className)}>
      <h1 className="text-2xl font-black flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M4 16.2A5 5 0 0 1 9 12h6a5 5 0 0 1 5 4.2"/><path d="M9 12a5 5 0 0 1-5-4.2A5 5 0 0 1 9 3.8a5 5 0 0 1 5 4.4"/><path d="m-2 -2 20 20"/><path d="M15 12a5 5 0 0 1 5 4.2 5 5 0 0 1-5 4.2 5 5 0 0 1-5-4.4"/></svg>
        <span>Calistreino</span>
      </h1>
      <p className="text-xs font-semibold tracking-wider text-muted-foreground">Treinos em casa</p>
    </div>
  );
}
