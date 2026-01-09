"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Answer, Question } from "@/lib/quiz-data.tsx";
import { ChevronRight } from "lucide-react";

type QuizScreenProps = {
  question: Question;
  onAnswer: (question: string, answer: string) => void;
  progress: number;
  questionNumber: number;
  totalQuestions: number;
};

const isAnswerObject = (answer: string | Answer): answer is Answer => {
  return typeof answer === "object" && answer !== null && "text" in answer;
};


export function QuizScreen({
  question,
  onAnswer,
  progress,
  questionNumber,
  totalQuestions,
}: QuizScreenProps) {
  const hasImageAnswers = question.answers.some(isAnswerObject);

  if (hasImageAnswers) {
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
          <CardContent className="grid grid-cols-2 gap-4">
            {question.answers.map((answer, index) => {
              if (isAnswerObject(answer)) {
                const Icon = answer.image;
                return (
                  <button
                    key={index}
                    className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-secondary/30 p-6 text-center transition-colors hover:bg-secondary hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary group"
                    onClick={() => onAnswer(question.question, answer.text)}
                  >
                    {Icon && <Icon className="h-20 w-20 text-primary" />}
                    <div className="flex w-full items-center justify-between font-semibold">
                      <span>{answer.text}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </button>
                );
              }
              return null;
            })}
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="mb-4">
        <p className="text-center text-sm text-muted-foreground mb-2">
          Progresso
        </p>
        <Progress value={progress} aria-label={`${Math.round(progress)}% completo`} />
      </div>
      <Card className="w-full max-w-md mx-auto bg-card border-border shadow-lg">
        <CardHeader>
          <CardDescription className="text-primary font-semibold">
            Pergunta {questionNumber} de {totalQuestions}
          </CardDescription>
          <CardTitle className="font-body text-3xl font-bold text-foreground/90">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3">
          {question.answers.map((answer, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className="justify-start text-left h-auto py-3 bg-secondary/80 border-secondary hover:bg-secondary hover:border-primary hover:text-primary group"
              onClick={() => onAnswer(question.question, answer as string)}
            >
              <span className="mr-3 font-bold text-primary">{String.fromCharCode(65 + index)}</span>
              <span className="flex-1 whitespace-normal group-hover:text-primary">{isAnswerObject(answer) ? answer.text : answer}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
