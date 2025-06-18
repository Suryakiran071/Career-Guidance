import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const user = getAuth().currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserDetails(userSnap.data());
        }
      };
      fetchUserDetails();
    }
  }, [user]);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-green-500 mb-6">Your Profile</h2>

        <div className="flex justify-center mb-4">
          {/* Display Profile Picture */}
          {userDetails.profilePicture ? (
            <img
              src={userDetails.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white">
              {userDetails.fullName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <p className="text-gray-800">{userDetails.fullName}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="text-gray-800">{user.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <p className="text-gray-800">{userDetails.phoneNumber}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Academic Background</label>
          <p className="text-gray-800">{userDetails.academicBackground}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <p className="text-gray-800">{userDetails.skills?.join(', ')}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Interests</label>
          <p className="text-gray-800">{userDetails.interests?.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
