import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

dayjs.extend(relativeTime);

export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 border-b border-slate-500 dark:border-gray-600 text-sm">
      <div className="shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-2 text-xs truncate">
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className="text-gray-500 text-xs dark:text-gray-200">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2 dark:text-gray-200">
          {comment.content}
        </p>
        <div className="flex gap-3 items-center pt-2 text-xs max-w-fit border-t dark:border-gray-500">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 hover:cursor-pointer ${currentUser && comment.likes && comment.likes.includes(currentUser._id) && 'text-blue-500!'}`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                ' ' +
                (comment.numberOfLikes === 1 ? 'like' : 'likes')}
          </p>
        </div>
      </div>
    </div>
  );
}
