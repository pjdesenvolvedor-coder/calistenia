'use client';

import { useEffect, useState } from 'react';
import { useCollection, useUser, useAuth, useMemoFirebase } from '@/firebase';
import { collection, getFirestore } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface QuizAnswer {
  id: string;
  userId: string;
  answers: Record<string, string>;
  createdAt: string;
}

export default function AdminPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = getFirestore();

  const quizAnswersQuery = useMemoFirebase(
    () => (user ? collection(firestore, 'quiz_answers') : null),
    [firestore, user]
  );

  const { data: quizAnswers, isLoading: answersLoading } = useCollection<QuizAnswer>(quizAnswersQuery);

  const handleAnonymousSignIn = async () => {
    if (!auth) return;
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Anonymous sign-in failed", error);
    }
  };
  
  const isLoading = isUserLoading || answersLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl">Acesso Restrito</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-center text-muted-foreground">
              Você precisa se autenticar para ver esta página.
            </p>
            <Button onClick={handleAnonymousSignIn}>Entrar como Anônimo</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Respostas das Enquetes</CardTitle>
          <CardDescription>Veja as respostas detalhadas de cada participante.</CardDescription>
        </CardHeader>
        <CardContent>
          {quizAnswers && quizAnswers.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {quizAnswers.map((attempt) => (
                <AccordionItem value={attempt.id} key={attempt.id}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                      <span>{`Usuário: ${attempt.userId.substring(0, 8)}...`}</span>
                      <span className='text-muted-foreground text-sm'>{new Date(attempt.createdAt).toLocaleString()}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pergunta</TableHead>
                          <TableHead>Resposta</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(attempt.answers).map(([question, answer]) => (
                          <TableRow key={question}>
                            <TableCell className="font-medium">{question}</TableCell>
                            <TableCell>{answer}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Nenhuma resposta de enquete registrada ainda.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
