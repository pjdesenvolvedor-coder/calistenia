"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import actualPlaceholderData from "@/lib/placeholder-images.json";

const carouselImages = actualPlaceholderData.placeholderImages.filter(img => img.id.startsWith('carousel-'));
const TOTAL_LOADING_TIME = 8000; // 8 seconds

export function LoadingScreen({
  onLoadingComplete,
}: {
  mainGoal: string; // Kept for prop compatibility, but not used in the new design.
  onLoadingComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const onLoadingCompleteRef = useRef(onLoadingComplete);
  onLoadingCompleteRef.current = onLoadingComplete;

  const autoplayPlugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      
      const elapsedTime = timestamp - startTime;
      const currentProgress = Math.min((elapsedTime / TOTAL_LOADING_TIME) * 100, 100);
      setProgress(currentProgress);
      
      if (elapsedTime >= TOTAL_LOADING_TIME) {
        onLoadingCompleteRef.current();
        return; 
      }
      
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto p-4 sm:p-6 text-center animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
       <CardContent className="p-0 flex flex-col justify-between h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] md:min-h-0 relative">
        <div className="flex-shrink-0">
          <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg py-2 px-3 mb-6">
            <p className="font-semibold text-sm sm:text-base">
              Montando seu treino com base nas suas informações...
            </p>
          </div>

          <div className="space-y-1 text-left transition-opacity duration-300 opacity-100">
            <div className="flex items-center text-xs sm:text-sm font-medium text-foreground/80">
              <span className="truncate">Progresso</span>
              <span className="ml-auto text-xs font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center my-6">
            <div className="flex flex-col items-center gap-4">
              <p className="font-headline text-2xl font-bold uppercase tracking-wider">Antes e Depois do Método</p>
              <Carousel 
                className="w-full max-w-[200px] sm:max-w-xs mx-auto"
                plugins={[autoplayPlugin.current]}
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {carouselImages.map((image) => (
                    <CarouselItem key={image.id}>
                      <div className="p-1">
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                            <Image
                              src={image.imageUrl}
                              alt={image.description}
                              fill
                              className="object-cover"
                              data-ai-hint={image.imageHint}
                              sizes="(max-width: 640px) 150px, 200px"
                              priority={carouselImages.indexOf(image) < 2}
                            />
                          </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
