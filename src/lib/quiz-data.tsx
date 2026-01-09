import { LucideProps } from "lucide-react";

export type Answer = {
  text: string;
  image?: React.ComponentType<{ className?: string }>;
  emoji?: string;
};

export type Question = {
  id: string;
  type?: 'multiple-choice' | 'measurement';
  question: string;
  description?: string;
  answers: (string | Answer)[];
};

export const MaleIcon = (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 16.2A5 5 0 0 1 9 12h6a5 5 0 0 1 5 4.2"/><path d="M9 12a5 5 0 0 1-5-4.2A5 5 0 0 1 9 3.8a5 5 0 0 1 5 4.4"/><path d="m-2 -2 20 20"/><path d="M15 12a5 5 0 0 1 5 4.2 5 5 0 0 1-5 4.2 5 5 0 0 1-5-4.4"/></svg>
);

export const FemaleIcon = (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4" /><path d="M12 16v6" /><path d="M9 19h6" /></svg>
);

export const HouseIcon = (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" {...props}>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
            <path fill="#2F88FF" stroke="#000" d="M44 44V20L24 4L4 20v24h12V28h12v16h12Z"/>
            <path fill="#43CCF8" stroke="#000" d="M44 44V20L24 4L4 20v24h12V28h12v16h12Z"/>
            <path stroke="#fff" d="M44 44V20L24 4L4 20v24h12V28h12v16Z"/>
        </g>
    </svg>
);

export const OutdoorIcon = (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" {...props}>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
            <path fill="#2F88FF" stroke="#000" d="M48 48H0V0h48v48Z" transform="scale(-1 1) rotate(-180 24 24)"/>
            <path fill="#43CCF8" stroke="#000" d="M48 48H0V0h48v48Z" transform="scale(-1 1) rotate(-180 24 24)"/>
            <path stroke="#fff" d="m4 38l10-10l10 10l10-10l10 10"/>
            <circle cx="36" cy="14" r="6" fill="#FFD60A" stroke="#fff"/>
        </g>
    </svg>
);

export const GymIcon = (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" {...props}>
        <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
            <path fill="#FFD60A" d="M6 10h8v8H6zm28 0h8v8h-8zM24 16.222V44M14 44h20M6 14h36M16 10H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2m24 0h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4M18 10V6M30 10V6"/>
            <circle cx="24" cy="8.222" r="4" fill="#2F88FF"/>
        </g>
    </svg>
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
  {
    id: "q4",
    question: "Qual seu nível de experiência com treinos?",
    description: "Seja honesto(a), isso é crucial para montarmos treinos que funcionem para você sem risco de lesão.",
    answers: [
      { text: "Começar agora", emoji: "😅" },
      { text: "Iniciante", emoji: "😱" },
      { text: "Intermediário", emoji: "😃" },
      { text: "Avançado", emoji: "😎" },
    ],
  },
  {
    id: "q5",
    question: "O que mais te animaria em um Desafio de 28 dias?",
    answers: [
      { text: "Ver resultado rápido no meu corpo.", emoji: "🤩" },
      { text: "Ter um passo a passo simples que eu consiga seguir.", emoji: "🤗" },
      { text: "Poder treinar em casa sem precisar de equipamentos.", emoji: "😎" },
      { text: "Ter um desafio que me faça seguir firme e animado.", emoji: "💪" },
    ],
  },
  {
    id: "q6",
    question: "Quanto tempo por dia você consegue se dedicar ao seu treino?",
    description: "👍 Perfeito, isso nos ajuda a montar o plano ideal para você.",
    answers: [
      "15 minutos",
      "20 minutos",
      "30 minutos",
      "1 hora",
    ],
  },
  {
    id: "q7",
    question: "Em qual ambiente você prefere treinar?",
    description: "Estamos quase lá! Para garantir que seu plano seja 100% prático para sua rotina...",
    answers: [
        { text: "Em casa", image: HouseIcon },
        { text: "Ao ar livre", image: OutdoorIcon },
        { text: "Na academia", image: GymIcon },
    ]
  },
  {
    id: "q8",
    question: "Quantos dias por semana você pode treinar?",
    answers: [
      "2-3 dias",
      "4-5 dias",
      "6-7 dias",
    ],
  },
  {
    id: "q9",
    question: "Você tem alguma meta de peso que deseja perder?",
    description: "Ótimo! Seus treinos serão adaptados para serem feitos Em casa em 20 minutos/dia",
    answers: [
      "Perder até 5kg",
      "Perder de 5-10kg",
      "Perder de 10-15kg",
      "Perder mais de 15kg",
      "Construir mais músculos e aumentar a força"
    ],
  },
  {
    id: "q10",
    type: 'measurement',
    question: "Se souber, informe seu peso e altura.",
    description: "Para uma estimativa de gasto calórico ainda mais precisa...",
    answers: [],
  }
];
