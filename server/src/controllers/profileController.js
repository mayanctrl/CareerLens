import * as profileService from '../services/profileService.js';

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await profileService.getProfile(userId);
    
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    const updatedProfile = await profileService.updateProfile(userId, profileData);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { avatarUrl } = req.body;

        const updatedProfile = await profileService.updateAvatar(userId, avatarUrl);

        res.status(200).json({
            success: true,
            message: 'Avatar updated successfully',
            data: updatedProfile
        })
    } catch(error) {
        next(error);
    }
}
