import { supabaseAdmin } from '../config/supabase.js';
import { AppError } from '../middleware/errorHandler.js';

export const getProfile = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new AppError(`Failed to fetch profile: ${error.message}`, 404);
  }

  return data;
};

export const updateProfile = async (userId, profileData) => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new AppError(`Failed to update profile: ${error.message}`, 400);
  }

  return data;
};

export const updateAvatar = async (userId, file) => {
    // In a real app, you would upload the file buffer to Supabase Storage
    // Here we're just simulating it as this might require 'multer' for file parsing
    // Example: await supabaseAdmin.storage.from('avatars').upload(`${userId}/avatar.png`, file.buffer);
    
    // Let's assume the file is a base64 string or public URL for simplicity in this MVP API
    const avatarUrl = file; 

    const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({ profile_image: avatarUrl })
        .eq('id', userId)
        .select()
        .single();
    
    if (error) {
        throw new AppError(`Failed to update avatar: ${error.message}`, 400);
    }
    
    return data;
}
