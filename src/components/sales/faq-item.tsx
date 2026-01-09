import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={question} className="border-b">
        <AccordionTrigger className="text-left font-semibold hover:no-underline">{question}</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
