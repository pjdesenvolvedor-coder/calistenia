'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Lock,
  Star,
  Zap,
  Youtube,
  FileVideo,
  Download,
  Calendar,
  Users,
  Dumbbell,
  ShieldCheck,
  Award,
} from 'lucide-react';
import placeholderData from '@/lib/placeholder-images.json';
import { FaqItem } from './faq-item';
import type { ProductRecommendationOutput } from '@/ai/flows/product-recommendation';
import { SalesNotification } from './sales-notification';
import { useEffect, useState } from 'react';

type SalesPageProps = {
  recommendation: ProductRecommendationOutput;
  onRetake: () => void;
};

const testimonials = [
  { id: 'testimonial-1', name: 'João P.', text: '“O protocolo de calistenia mudou meu corpo em poucas semanas. Finalmente estou vendo resultados de verdade! 🔥”', imageHint: 'man progress' },
  { id: 'testimonial-2', name: 'Maria S.', text: '“Nunca pensei que pudesse treinar em casa e ter resultados de academia. O Protocolo superou minhas expectativas.”', imageHint: 'woman progress' },
  { id: 'testimonial-3', name: 'Carlos L.', text: '“Resultados visíveis em menos de um mês! O suporte da comunidade foi essencial pra não desistir.”', imageHint: 'man fitness' },
];

const faqItems = [
  { question: "Como vou receber o acesso?", answer: "O acesso é imediato após a confirmação do pagamento. Você receberá um e-mail com todas as informações para acessar a área de membros." },
  { question: "O protocolo de treinos serve para mim?", answer: "Sim! O protocolo é personalizado para o seu nível de experiência, desde o completo iniciante ao avançado, e para os seus objetivos específicos." },
  { question: "Vou precisar de equipamentos?", answer: "Não, os treinos são baseados em calistenia e usam o peso do seu próprio corpo. Você pode treinar em qualquer lugar, a qualquer hora." },
  { question: "Como funciona o suporte?", answer: "Você terá acesso à nossa comunidade exclusiva de alunos, onde poderá tirar dúvidas, compartilhar seu progresso e se manter motivado." },
  { question: "E se eu não gostar?", answer: "Você tem uma garantia incondicional de 7 dias. Se por qualquer motivo não ficar satisfeito, basta pedir o reembolso e devolvemos 100% do seu dinheiro." },
];

const salesData = [
  { name: 'Maria F.', time: 'há 2 minutos', product: 'Protocolo Completo no Pix' },
  { name: 'José A.', time: 'há 5 minutos', product: 'Protocolo Completo no Pix' },
  { name: 'Ana C.', time: 'há 8 minutos', product: 'Protocolo Completo no Pix' },
  { name: 'Lucas S.', time: 'há 12 minutos', product: 'Protocolo Completo no Pix' },
  { name: 'Fernanda L.', time: 'há 15 minutos', product: 'Protocolo Completo no Pix' },
];

