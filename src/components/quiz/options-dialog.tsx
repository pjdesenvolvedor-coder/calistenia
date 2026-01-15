"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, ListChecks } from "lucide-react";
import { useState } from "react";

type OptionsDialogProps = {
  children: React.ReactNode;
  onStartQuiz: () => void;
  onPremadeWorkout: () => void;
  onOpenChange?: (open: boolean) => void;
};

export function OptionsDialog({ children, onStartQuiz, onPremadeWorkout, onOpenChange }: OptionsDialogProps) {
  const [open, setOpen] = useState(false);
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange?.(isOpen);
  }

  const handleStartQuiz = () => {
    onStartQuiz();
    handleOpenChange(false);
  }
  
  const handlePremadeWorkout = () => {
    onPremadeWorkout();
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-center items-center">
          <DialogTitle>Como gostaria de prosseguir?</DialogTitle>
          <DialogDescription>
            Escolha a melhor opção para você.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="h-auto justify-center p-3"
            onClick={handleStartQuiz}
          >
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ListChecks className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-sm">Treino Personalizado</p>
                <p className="text-xs text-muted-foreground">
                  Responda um questionário rápido.
                </p>
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto justify-center p-3"
            onClick={handlePremadeWorkout}
          >
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Zap className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-sm">Treino Pré-pronto</p>
                <p className="text-xs text-muted-foreground">
                  Receba um treino para a maioria.
                </p>
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

    