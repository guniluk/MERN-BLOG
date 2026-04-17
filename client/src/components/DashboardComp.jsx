import {
  Button,
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TableBody,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-80 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-sm uppercase dark:text-gray-200">
                Total Users
              </h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 text-white rounded-full p-3 text-5xl shadow-lg" />
          </div>
          <div className="flex gap-3 text-sm">
            <span className="text-green-500 flex items-center dark:text-gray-200">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500 dark:text-gray-200">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-80 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-sm uppercase dark:text-gray-200">
                Total Posts
              </h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-500 text-white rounded-full p-3 text-5xl shadow-lg" />
          </div>
          <div className="flex gap-3 text-sm">
            <span className="text-green-500 flex items-center dark:text-gray-200">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500 dark:text-gray-200">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-80 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-sm uppercase dark:text-gray-200">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-500 text-white rounded-full p-3 text-5xl shadow-lg" />
          </div>
          <div className="flex gap-3 text-sm">
            <span className="text-green-500 flex items-center dark:text-gray-200">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500 dark:text-gray-200">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center my-3 mx-auto">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-slate-800 my-2">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button color="green" outline>
              <Link to="/dashboard?tab=users" className="text-sm">
                <span>See All</span>
              </Link>
            </Button>
          </div>
          <Table hoverable className="w-full">
            <TableHead>
              <TableRow>
                <TableHeadCell>User Image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {users &&
                users.map((user) => (
                  <TableRow
                    key={user._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-slate-800 my-2">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent posts</h1>
            <Button color="green" outline>
              <Link to="/dashboard?tab=posts" className="text-sm">
                <span>See All</span>
              </Link>
            </Button>
          </div>
          <Table hoverable className="w-full">
            <TableHead>
              <TableRow>
                <TableHeadCell>Post Image</TableHeadCell>
                <TableHeadCell>Post Title</TableHeadCell>
                <TableHeadCell>Post Category</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {posts &&
                posts.map((post) => (
                  <TableRow
                    key={post._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-14 h-10 object-cover bg-gray-500 rounded-md"
                      />
                    </TableCell>
                    <TableCell className=" w-96 line-clamp-2">
                      {post.title}
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-slate-800 my-2">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button color="green" outline>
              <Link to="/dashboard?tab=comments" className="text-sm">
                <span>See All</span>
              </Link>
            </Button>
          </div>
          <Table hoverable className="w-full">
            <TableHead>
              <TableRow>
                <TableHeadCell>Comment Content</TableHeadCell>
                <TableHeadCell>Likes</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {comments &&
                comments.map((comment) => (
                  <TableRow
                    key={comment._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </TableCell>

                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
