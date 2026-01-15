"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, ListChecks } from "lucide-react";
import { useState } from "react";

type OptionsDialogProps = {
  children: React.ReactNode;
  onStartQuiz: () => void;
  onPremadeWorkout: () => void;
};

export function OptionsDialog({ children, onStartQuiz, onPremadeWorkout }: OptionsDialogProps) {
  const [open, setOpen] = useState(false);
  
  const handleStartQuiz = () => {
    onStartQuiz();
    setOpen(false);
  }
  
  const handlePremadeWorkout = () => {
    onPremadeWorkout();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Como gostaria de prosseguir?</DialogTitle>
          <DialogDescription>
            Escolha a melhor opção para você.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="h-auto justify-start text-left p-4"
            onClick={handleStartQuiz}
          >
            <div className="flex items-start gap-4">
              <ListChecks className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">Treino Personalizado</p>
                <p className="text-sm text-muted-foreground">
                  Responda um questionário de menos de 1 minuto.
                </p>
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto justify-start text-left p-4"
            onClick={handlePremadeWorkout}
          >
            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">Treino Pré-pronto</p>
                <p className="text-sm text-muted-foreground">
                  Receba um treino rápido baseado no que funciona para a maioria.
                </p>
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
