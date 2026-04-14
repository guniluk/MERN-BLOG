import { Alert, Button, Textarea } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    if (commentError) {
      const timer = setTimeout(() => {
        setCommentError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [commentError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 300) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: comment,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // console.log(data.message);
        setCommentError(data.message);
        return;
      }
      setComment('');
      setCommentError(null);
      // console.log(data);
    } catch (error) {
      setCommentError(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex gap-1 items-center my-5 text-gray-700 text-sm dark:text-gray-100">
          <p>Signed in as: </p>
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="rounded-full h-5 w-5 object-cover"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-shadow-cyan-500 hover:underline"
          >
            {currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-700 dark:text-gray-100 my-3 flex gap-2">
          You must login to comment
          <Link
            to="/sign-in"
            className="text-blue-600 hover:underline ml-1 dark:text-blue-200"
          >
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3 flex flex-col gap-5"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="5"
            maxLength="300"
            className="w-full"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm">
              {300 - comment.length} haracters remaining
            </p>
            <Button outline color="green" type="submit" className="">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="red" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
    </div>
  );
}
