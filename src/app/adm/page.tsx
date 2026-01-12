'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCollection, useUser, useAuth, useMemoFirebase } from '@/firebase';
import { collection, getFirestore } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface QuizClick {
  id: string;
  quizId: string;
  timestamp: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
}

interface AggregatedClicks {
  [quizId: string]: {
    count: number;
    title: string;
  };
}

export default function AdminPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = getFirestore();

  const quizClicksQuery = useMemoFirebase(() => collection(firestore, 'quiz_clicks'), [firestore]);
  const quizzesQuery = useMemoFirebase(() => collection(firestore, 'quizzes'), [firestore]);

  const { data: quizClicks, isLoading: clicksLoading, error: clicksError } = useCollection<QuizClick>(quizClicksQuery);
  const { data: quizzes, isLoading: quizzesLoading, error: quizzesError } = useCollection<Quiz>(quizzesQuery);
  
  const [aggregatedData, setAggregatedData] = useState<AggregatedClicks>({});

  useEffect(() => {
    if (quizzes && quizClicks) {
      const clicksByQuiz = quizClicks.reduce((acc, click) => {
        acc[click.quizId] = (acc[click.quizId] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      const quizMap = quizzes.reduce((acc, quiz) => {
        acc[quiz.id] = quiz.title;
        return acc;
      }, {} as { [key: string]: string });

      // Ensure a default entry for the main quiz
      const defaultQuizId = 'calisthenics-quiz';
      if (!quizMap[defaultQuizId]) {
        quizMap[defaultQuizId] = 'Quiz de Calistenia';
      }

      const finalData: AggregatedClicks = {};
      
      // Process quizzes with clicks
      for (const quizId in clicksByQuiz) {
        finalData[quizId] = {
          count: clicksByQuiz[quizId],
          title: quizMap[quizId] || 'Quiz Desconhecido',
        };
      }

      // Ensure default quiz is present even if it has no clicks yet
      if (!finalData[defaultQuizId]) {
         finalData[defaultQuizId] = {
           count: clicksByQuiz[defaultQuizId] || 0,
           title: quizMap[defaultQuizId],
         };
      }


      setAggregatedData(finalData);
    }
  }, [quizzes, quizClicks]);

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Anonymous sign-in failed", error);
    }
  };

  if (isUserLoading || clicksLoading || quizzesLoading) {
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
              Você precisa estar autenticado para ver esta página.
            </p>
            <Button onClick={handleAnonymousSignIn}>Entrar como Anônimo</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (clicksError || quizzesError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 text-center">
          <Card className="max-w-lg p-6 border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Erro de Permissão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive-foreground">Você não tem permissão para acessar estes dados.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Para obter acesso de administrador, adicione um documento na coleção <code className="bg-muted px-1.5 py-1 rounded-sm text-xs">roles_admin</code> com o ID do seu usuário (<code className="bg-muted px-1.5 py-1 rounded-sm text-xs">{user.uid}</code>) no <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Console do Firebase</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Cliques por Enquete</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Enquete</TableHead>
                <TableHead className="text-right">Número de Cliques</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(aggregatedData).length > 0 ? (
                Object.entries(aggregatedData).map(([quizId, data]) => (
                  <TableRow key={quizId}>
                    <TableCell className="font-medium">{data.title}</TableCell>
                    <TableCell className="text-right">{data.count}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    Nenhum clique registrado ainda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