export function SalesPage({ recommendation, onRetake }: SalesPageProps) {
  const getImage = (id: string) => placeholderData.placeholderImages.find(img => img.id === id);
  const mainGoal = recommendation.reasoning.replace('Com base nas suas respostas, seu objetivo é ', '');

  const [currentSale, setCurrentSale] = useState<typeof salesData[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showRandomSale = () => {
      setIsVisible(false); // Esconde a notificação atual para animar a próxima
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * salesData.length);
        setCurrentSale(salesData[randomIndex]);
        setIsVisible(true);
      }, 500); // tempo para a animação de saída
    };

    const initialDelay = setTimeout(showRandomSale, 5000); // Primeira notificação após 5s

    const interval = setInterval(() => {
      showRandomSale();
    }, Math.random() * 10000 + 8000); // Intervalo aleatório entre 8s e 18s

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  const handleScrollToOffer = () => {
    const offerSection = document.getElementById('oferta');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    window.location.href = 'https://pay.lowify.com.br/checkout?product_id=ifaK3n';
  };


  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="py-8 px-4 text-center bg-gray-50">
        <p className="text-brand-green font-bold">Obrigado por responder o quiz!</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight max-w-3xl mx-auto">
          Seu plano de treino personalizado para <span className="text-brand-blue">secar, definir</span> e <span className="text-brand-blue">ter o corpo que você sempre sonhou</span> está pronto!
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Com base nas suas respostas, montamos uma rotina de treinos de calistenia que se adapta perfeitamente aos seus objetivos e à sua rotina.
        </p>
        <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-gray-400" /> Compra 100% segura</span>
          <span className="flex items-center gap-1"><Award className="w-4 h-4 text-gray-400" /> Satisfação Garantida</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-gray-400" /> Privacidade Protegida</span>
        </div>
      </header>

      {/* Main CTA */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-brand-green">
            <h2 className="text-2xl font-bold text-center">Resultados da sua avaliação:</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 font-semibold">SEU OBJETIVO É</p>
                <p className="text-lg font-bold text-green-900 capitalize">{mainGoal}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 font-semibold">NÍVEL DE TREINO</p>
                <p className="text-lg font-bold text-blue-900">Iniciante/Intermediário</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-700 font-semibold">FOCO PRINCIPAL</p>
                <p className="text-lg font-bold text-yellow-900">{recommendation.recommendedProduct}</p>
              </div>
            </div>
            <div className="mt-8 text-center text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="font-bold">Por que você ainda não tem o corpo que deseja?</p>
                <p className="text-sm">A falta de um método claro e treinos que não se encaixam na sua rotina são os maiores vilões.</p>
            </div>
            <div className="mt-8 bg-green-50/80 border-l-4 border-brand-green p-4 rounded-r-lg">
                <h3 className="text-xl font-bold text-green-900">A boa notícia: nosso método resolve isso!</h3>
                <p className="mt-2 text-gray-700">O <strong>PROTOCOLO CALISTENIA 28 DIAS</strong> foi desenhado para eliminar a gordura e construir músculos de forma rápida e eficiente, treinando em casa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What you'll get */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center">É possível começar a construir um novo corpo em 28 dias!</h2>
          <p className="text-center mt-2 text-gray-600">O que você precisa é de um plano de ação claro e um método validado.</p>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-xl">O CAMINHO TRADICIONAL</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-red-600"><span className="font-bold text-xl">×</span><span>Academias lotadas e caras</span></li>
                <li className="flex items-start gap-2 text-red-600"><span className="font-bold text-xl">×</span><span>Treinos genéricos que não funcionam</span></li>
                <li className="flex items-start gap-2 text-red-600"><span className="font-bold text-xl">×</span><span>Falta de tempo e motivação</span></li>
                <li className="flex items-start gap-2 text-red-600"><span className="font-bold text-xl">×</span><span>Dietas malucas e restritivas</span></li>
                <li className="flex items-start gap-2 text-red-600"><span className="font-bold text-xl">×</span><span>Resultados lentos e frustrantes</span></li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-2 border-brand-green">
              <h3 className="font-bold text-xl text-green-900">O PROTOCOLO CALISTENIA 28</h3>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5" /><span>Treinos rápidos em casa, sem equipamentos</span></li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5" /><span>Plano personalizado para seus objetivos</span></li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5" /><span>Flexibilidade para treinar quando quiser</span></li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5" /><span>Protocolo alimentar flexível e eficaz</span></li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5" /><span>Resultados visíveis em 4 semanas</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Para acelerar ainda mais seus resultados...</h2>
            <p className="mt-2 text-gray-600">Você vai levar <span className="font-bold">3 BÔNUS EXCLUSIVOS</span> sem custo adicional:</p>
            <div className="mt-8 grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <Dumbbell className="w-8 h-8 text-brand-blue"/>
                    <h3 className="font-bold mt-2">BÔNUS #1: Treinos focados</h3>
                    <p className="text-sm text-gray-600 mt-1">Protocolos específicos para acelerar o ganho de massa em braços, peitoral e abdômen.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border">
                    <Users className="w-8 h-8 text-brand-blue"/>
                    <h3 className="font-bold mt-2">BÔNUS #2: Comunidade VIP</h3>
                    <p className="text-sm text-gray-600 mt-1">Acesso ao grupo exclusivo de alunos para tirar dúvidas e compartilhar resultados.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border">
                    <Calendar className="w-8 h-8 text-brand-blue"/>
                    <h3 className="font-bold mt-2">BÔNUS #3: Calendário 28 Dias</h3>
                    <p className="text-sm text-gray-600 mt-1">Um guia visual para você acompanhar seu progresso e se manter no plano todos os dias.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Resultados REAIS de quem seguiu o Protocolo</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => {
              const image = getImage(testimonial.id);
              return (
                <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-md border">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="mt-4 text-gray-700 italic">{testimonial.text}</p>
                  <div className="flex items-center mt-4">
                    {image && <Image src={image.imageUrl} alt={testimonial.name} width={40} height={40} className="rounded-full mr-3" data-ai-hint={testimonial.imageHint} />}
                    <p className="font-bold">{testimonial.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section id="oferta" className="py-16 px-4 bg-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 border-4 border-green-500 relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap">
              Tempo Limitado
            </div>
            <div className="text-center pt-8">
              <h2 className="text-2xl font-extrabold">PROTOCOLO CALISTENIA</h2>
              <p className="text-brand-green font-bold text-lg">DEFINIÇÃO MUSCULAR</p>
              
              <ul className="space-y-2 mt-4 text-sm text-left max-w-sm mx-auto">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-green" /> Plano de Treino Personalizado</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-green" /> Vídeo Aulas Completas</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-green" /> Protocolo Alimentar Flexível</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-green" /> Comunidade VIP de Alunos</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-green" /> Suporte Individual</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-green" /> Calendário de 28 Dias</li>
              </ul>
              <div className="my-6 text-center">
                <p className="text-gray-500 line-through">DE R$97,00 POR:</p>
                <p className="text-5xl font-extrabold text-brand-green">R$27,00</p>
                <p className="text-gray-600 text-sm">à vista no Pix</p>
              </div>
              <Button size="lg" className="w-full h-14 bg-brand-green hover:bg-brand-green-dark text-white text-xl font-bold animate-pulse-scale" onClick={handleCheckout}>
                <Zap className="w-6 h-6 mr-2"/>
                QUERO ACESSO IMEDIATO
              </Button>
              <div className="mt-4 text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3"/> Ambiente 100% seguro.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
            <ShieldCheck className="w-16 h-16 mx-auto text-brand-blue" />
            <h2 className="text-2xl font-bold mt-4">SEU RISCO É ZERO!</h2>
            <p className="mt-2 text-gray-600">Você tem <strong>7 dias de garantia incondicional</strong>. Se por qualquer motivo você não gostar do protocolo ou não se adaptar, basta enviar um e-mail e nós devolveremos 100% do valor pago. Sem perguntas, sem burocracia.</p>
            <p className="mt-4 font-semibold text-gray-800">É simples assim!</p>
          </div>
        </div>
      </section>

      {/* Author section */}
      <section className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 items-center text-center">
          <div>
            <p className="font-bold text-brand-green">QUEM SOU EU</p>
            <h2 className="text-3xl font-bold mt-2">Matheus, seu novo <br/>treinador pessoal.</h2>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">Após anos de estudo e aplicação prática, desenvolvi o método de calistenia que me permitiu transformar meu corpo treinando em casa. Hoje, minha missão é ajudar pessoas como você a alcançarem a melhor versão de si mesmas, sem precisar de academias ou equipamentos caros.</p>
             <Button size="lg" className="mt-6 bg-brand-green hover:bg-brand-green-dark text-white font-bold" onClick={handleScrollToOffer}>
              QUERO TRANSFORMAR MEU CORPO
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Ainda com dúvidas? Veja as respostas:</h2>
          <div className="space-y-4">
            {faqItems.map(item => <FaqItem key={item.question} question={item.question} answer={item.answer} />)}
          </div>
        </div>
      </section>
      
       {/* Footer CTA */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold">Alcance a sua melhor versão em 28 dias!</h2>
            <p className="mt-2 text-gray-600">Acesso imediato ao plano de treino e todos os bônus por apenas <span className="font-bold">R$27,00</span></p>
            <Button size="lg" className="mt-6 h-14 bg-brand-green hover:bg-brand-green-dark text-white text-xl font-bold animate-pulse-scale" onClick={handleScrollToOffer}>
                <Zap className="w-6 h-6 mr-2"/>
                SIM, QUERO MEU ACESSO!
            </Button>
            <p className="mt-4 text-xs text-gray-500">Garantia de 7 dias e compra 100% segura.</p>
        </div>
      </section>

      <footer className="py-6 px-4 text-center text-xs text-gray-500 border-t">
        <p>&copy; {new Date().getFullYear()} Protocolo Calistenia. Todos os direitos reservados.</p>
        <p className="mt-1">Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.</p>
         <Button onClick={onRetake} variant="link" className="text-xs mt-2">
          Refazer Quiz
        </Button>
      </footer>
      {isVisible && currentSale && (
        <SalesNotification
          key={currentSale.name + currentSale.time}
          name={currentSale.name}
          time={currentSale.time}
          product={currentSale.product}
          onHide={() => setIsVisible(false)}
        />
      )}
    </div>
  );
}
