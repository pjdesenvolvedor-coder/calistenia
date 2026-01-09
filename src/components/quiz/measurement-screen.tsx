"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Question } from "@/lib/quiz-data";

type MeasurementScreenProps = {
  question: Question;
  onSubmit: (measurements: Record<string, string>) => void;
};

export function MeasurementScreen({ question, onSubmit }: MeasurementScreenProps) {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(180);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "pol">("cm");

  const handleSubmit = () => {
    onSubmit({
      "Peso": `${weight}${weightUnit}`,
      "Altura": `${height}${heightUnit}`,
    });
  };
  
  const Ruler = ({ min, max, value }: { min: number, max: number, value: number }) => {
    const segments = [];
    for (let i = min; i <= max; i += 1) {
      const isMajor = i % 10 === 0;
      const isValue = i === value;
      segments.push(
        <div key={i} className="flex flex-col items-center">
          <div className={`bg-gray-300 ${isMajor ? 'h-4 w-0.5' : 'h-2 w-px'}`} />
          {isMajor && <span className="text-xs text-muted-foreground mt-1">{i}</span>}
        </div>
      );
    }
    return <div className="flex justify-between w-full px-1">{segments}</div>;
  };

  const minWeight = 40;
  const maxWeight = 150;
  const minHeight = 140;
  const maxHeight = 220;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-5 duration-500">
      <Card className="w-full max-w-md mx-auto bg-card border-border shadow-lg">
        <CardHeader className="text-center">
          {question.description && (
            <CardDescription className="text-primary font-semibold bg-primary/10 border border-primary/20 rounded-lg py-2 px-4 mb-4">
              {question.description}
            </CardDescription>
          )}
          <CardTitle className="font-body text-3xl font-bold">
            {question.question}
          </CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            Se não, sem problemas! Basta clicar em "Continuar".
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-8">
          {/* Weight Slider */}
          <div className="w-full flex flex-col items-center space-y-4">
            <Tabs value={weightUnit} onValueChange={(value) => setWeightUnit(value as "kg" | "lb")} className="w-full max-w-[120px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="kg">kg</TabsTrigger>
                <TabsTrigger value="lb">lb</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-4xl font-bold">{weight}{weightUnit}</p>
            <div className="w-full relative">
                <Slider
                    value={[weight]}
                    onValueChange={(value) => setWeight(value[0])}
                    min={minWeight}
                    max={maxWeight}
                    step={1}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-full pointer-events-none" style={{
                    top: 'calc(50% + 10px)',
                    height: '20px',
                    transform: 'translateY(-50%) translateX(-50%)',
                    background: 'var(--primary)'
                }}>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-primary" style={{borderColor: 'transparent transparent hsl(var(--primary)) transparent'}}></div>
                </div>
            </div>
             <Ruler min={60} max={80} value={weight} />
            <span className="text-xs text-muted-foreground">Arraste para ajustar</span>
          </div>

          {/* Height Slider */}
          <div className="w-full flex flex-col items-center space-y-4">
            <Tabs value={heightUnit} onValueChange={(value) => setHeightUnit(value as "cm" | "pol")} className="w-full max-w-[120px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cm">cm</TabsTrigger>
                <TabsTrigger value="pol">pol</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-4xl font-bold">{height}{heightUnit}</p>
             <div className="w-full relative">
                <Slider
                    value={[height]}
                    onValueChange={(value) => setHeight(value[0])}
                    min={minHeight}
                    max={maxHeight}
                    step={1}
                />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-full pointer-events-none" style={{
                    top: 'calc(50% + 10px)',
                    height: '20px',
                    transform: 'translateY(-50%) translateX(-50%)',
                    background: 'var(--primary)'
                }}>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-primary" style={{borderColor: 'transparent transparent hsl(var(--primary)) transparent'}}></div>
                </div>
            </div>
            <Ruler min={170} max={190} value={height} />
            <span className="text-xs text-muted-foreground">Arraste para ajustar</span>
          </div>

          <Button onClick={handleSubmit} size="lg" className="w-full font-bold text-lg bg-green-500 hover:bg-green-600 text-black">
            CONTINUAR &gt;
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}