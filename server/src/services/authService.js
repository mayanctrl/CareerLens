import { supabaseAdmin } from '../config/supabase.js';
import { AppError } from '../middleware/errorHandler.js';

export const registerUser = async (email, password, fullName) => {
  // 1. Register with Supabase Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm for now, can be changed based on requirements
  });

  if (authError) {
    throw new AppError(authError.message, 400);
  }

  const userId = authData.user.id;

  // 2. Create Profile
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert([
      {
        id: userId, // Match auth.users id
        auth_id: userId,
        full_name: fullName,
        email: email,
      },
    ]);

  if (profileError) {
    // If profile creation fails, we should ideally rollback auth user creation
    await supabaseAdmin.auth.admin.deleteUser(userId);
    throw new AppError(`Failed to create user profile: ${profileError.message}`, 500);
  }

  return authData.user;
};

export const loginUser = async (email, password) => {
    // Note: We use the regular client here to get a session
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new AppError(error.message, 401);
    }

    return data;
};

export const logoutUser = async (token) => {
    const { error } = await supabaseAdmin.auth.admin.signOut(token);
    if(error){
        throw new AppError(error.message, 400);
    }
    return true;
}

export const resetPasswordRequest = async (email) => {
    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email);
    if(error){
        throw new AppError(error.message, 400);
    }
    return true;
}
