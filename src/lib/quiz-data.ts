export type Question = {
  id: string;
  question: string;
  answers: string[];
};

export const quizData: Question[] = [
  {
    id: "q1",
    question: "Qual é o seu principal objetivo?",
    answers: [
      "Relaxar e desestressar",
      "Aumentar minha produtividade",
      "Aprender algo novo",
      "Cuidar do meu bem-estar",
    ],
  },
  {
    id: "q2",
    question: "Com que frequência você gostaria de usar nosso produto?",
    answers: [
      "Diariamente",
      "Algumas vezes por semana",
      "Uma vez por semana",
      "Ocasionalmente",
    ],
  },
  {
    id: "q3",
    question: "Qual é a sua faixa de orçamento?",
    answers: [
      "Básico",
      "Intermediário",
      "Premium",
    ],
  },
  {
    id: "q4",
    question: "O que mais te atrai em um produto?",
    answers: [
      "Qualidade e durabilidade",
      "Design e estética",
      "Exclusividade e personalização",
      "Facilidade de uso",
    ],
  },
];
