import { errorHandler } from '../utils/error.js';
import Comment from '../models/comment.model.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not authorized to create a comment!'),
      );
    }
    if (!content || !postId || !userId) {
      return next(errorHandler(400, 'Text fields are required!'));
    }
    const newComment = new Comment({ content, postId, userId });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
