"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Zap, ListChecks } from "lucide-react";

type OptionsPopoverProps = {
  children: React.ReactNode;
  onStartQuiz: () => void;
  onPremadeWorkout: () => void;
};

export function OptionsPopover({ children, onStartQuiz, onPremadeWorkout }: OptionsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[26rem]" align="center">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Como gostaria de prosseguir?</h4>
            <p className="text-sm text-muted-foreground">
              Escolha a melhor opção para você.
            </p>
          </div>
          <div className="grid gap-2">
            <Button
              variant="outline"
              className="h-auto justify-start text-left"
              onClick={onStartQuiz}
            >
              <div className="flex items-start gap-4 p-2">
                <ListChecks className="h-6 w-6 mt-1 text-primary" />
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
              className="h-auto justify-start text-left"
              onClick={onPremadeWorkout}
            >
              <div className="flex items-start gap-4 p-2">
                <Zap className="h-6 w-6 mt-1 text-primary" />
                <div>
                  <p className="font-semibold">Treino Pré-pronto</p>
                  <p className="text-sm text-muted-foreground">
                    Receba um treino rápido baseado no que funciona para a maioria.
                  </p>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
