import { TextInput, Label, Button, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('All fields are required');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      setFormData({});
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="mt-5 min-h-screen flex">
      <div className="flex flex-col gap-5 p-3 max-w-3xl mx-auto md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1">
          <Link
            to="/"
            className=" font-bold text-gray-800 hover:text-gray-500 dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Young's
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            This is a blog homepage in that you can put any idea or opinion as
            you wish.{' '}
          </p>
        </div>

        {/* right side */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div>
              <label htmlFor="username">Your username </label>
              <TextInput
                id="username"
                type="text"
                value={formData.username || ''}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email">Your e-mail</label>
              <TextInput
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label htmlFor="password">Your password</label>
              <TextInput
                id="password"
                type="password"
                value={formData.password || ''}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            {/* <button className="bg-amber-700 text-lg text-white font-semibold rounded-lg py-2">
              Sign Up{' '}
            </button> */}
            <Button
              type="submit"
              color="green"
              disabled={loading}
              className="font-bold"
            >
              {loading ? (
                <>
                  {' '}
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
