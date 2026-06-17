import { supabaseAdmin } from '../config/supabase.js';
import { AppError } from '../middleware/errorHandler.js';

export const getRecommendations = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from('career_recommendations')
    .select('*')
    .eq('user_id', userId)
    .order('match_percentage', { ascending: false });

  if (error) {
    throw new AppError(`Failed to fetch recommendations: ${error.message}`, 404);
  }

  return data;
};

export const getRecommendationById = async (id, userId) => {
    const { data, error } = await supabaseAdmin
        .from('career_recommendations')
        .select('*')
        .eq('recommendation_id', id)
        .eq('user_id', userId)
        .single();
    
    if(error) {
        throw new AppError(`Failed to fetch recommendation details: ${error.message}`, 404);
    }
    return data;
}

// Rule-based Recommendation Engine
export const generateRecommendations = async (userId, assessment) => {
  // 1. Fetch all careers from career_insights
  const { data: careers, error: careerError } = await supabaseAdmin
    .from('career_insights')
    .select('*');

  if (careerError) throw new AppError('Failed to fetch career data', 500);

  // 2. Fetch career-skill mappings
  // In a real app, you'd have weights for each skill and career type.
  // For this rule-engine, we'll simulate a scoring algorithm based on the assessment.
  
  const recommendations = careers.map(career => {
    // Simple heuristic algorithm based on career name and assessment scores
    let matchScore = 0;
    
    // Base score from overall
    matchScore += assessment.overall_score * 0.4;

    // specific rules
    const name = career.career_name.toLowerCase();
    
    if (name.includes('software') || name.includes('developer')) {
        matchScore += assessment.technical_score * 0.3;
        matchScore += assessment.aptitude_score * 0.2;
        matchScore += assessment.interest_score * 0.1;
    } else if (name.includes('data') || name.includes('machine learning')) {
        matchScore += assessment.technical_score * 0.3;
        matchScore += assessment.aptitude_score * 0.3;
    } else if (name.includes('designer') || name.includes('ui/ux')) {
        matchScore += assessment.creativity_score * 0.4;
        matchScore += assessment.interest_score * 0.2;
    } else if (name.includes('product') || name.includes('manager')) {
        matchScore += assessment.leadership_score * 0.3;
        matchScore += assessment.communication_score * 0.2;
        matchScore += assessment.technical_score * 0.1;
    } else {
        // Generic fallback
        matchScore += assessment.interest_score * 0.2;
        matchScore += assessment.communication_score * 0.2;
        matchScore += assessment.technical_score * 0.2;
    }

    // Normalize and cap at 99
    matchScore = Math.min(Math.round(matchScore), 99);
    
    // Add some random variation so it's not identical every time for same scores
    matchScore += Math.floor(Math.random() * 5) - 2;
    matchScore = Math.min(Math.max(matchScore, 40), 99); // Clamp between 40 and 99

    return {
        user_id: userId,
        career_name: career.career_name,
        match_percentage: matchScore,
        salary_range: career.average_salary,
        growth_rate: career.industry_growth,
        difficulty: career.future_demand === 'High' ? 'Hard' : 'Medium',
        description: career.description,
        generated_at: new Date().toISOString()
    };
  });

  // Sort by match percentage
  recommendations.sort((a, b) => b.match_percentage - a.match_percentage);

  // Take top 5
  const topRecommendations = recommendations.slice(0, 5);

  // 3. Clear old recommendations
  await supabaseAdmin
    .from('career_recommendations')
    .delete()
    .eq('user_id', userId);

  // 4. Save new recommendations
  const { data, error: insertError } = await supabaseAdmin
    .from('career_recommendations')
    .insert(topRecommendations)
    .select();

  if (insertError) {
    throw new AppError(`Failed to save recommendations: ${insertError.message}`, 500);
  }

  return data;
};
