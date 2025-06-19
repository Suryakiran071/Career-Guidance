import React, { useState } from "react";
import axios from "axios";

const CareerGuidancePage = () => {
  const [formData, setFormData] = useState({
    interests: "",
    hobbies: "",
    skills: "",
    academics: "",
  });

  const [careerRecommendation, setCareerRecommendation] = useState({
    career_field: "",
    job_specialization: "",
    description: "",
  });

  const [error, setError] = useState(null);

  const handleChange = async (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null); // Clear previous errors when user types
  }; // Added semicolon

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/submit-profile", {
        uid: "12345678",
        email: "student@example.com",
        academic_background: formData.academics,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        interests: formData.interests.split(",").map((interest) => interest.trim()),
        qualifications: [],
      });

      if (response.status === 200 && response.data.career_recommendations) {
        setCareerRecommendation(response.data.career_recommendations);
        setError(null);
      } else {
        setError(response.data.error || "Failed to fetch career recommendations.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="mt-10 min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-16">
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-4">
        Career Guidance Form
      </h1>
      <p className="max-w-2xl mx-auto text-center text-gray-600 mb-10">
        Share your interests, skills, and academic background to discover your ideal career path with our AI-powered guidance system.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded shadow-lg"
      >
        {/* Interests */}
        <div className="mb-6">
          <label htmlFor="interests" className="block text-teal-700 font-semibold mb-2">
            Interests
          </label>
          <textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            rows={1}
            placeholder="E.g., music, technology, writing..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            required
          />
        </div>

        {/* Hobbies */}
        <div className="mb-6">
          <label htmlFor="hobbies" className="block text-teal-700 font-semibold mb-2">
            Hobbies
          </label>
          <textarea
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            rows={1}
            placeholder="E.g., playing guitar, hiking..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            required
          />
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label htmlFor="skills" className="block text-teal-700 font-semibold mb-2">
            Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={1}
            placeholder="E.g., programming, communication..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            required
          />
        </div>

        {/* Academic Background */}
        <div className="mb-6">
          <label htmlFor="academics" className="block text-teal-700 font-semibold mb-2">
            Academic Background
          </label>
          <textarea
            id="academics"
            name="academics"
            value={formData.academics}
            onChange={handleChange}
            rows={1}
            placeholder="E.g., B.S. in Computer Science..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition duration-300 font-semibold"
        >
          Get Recommendations
        </button>
      </form>

      {/* Display Errors */}
      {error && (
        <div className="mt-8 max-w-3xl mx-auto text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Display Career Recommendations */}
      {careerRecommendation.career_field && !error && (
        <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Your Career Recommendation</h2>
          <p className="text-lg mb-2"><strong>Career Field:</strong> {careerRecommendation.career_field}</p>
          <p className="text-lg mb-2"><strong>Job Specialization:</strong> {careerRecommendation.job_specialization}</p>
          <p className="text-lg"><strong>Description:</strong> {careerRecommendation.description}</p>
        </div>
      )}
    </div>
  );
};

export default CareerGuidancePage;