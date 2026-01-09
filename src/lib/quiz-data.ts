export type Question = {
  id: string;
  question: string;
  answers: string[];
};

export const quizData: Question[] = [
  {
    id: "q1",
    question: "Qual é o seu principal objetivo com a calistenia?",
    answers: [
      "Perder gordura e secar",
      "Ganhar força e massa muscular",
      "Melhorar a resistência e o condicionamento",
      "Aprender novas habilidades e movimentos",
    ],
  },
  {
    id: "q2",
    question: "Quantos dias por semana você pode treinar?",
    answers: [
      "2-3 dias",
      "4-5 dias",
      "6-7 dias",
      "Não tenho certeza",
    ],
  },
  {
    id: "q3",
    question: "Qual o seu nível de experiência atual?",
    answers: [
      "Iniciante (nunca treinei antes)",
      "Intermediário (já treino há algum tempo)",
      "Avançado (treino há anos)",
    ],
  },
  {
    id: "q4",
    question: "Qual tipo de plano você prefere?",
    answers: [
      "Um plano mais acessível para começar",
      "O melhor custo-benefício com mais recursos",
      "O plano mais completo com acompanhamento premium",
      "Ainda não decidi",
    ],
  },
];
