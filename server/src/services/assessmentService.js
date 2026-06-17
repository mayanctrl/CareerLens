import { supabaseAdmin } from '../config/supabase.js';
import { AppError } from '../middleware/errorHandler.js';

export const submitAssessment = async (userId, assessmentData) => {
  // Calculate overall score if not provided
  if (assessmentData.overall_score === undefined) {
    const scores = [
        assessmentData.interest_score,
        assessmentData.aptitude_score,
        assessmentData.personality_score,
        assessmentData.technical_score,
        assessmentData.communication_score,
        assessmentData.leadership_score,
        assessmentData.creativity_score
    ];
    assessmentData.overall_score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  const payload = {
      user_id: userId,
      ...assessmentData,
      assessment_date: new Date().toISOString()
  };

  const { data, error } = await supabaseAdmin
    .from('career_assessments')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new AppError(`Failed to submit assessment: ${error.message}`, 400);
  }

  return data;
};

export const getLatestAssessment = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from('career_assessments')
    .select('*')
    .eq('user_id', userId)
    .order('assessment_date', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found", which is fine
    throw new AppError(`Failed to fetch assessment: ${error.message}`, 404);
  }

  return data || null;
};

export const getAssessmentHistory = async (userId) => {
    const { data, error } = await supabaseAdmin
        .from('career_assessments')
        .select('*')
        .eq('user_id', userId)
        .order('assessment_date', { ascending: false });

    if(error){
        throw new AppError(`Failed to fetch assessment history: ${error.message}`, 404);
    }

    return data;
}
