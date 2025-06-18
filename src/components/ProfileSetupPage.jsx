import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { db, storage } from '../firebase';  // Ensure you have Firebase Storage initialized
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ProfileSetupPage() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [academicBackground, setAcademicBackground] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = getAuth().currentUser;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Store profile picture in Firebase Storage
      let profilePictureUrl = '';
      if (profilePicture) {
        const pictureRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(pictureRef, profilePicture);
        profilePictureUrl = await getDownloadURL(pictureRef);
      }

      // Update Firestore with user details
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        fullName,
        phoneNumber,
        academicBackground,
        skills: skills.split(','),
        interests: interests.split(','),
        profileCompleted: true,
        profilePicture: profilePictureUrl, // Save the profile picture URL
      });

      // Redirect to the home page after profile setup
      navigate('/');
    } catch (err) {
      setError("Error updating profile: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-green-500 mb-6">Complete Your Profile</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Academic Background */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Academic Background</label>
            <input
              type="text"
              value={academicBackground}
              onChange={(e) => setAcademicBackground(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Skills */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Interests */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Interests (comma-separated)</label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Profile Picture */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 mt-6 rounded-md hover:bg-green-700 transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetupPage;
