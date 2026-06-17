import { z } from 'zod';

export const submitAssessmentSchema = z.object({
  body: z.object({
    interest_score: z.number().min(0).max(100),
    aptitude_score: z.number().min(0).max(100),
    personality_score: z.number().min(0).max(100),
    technical_score: z.number().min(0).max(100),
    communication_score: z.number().min(0).max(100),
    leadership_score: z.number().min(0).max(100),
    creativity_score: z.number().min(0).max(100),
    overall_score: z.number().min(0).max(100).optional(), // Can be calculated on backend
  }),
});
