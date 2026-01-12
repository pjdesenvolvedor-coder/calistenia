'use client';

import { useEffect, useState } from 'react';
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

  const quizClicksQuery = useMemoFirebase(
    () => (user ? collection(firestore, 'quiz_clicks') : null),
    [firestore, user]
  );
  const quizzesQuery = useMemoFirebase(() => (firestore ? collection(firestore, 'quizzes') : null), [firestore]);

  const { data: quizClicks, isLoading: clicksLoading } = useCollection<QuizClick>(quizClicksQuery);
  const { data: quizzes, isLoading: quizzesLoading } = useCollection<Quiz>(quizzesQuery);
  
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
      
      const finalData: AggregatedClicks = {};
      for (const quizId in clicksByQuiz) {
        if (quizMap[quizId]) {
          finalData[quizId] = {
            count: clicksByQuiz[quizId],
            title: quizMap[quizId],
          };
        }
      }

      // Ensure a default entry for the main quiz if it has clicks but isn't in the quizzes collection
      const defaultQuizId = 'calisthenics-quiz';
      if (clicksByQuiz[defaultQuizId] && !finalData[defaultQuizId]) {
        finalData[defaultQuizId] = {
          count: clicksByQuiz[defaultQuizId],
          title: 'Quiz de Calistenia', // Fallback title
        };
      }

      setAggregatedData(finalData);
    } else if (quizzes && !quizClicks) {
        // Handle case where there are quizzes but no clicks yet
        const initialData = quizzes.reduce((acc, quiz) => {
            acc[quiz.id] = { count: 0, title: quiz.title };
            return acc;
        }, {} as AggregatedClicks);
        
        // Ensure default quiz is present
        const defaultQuizId = 'calisthenics-quiz';
        if (!initialData[defaultQuizId]) {
            initialData[defaultQuizId] = { count: 0, title: 'Quiz de Calistenia' };
        }

        setAggregatedData(initialData);
    }
  }, [quizzes, quizClicks]);


  const handleAnonymousSignIn = async () => {
    if (!auth) return;
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Anonymous sign-in failed", error);
    }
  };
  
  const isLoading = isUserLoading || quizzesLoading || clicksLoading;

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
