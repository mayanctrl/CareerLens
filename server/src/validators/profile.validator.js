import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    full_name: z.string().min(2).optional(),
    phone: z.string().optional(),
    college: z.string().optional(),
    degree: z.string().optional(),
    branch: z.string().optional(),
    year: z.string().optional(),
    bio: z.string().optional(),
    linkedin_url: z.string().url().optional().or(z.literal('')),
    github_url: z.string().url().optional().or(z.literal('')),
    portfolio_url: z.string().url().optional().or(z.literal('')),
    career_goal: z.string().optional(),
    current_level: z.string().optional(),
  }),
});
