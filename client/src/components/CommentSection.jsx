import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Comment from './Comment';
import {
  Alert,
  Button,
  Textarea,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    if (commentError) {
      const timer = setTimeout(() => {
        setCommentError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [commentError]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postId]);

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
        setCommentError(data.message);
        return;
      }
      setComment('');
      setCommentError(null);
      setComments([data, ...comments]);
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id
          ? {
              ...c,
              content: editedContent,
            }
          : c,
      ),
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
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
              {300 - comment.length} characters remaining
            </p>
            <Button outline color="green" type="submit">
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
      {comments.length === 0 ? (
        <div className="my-5 text-sm">No comments yet</div>
      ) : (
        <>
          <div className="flex text-sm items-center my-3 gap-2">
            <p>Comments:</p>
            <div className="border border-slate-500 py-1 px-3 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        {/* <ModalHeader>Delete Comment</ModalHeader> */}
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center gap-4">
          <Button color="red" onClick={() => handleDelete(commentToDelete)}>
            Yes, I'm sure
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            No, cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
