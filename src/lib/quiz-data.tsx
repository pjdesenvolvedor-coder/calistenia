export type Answer = {
  text: string;
  image?: React.ComponentType<{ className?: string }>;
};

export type Question = {
  id: string;
  question: string;
  description?: string;
  answers: (string | Answer)[];
};

export const MaleIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0 6.125a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h3.5a.75.75 0 0 1 .75.75ZM12 2a5 5 0 0 0-5 5v2.375a.75.75 0 0 1-1.5 0V7a6.5 6.5 0 0 1 13 0v2.375a.75.75 0 0 1-1.5 0V7a5 5 0 0 0-5-5Zm6.5 11.25a.75.75 0 0 0-1.5 0V14.5A5.506 5.506 0 0 1 12 20a5.506 5.506 0 0 1-5.5-5.5v-1.25a.75.75 0 0 0-1.5 0V14.5A7.008 7.008 0 0 0 12 21.5a7.008 7.008 0 0 0 7.083-6.917l-.583-.083Z"/></svg>
);

export const FemaleIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm-3.25 2.25a.75.75 0 0 0-1.5 0V13A4.752 4.752 0 0 0 12 17.75a4.752 4.752 0 0 0 4.75-4.75v-1.25a.75.75 0 0 0-1.5 0V13A3.253 3.253 0 0 1 12 16.25a3.253 3.253 0 0 1-3.25-3.25v-1.25ZM12 2a5 5 0 0 0-5 5v1a.75.75 0 0 1-1.5 0V7a6.5 6.5 0 1 1 13 0v1a.75.75 0 0 1-1.5 0V7a5 5 0 0 0-5-5Z"/></svg>
);


export const quizData: Question[] = [
  {
    id: "q0",
    question: "Para quem devemos montar o plano?",
    description: "Selecione seu gênero para ajustarmos o metabolismo basal.",
    answers: [
      { text: "Homem", image: MaleIcon },
      { text: "Mulher", image: FemaleIcon },
    ],
  },
  {
    id: "q1",
    question: "E qual sua faixa etária?",
    answers: [
        "18-29 anos",
        "30-40 anos",
        "41-50 anos",
        "+50 anos",
    ],
  },
  {
    id: "q2",
    question: "Qual o seu principal objetivo ao iniciar este desafio?",
    description: "Isso nos ajuda a definir o melhor protocolo de treino para alcançar seu principal objetivo",
    answers: [
      "Secar gordura do corpo",
      "Construir mais músculos",
      "Aumentar a disposição",
      "Eliminar dores no corpo",
    ],
  },
  {
    id: "q3",
    question: "E o que mais te atrapalhou de conseguir isso até hoje?",
    answers: [
      "A falta de tempo no dia a dia",
      "A falta de motivação para continuar",
      "A dúvida em não saber como começar do jeito certo",
      "O desânimo de ter tentado antes sem ter resultados",
    ],
  },
];
