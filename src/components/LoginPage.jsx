import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Login from '../assets/Login.png';

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false); // Start with Login mode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      const user = auth.currentUser;
      console.log("User ID:", user.uid);

      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);
      console.log("User document exists:", userSnap.exists());

      if (!userSnap.exists()) {
        navigate('/profile-setup');
      } else {
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        navigate('/profile-setup');
      } else {
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to navigate directly to signup page
  const handleGoToSignup = () => {
    navigate('/signup'); // Directly navigate to /signup route
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Half */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-start pt-20 px-10">
        <h1 className="mt-20 text-3xl font-semibold text-center text-green-500 mb-8">
          {isSignup ? 'Create Your Account' : 'Log In'}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-[40rem] ml-40 mr-40 bg-gray-100 p-8 rounded-lg shadow-xl border border-gray-200"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-600 hover:text-gray-900"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 mt-6 rounded-md hover:bg-green-700 transition duration-300"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>

          {/* Toggle Link */}
          <div className="text-center mt-4">
            {/* Instead of toggling, directly navigate to signup page */}
            <button
              type="button"
              onClick={handleGoToSignup} // Use navigate for redirection
              className="text-green-600 hover:underline"
            >
              {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-300"></div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition duration-300"
          >
            <FcGoogle size={24} />
            Login with Google
          </button>
        </form>
      </div>

      {/* Right Half: Image and Heading */}
      <div className="w-full md:w-1/2 relative">
        <img src={Login} alt="Career Guidance" className="w-full h-full object-cover" />
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Start Your Career Journey Today</h2>
          <p className="text-lg">Find the perfect career path based on your skills and interests.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
