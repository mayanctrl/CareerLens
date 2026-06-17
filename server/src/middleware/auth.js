import { supabaseAdmin } from '../config/supabase.js';
import { AppError } from './errorHandler.js';

export const requireAuth = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in. Please log in to get access.', 401));
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return next(new AppError('The user belonging to this token no longer exists or token is invalid.', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Authentication failed', 401));
  }
};
