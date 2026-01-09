"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function RedirectingScreen() {
  return (
    <Card className="w-full max-w-md mx-auto p-4 sm:p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="font-semibold text-lg">Redirecionando...</p>
      </CardContent>
    </Card>
  );
}
