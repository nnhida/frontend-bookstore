import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const [message, setMessage] = useState('');
  const { registerUser, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      alert('User registered successfully');
    } catch (error) {
      setMessage('Please provide a valid email and password');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert('Signed in with Google');
    } catch (error) {
      setMessage('Failed to sign in with Google');
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Please Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}
          <div>
            <button className="px-6 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">Register</button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700"
          >
            Login
          </Link>
        </p>

        {/* Google Sign-In */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
