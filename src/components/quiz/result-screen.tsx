"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductRecommendationOutput } from "@/ai/flows/product-recommendation";
import placeholderData from "@/lib/placeholder-images.json";
import { Facebook, Link, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type ResultScreenProps = {
  recommendation: ProductRecommendationOutput;
  onRetake: () => void;
};

const productImages: Record<string, string> = {
  'Box Essencial': 'box-essencial',
  'Box Plus': 'box-plus',
  'Box Premium': 'box-premium',
  'Produto Padrão': 'produto-padrão',
};

const SocialShare = ({ text }: { text: string }) => {
  const encodedText = encodeURIComponent(text);
  const url = "https://example.com"; // Replace with your actual URL

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" size="icon">
        <a href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4" />
          <span className="sr-only">Compartilhar no Twitter</span>
        </a>
      </Button>
      <Button asChild variant="outline" size="icon">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-4 w-4" />
          <span className="sr-only">Compartilhar no Facebook</span>
        </a>
      </Button>
      <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(`${text} ${url}`)}>
        <Link className="h-4 w-4" />
        <span className="sr-only">Copiar link</span>
      </Button>
    </div>
  );
};


export function ResultScreen({ recommendation, onRetake }: ResultScreenProps) {
  const { recommendedProduct, reasoning } = recommendation;
  const imageId = productImages[recommendedProduct] || productImages['Produto Padrão'];
  const productImage = placeholderData.placeholderImages.find(
    (img) => img.id === imageId
  );

  const shareText = `Minha recomendação do quiz é o ${recommendedProduct}! Descubra a sua também.`;

  return (
    <Card className="w-full max-w-md mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
      <CardHeader>
        <CardTitle className="font-headline text-2xl font-bold">
          Sua recomendação personalizada!
        </CardTitle>
        <CardDescription>
          Com base nas suas respostas, este é o plano que recomendamos para você:
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {productImage && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
            <Image
              src={productImage.imageUrl}
              alt={productImage.description}
              fill
              className="object-cover"
              data-ai-hint={productImage.imageHint}
            />
          </div>
        )}
        <h3 className="text-xl font-headline font-semibold text-primary">{recommendedProduct}</h3>
        <div className="text-left bg-secondary/50 p-4 rounded-lg w-full">
            <h4 className="font-bold mb-2">Por que recomendamos isso:</h4>
            <p className="text-sm text-muted-foreground">{reasoning}</p>
        </div>
      </CardContent>
      <Separator className="my-4"/>
      <CardFooter className="flex-col gap-4">
        <div className="flex items-center justify-between w-full">
            <p className="text-sm font-semibold">Compartilhe seu resultado!</p>
            <SocialShare text={shareText} />
        </div>
        <Button onClick={onRetake} variant="ghost" className="w-full">
          Refazer Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}
