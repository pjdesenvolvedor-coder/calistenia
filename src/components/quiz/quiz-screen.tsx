"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Question } from "@/lib/quiz-data";

type QuizScreenProps = {
  question: Question;
  onAnswer: (question: string, answer: string) => void;
  progress: number;
  questionNumber: number;
  totalQuestions: number;
};

export function QuizScreen({
  question,
  onAnswer,
  progress,
  questionNumber,
  totalQuestions,
}: QuizScreenProps) {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="mb-4">
        <p className="text-center text-sm text-muted-foreground mb-2">
          Progresso
        </p>
        <Progress value={progress} aria-label={`${Math.round(progress)}% completo`} />
      </div>
      <Card className="w-full max-w-md mx-auto bg-transparent border-border">
        <CardHeader>
          <CardDescription className="text-accent font-semibold">
            Pergunta {questionNumber} de {totalQuestions}
          </CardDescription>
          <CardTitle className="font-headline text-3xl font-black uppercase">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3">
          {question.answers.map((answer, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className="justify-start text-left h-auto py-3 bg-secondary/80 border-secondary hover:bg-secondary hover:border-primary"
              onClick={() => onAnswer(question.question, answer)}
            >
              <span className="mr-3 font-bold text-primary">{String.fromCharCode(65 + index)}</span>
              <span className="flex-1 whitespace-normal">{answer}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
