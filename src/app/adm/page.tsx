'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCollection, useUser, useAuth, useMemoFirebase } from '@/firebase';
import { collection, getFirestore, query } from 'firebase/firestore';
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface QuizAnswer {
  id: string;
  userId: string;
  answers: Record<string, string>;
  createdAt: string;
}

interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  attemptedAt: string;
}

interface SalesPageClick {
  id: string;
  buttonId: string;
  timestamp: string;
}

const buttonIdToName: Record<string, string> = {
  'scroll-to-offer-cta': 'Autor (Quero Transformar meu Corpo)',
  'main-checkout-cta': 'Botão Principal (Quero Acesso Imediato)',
  'footer-checkout-cta': 'Rodapé (Sim, Quero meu Acesso!)'
};

export default function AdminPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = getFirestore();

  const quizAnswersQuery = useMemoFirebase(
    () => (user ? query(collection(firestore, 'quiz_answers')) : null),
    [firestore, user]
  );
  const { data: quizAnswers, isLoading: answersLoading } = useCollection<QuizAnswer>(quizAnswersQuery);

  const quizAttemptsQuery = useMemoFirebase(
    () => (user ? query(collection(firestore, 'quiz_attempts')) : null),
    [firestore, user]
  );
  const { data: quizAttempts, isLoading: attemptsLoading } = useCollection<QuizAttempt>(quizAttemptsQuery);

  const salesPageClicksQuery = useMemoFirebase(
    () => (user ? query(collection(firestore, 'sales_page_clicks')) : null),
    [firestore, user]
  );
  const { data: salesPageClicks, isLoading: salesClicksLoading } = useCollection<SalesPageClick>(salesPageClicksQuery);

  const completedAttemptUserIds = useMemo(() => new Set(quizAnswers?.map(a => a.userId) || []), [quizAnswers]);

  const incompleteAttempts = useMemo(
    () => quizAttempts?.filter(attempt => !completedAttemptUserIds.has(attempt.userId)) || [],
    [quizAttempts, completedAttemptUserIds]
  );
  
  const salesButtonClicks = useMemo(() => {
    return salesPageClicks?.reduce((acc, click) => {
      acc[click.buttonId] = (acc[click.buttonId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};
  }, [salesPageClicks]);


  const handleAnonymousSignIn = async () => {
    if (!auth) return;
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Anonymous sign-in failed", error);
    }
  };
  
  const isLoading = isUserLoading || answersLoading || attemptsLoading || salesClicksLoading;

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
        <Card className="w-full max-w-sm text-center">
          <CardHeader>
            <CardTitle className="text-xl">Acesso Restrito</CardTitle>
            <CardDescription>
              Você precisa se autenticar para ver esta página.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button onClick={handleAnonymousSignIn}>Entrar como Anônimo</Button>
            <div className="mt-4 text-xs text-muted-foreground bg-secondary p-3 rounded-lg">
                <p>Seu ID de usuário é:</p>
                <p className="font-mono break-all my-2">{user?.uid || 'Não autenticado'}</p>
                <p>Para obter acesso de administrador, adicione um documento na coleção <code className='font-bold'>roles_admin</code> no Firestore com o ID igual ao seu ID de usuário.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Administração do Quiz</CardTitle>
          <CardDescription>Veja as respostas completas e as tentativas abandonadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="completed">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="completed">Respostas Completas ({quizAnswers?.length || 0})</TabsTrigger>
              <TabsTrigger value="incomplete">Tentativas Incompletas ({incompleteAttempts.length || 0})</TabsTrigger>
              <TabsTrigger value="sales-clicks">Cliques na Venda ({salesPageClicks?.length || 0})</TabsTrigger>
            </TabsList>
            <TabsContent value="completed">
                {quizAnswers && quizAnswers.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {quizAnswers.map((attempt) => (
                    <AccordionItem value={attempt.id} key={attempt.id}>
                      <AccordionTrigger>
                        <div className="flex justify-between w-full pr-4 items-center">
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
            </TabsContent>
            <TabsContent value="incomplete">
                {incompleteAttempts.length > 0 ? (
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuário</TableHead>
                                <TableHead>Quiz</TableHead>
                                <TableHead>Iniciado em</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {incompleteAttempts.map(attempt => (
                                <TableRow key={attempt.id}>
                                    <TableCell className="font-mono">{attempt.userId.substring(0, 8)}...</TableCell>
                                    <TableCell>{attempt.quizId}</TableCell>
                                    <TableCell>{new Date(attempt.attemptedAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive">Incompleto</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                        Nenhuma tentativa incompleta registrada.
                    </div>
                )}
            </TabsContent>
             <TabsContent value="sales-clicks">
                {Object.keys(salesButtonClicks).length > 0 ? (
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Botão</TableHead>
                                <TableHead className='text-right'>Cliques</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(salesButtonClicks).map(([buttonId, count]) => (
                                <TableRow key={buttonId}>
                                    <TableCell className="font-medium">{buttonIdToName[buttonId] || buttonId}</TableCell>
                                    <TableCell className='text-right'>{count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                        Nenhum clique na página de vendas registrado.
                    </div>
                )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
