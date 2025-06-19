import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db } from "../firebase"; // Firestore initialized
import axios from "axios"; // For making HTTP requests
import { doc, updateDoc } from "firebase/firestore"; // Add this import


// Cloudinary configuration
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/delj6jicg/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "career"; // Set your upload preset here

function ProfileSetupPage() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [academicBackground, setAcademicBackground] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = getAuth().currentUser;

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let profilePictureUrl = "";

    // If there is a file, upload it to Cloudinary
    if (profilePicture) {
      const formData = new FormData();
      formData.append("file", profilePicture);
      formData.append("upload_preset", "career");  // Make sure to use "career" as a string

      // Upload the image to Cloudinary
      const response = await axios.post(CLOUDINARY_URL, formData);
      profilePictureUrl = response.data.secure_url;  // Get the URL of the uploaded image
    }

    // Save the image URL and other user details to Firestore
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      fullName,
      phoneNumber,
      academicBackground,
      skills: skills.split(","),
      interests: interests.split(","),
      profileCompleted: true,
      profilePicture: profilePictureUrl,  // Save the Cloudinary URL
    });

    // Redirect to the home page after profile setup
    navigate("/");

  } catch (err) {
    setError("Error updating profile: " + err.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
      <div className="w-full max-w-4xl mt-10 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          Complete Your Profile
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex space-x-8">
          {/* Left Side: Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 mb-6">
              {profilePicture ? (
                <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-white">
                  <span>Edit</span>
                </div>
              )}
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Right Side: Other Fields */}
          <div className="w-full space-y-6">
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
            <div>
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
            <div>
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
            <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Interests (comma-separated)</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 mt-6 rounded-md hover:bg-green-700 transition duration-300"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetupPage;
