import React, { useState } from 'react';

function CareerGuidancePage() {
  const [formData, setFormData] = useState({
    interests: '',
    hobbies: '',
    skills: '',
    academics: '',
  });
  const [recommendations, setRecommendations] = useState({
    skills_recommendations: '',
    interests_recommendations: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending data to FastAPI backend
    try {
      const response = await fetch("http://localhost:8000/submit-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: "123456", // This can be dynamically set based on user authentication
          email: "student@example.com", // This can be dynamically set based on user authentication
          academic_background: formData.academics,
          skills: formData.skills.split(',').map(skill => skill.trim()),
          interests: formData.interests.split(',').map(interest => interest.trim()),
        }),
      });

      const data = await response.json();

      // Set recommendations from FastAPI response
      if (response.ok) {
        setRecommendations({
          skills_recommendations: data.skills_recommendations,
          interests_recommendations: data.interests_recommendations,
        });
      } else {
        alert("Error: " + data.error);
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form.");
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-10">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-10">
        Career Guidance Form
      </h1>

      <p className="max-w-3xl mx-auto text-center text-gray-700 mb-12">
        Tell us about your interests, hobbies, skills, and academic background. 
        Our AI-powered system will analyze your inputs and help you find the best career path.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-gray-100 p-10 rounded-lg shadow-lg"
      >
        {/* Interests */}
        <div className="mb-6">
          <label htmlFor="interests" className="block text-green-700 font-semibold mb-2">
            Interests
          </label>
          <textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            rows={3}
            placeholder="Describe your interests..."
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            required
          />
        </div>

        {/* Hobbies */}
        <div className="mb-6">
          <label htmlFor="hobbies" className="block text-green-700 font-semibold mb-2">
            Hobbies
          </label>
          <textarea
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            rows={3}
            placeholder="Write about your hobbies..."
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            required
          />
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label htmlFor="skills" className="block text-green-700 font-semibold mb-2">
            Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={3}
            placeholder="List your skills..."
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            required
          />
        </div>

        {/* Academic Background */}
        <div className="mb-6">
          <label htmlFor="academics" className="block text-green-700 font-semibold mb-2">
            Academic Background
          </label>
          <textarea
            id="academics"
            name="academics"
            value={formData.academics}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us about your education..."
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 font-semibold text-lg"
        >
          Submit
        </button>
      </form>

      {/* Display Recommendations */}
      {recommendations.skills_recommendations && (
        <div className="mt-10 bg-green-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-700">Career Recommendations:</h2>
          <p className="text-lg mt-4">Based on your skills, we recommend you consider a role as a <strong>{recommendations.skills_recommendations}</strong>.</p>
          <p className="text-lg mt-4">Based on your interests, we recommend a career as a <strong>{recommendations.interests_recommendations}</strong>.</p>
        </div>
      )}
    </div>
  );
}

export default CareerGuidancePage;
