import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';  // adjust path

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      alert('Logged out successfully!');
      navigate('/');  // Redirect to home page after logging out
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  const avatarLetter = user?.email?.charAt(0).toUpperCase() || '';

  return (
    <nav className="p-4 fixed top-0 left-0 w-full z-10 bg-green-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-semibold">
          Career Guidance
        </Link>

        {/* Always show links */}
        <div className="flex items-center">
          <Link to="/" className="text-white mx-4 hover:text-blue-300">
            Home
          </Link>
          <Link to="/career-guidance" className="text-white mx-4 hover:text-blue-300">
            Career Guidance
          </Link>

          {/* Show "Login" link only if the user is not logged in */}
          {!user && (
            <Link to="/login" className="text-white mx-4 hover:text-blue-300">
              Login
            </Link>
          )}

          {/* If user logged in, show avatar */}
          {user && (
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold uppercase focus:outline-none"
                aria-label="User menu"
              >
                {avatarLetter}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-gray-700">
                  <div className="px-4 py-2 text-sm truncate">{user.email}</div>

                  <Link
                    to="/profile"
                    className="w-full text-left px-4 py-2 hover:bg-green-600 hover:text-white transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-green-600 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
