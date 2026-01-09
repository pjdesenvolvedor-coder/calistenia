import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("text-center font-headline uppercase", className)}>
      <h2 className="text-xl font-bold tracking-wider">Desafio de</h2>
      <h1 className="text-4xl font-black">Calistenia</h1>
      <p className="text-xl font-bold tracking-wider">- 28 Dias -</p>
    </div>
  );
}
