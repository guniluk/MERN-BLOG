import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({ message: 'Test API route working!' });
};

export const updateUser = async (req, res, next) => {
  // console.log(req.user); //user id form cookie - format{ id: '6', iat: 1 }
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, 'You can update only your account!'));
  }

  if (req.body.password) {
    if (req.body.password.length < 5) {
      return next(errorHandler(400, 'Password must be at least 5 characters!'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 5 and 20 characters!'),
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces!'));
    }
    // if(req.body.username !== req.body.username.toLowerCase()) {
    //   return next(errorHandler(400, 'Username must be in lowercase!'));
    // }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers!'),
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true },
    );
    if (!updatedUser) {
      return next(errorHandler(404, 'User not found!'));
    }
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User signed out successfully!' });
  } catch (error) {
    next(error);
  }
};
