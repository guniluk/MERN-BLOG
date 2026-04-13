import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        }
        setLoading(false);
        setError(false);
        setPost(data.posts[0]);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="flex flex-col p-3 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 max-w-2xl font-semibold text-slate-700 dark:text-white lg:text-4xl mx-auto">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="sm">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="w-full object-contain mt-7 max-h-150 p-3"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-x-2xl text-sm ">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 2).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-x-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full ">
        <CallToAction />
      </div>

      {error ? 'Something went wrong' : ''}
    </main>
  );
}
