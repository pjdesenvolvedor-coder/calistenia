"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type { Question } from "@/lib/quiz-data";

type CheckboxQuestionScreenProps = {
  question: Question;
  onSubmit: (question: string, answers: string[]) => void;
  progress: number;
};

export function CheckboxQuestionScreen({ question, onSubmit, progress }: CheckboxQuestionScreenProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleCheckboxChange = (answer: string) => {
    setSelectedAnswers((prev) =>
      prev.includes(answer)
        ? prev.filter((a) => a !== answer)
        : [...prev, answer]
    );
  };

  const handleSubmit = () => {
    onSubmit(question.question, selectedAnswers);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="mb-4">
        <p className="text-center text-sm text-muted-foreground mb-2">
          Progresso
        </p>
        <Progress value={progress} aria-label={`${Math.round(progress)}% completo`} />
      </div>
      <Card className="w-full max-w-md mx-auto bg-card border-border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-body text-3xl font-bold">
            {question.question}
          </CardTitle>
          {question.description && (
            <CardDescription className="text-muted-foreground pt-2">
              {question.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex flex-col space-y-3">
          {question.answers.map((answer, index) => {
            const answerText = typeof answer === 'string' ? answer : answer.text;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 rounded-md border border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={() => handleCheckboxChange(answerText)}
              >
                <Checkbox
                  id={`answer-${index}`}
                  checked={selectedAnswers.includes(answerText)}
                  onCheckedChange={() => handleCheckboxChange(answerText)}
                />
                <Label htmlFor={`answer-${index}`} className="font-normal cursor-pointer">
                  {answerText}
                </Label>
              </div>
            )
          })}
          <Button onClick={handleSubmit} size="lg" className="w-full font-bold text-lg mt-4 !bg-primary text-primary-foreground">
            CONTINUAR &gt;
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
