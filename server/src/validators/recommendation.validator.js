import { z } from 'zod';

export const generateRecommendationSchema = z.object({
    body: z.object({
        assessment_id: z.string().uuid().optional() // Optional, if not provided, uses latest
    })
})
