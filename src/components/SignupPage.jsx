import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import grass from '../assets/Login.png';
import { FcGoogle } from 'react-icons/fc';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle normal sign up
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save username to Firestore after successful signup
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        username,
        email,
        profileCompleted: false,  // Initially, profile is not completed
      });

      // Navigate to profile setup page
      navigate('/profile-setup');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google sign up
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user data to Firestore after successful Google signup
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        username: user.displayName,  // You can extract username from Google profile
        email: user.email,
        profileCompleted: false,  // Initially, profile is not completed
      });

      // Navigate to profile setup page
      navigate('/profile-setup');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Half */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-start pt-20 px-10">
        <h1 className="mt-20 text-3xl font-semibold text-center text-green-500 mb-8">Sign Up</h1>

        <form onSubmit={handleSubmit} className="max-w-[40rem] ml-40 mr-40 bg-gray-100 p-8 rounded-lg shadow-xl border border-gray-200">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div className="mt-4">
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 mt-6 rounded-md hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-gray-400 text-white py-2 mt-4 rounded-md hover:bg-gray-500 transition duration-300"
          >
            <FcGoogle size={24} />
            Sign Up with Google
          </button>

          {/* Link to Login page */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-green-600 hover:underline"
            >
              Already have an account? Log In
            </button>
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2 relative">
        <img src={grass} alt="Signup Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default SignupPage;
