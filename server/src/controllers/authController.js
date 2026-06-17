import * as authService from '../services/authService.js';
import { AppError } from '../middleware/errorHandler.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, full_name } = req.body;
    const user = await authService.registerUser(email, password, full_name);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
          user: {
              id: user.id,
              email: user.email
          }
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const sessionData = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: sessionData,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return next(new AppError('No token provided', 400));
        }

        await authService.logoutUser(token);

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(error);
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        await authService.resetPasswordRequest(email);

        res.status(200).json({
            success: true,
            message: 'Password reset email sent'
        });
    } catch(error) {
        next(error);
    }
}
