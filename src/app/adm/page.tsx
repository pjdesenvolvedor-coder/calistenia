'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCollection, useUser, useAuth, useMemoFirebase } from '@/firebase';
import { collection, getFirestore, query, where } from 'firebase/firestore';
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
  const quizzesQuery = useMemoFirebase(() => collection(firestore, 'quizzes'), [firestore]);

  const { data: quizClicks, isLoading: clicksLoading, error: clicksError } = useCollection<QuizClick>(quizClicksQuery);
  const { data: quizzes, isLoading: quizzesLoading, error: quizzesError } = useCollection<Quiz>(quizzesQuery);
  
  const [aggregatedData, setAggregatedData] = useState<AggregatedClicks>({});
  const [isAdmin, setIsAdmin] = useState(true); // Assume admin until an error proves otherwise

  useEffect(() => {
    if (clicksError) {
      setIsAdmin(false);
    }
  }, [clicksError]);

  useEffect(() => {
    // We can still aggregate data even if there are no clicks, but we have quizzes.
    if (quizzes) {
      const clicksByQuiz = quizClicks?.reduce((acc, click) => {
        acc[click.quizId] = (acc[click.quizId] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number }) || {};

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
      
      // Create entries for all known quizzes
      for (const quizId in quizMap) {
        finalData[quizId] = {
          count: clicksByQuiz[quizId] || 0,
          title: quizMap[quizId],
        };
      }
      
      // Ensure default quiz is present if not already added
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
    if (!auth) return;
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Anonymous sign-in failed", error);
    }
  };
  
  // Clicks are not essential for the page to load, but user and quizzes are.
  const isLoading = isUserLoading || quizzesLoading;

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
  
  if (quizzesError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 text-center">
          <Card className="max-w-lg p-6 border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Erro ao Carregar Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive-foreground">Não foi possível carregar os dados das enquetes.</p>
              <p className="mt-2 text-sm text-muted-foreground">
               Por favor, verifique sua conexão ou as permissões do Firestore.
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
          {!isAdmin && (
             <div className="mb-6 max-w-2xl mx-auto bg-destructive/10 p-4 rounded-lg border border-destructive/20 text-center">
                <h3 className="font-bold text-destructive">Acesso de Administrador Necessário</h3>
                <p className="mt-2 text-sm text-destructive/90">
                  Sua conta (<code className="bg-muted px-1.5 py-0.5 rounded-sm text-xs font-mono">{user.uid}</code>) não tem permissão para visualizar as estatísticas de cliques.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Para obter acesso, adicione um documento na coleção <code className="bg-muted px-1.5 py-0.5 rounded-sm text-xs font-mono">roles_admin</code> com o ID do seu usuário no <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Console do Firebase</a>.
                </p>
              </div>
          )}
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
                    <TableCell className="text-right">{isAdmin ? data.count : 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    Nenhuma enquete encontrada.
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
