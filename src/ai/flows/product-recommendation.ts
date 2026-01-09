'use server';

/**
 * @fileOverview Recommends a product based on the user's quiz answers.
 *
 * - recommendProduct - A function that recommends a product based on quiz answers.
 * - ProductRecommendationInput - The input type for the recommendProduct function.
 * - ProductRecommendationOutput - The return type for the recommendProduct function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationInputSchema = z.object({
  quizAnswers: z
    .record(z.string(), z.string())
    .describe('A record of quiz questions and user answers.'),
});

export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

const ProductRecommendationOutputSchema = z.object({
  recommendedProduct: z
    .string()
    .describe('The name of the product recommended to the user.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the product recommendation.'),
});

export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function recommendProduct(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return recommendProductFlow(input);
}

const recommendProductPrompt = ai.definePrompt({
  name: 'recommendProductPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `You are an AI product recommendation expert.
Based on the user's answers to the quiz questions, determine the most suitable product for them.

Quiz Answers:
{{#each quizAnswers}}
  {{@key}}: {{this}}
{{/each}}

Recommend a product and explain your reasoning in a concise manner.
`,
});

const recommendProductFlow = ai.defineFlow(
  {
    name: 'recommendProductFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await recommendProductPrompt(input);
    return output!;
  }
);
