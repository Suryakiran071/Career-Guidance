import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import students from '../assets/Students.png'; // Replace with your actual image path

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Chat Now Button */}
      <Link
        to="/chatbot" // Redirect to Chatbot page when clicked
        className="fixed bottom-4 right-4 bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-700 transition duration-300 z-10"
      >
        Chat Now
      </Link>

      {/* First Half: Image with Darker Tint, Heading, and Get Started Button */}
      <div className="relative w-full h-[60vh]">
        <img
          src={students}
          alt="Career Guidance"
          className="w-full h-full object-cover object-top opacity-90"  // Darker image with higher opacity for the overlay
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div> {/* Darker Black Tint */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h1 className="text-4xl mt-16 font-bold mb-9 text-white-500">Your Career Starts Here</h1>
          <Link
            to="/career-guidance"
            className="bg-teal-600 mt-5 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Second Half: White Background with Text */}
      <div className="bg-white py-20 px-5">
        <h2 className="text-4xl font-semibold text-center text-teal-500 mb-6">What We Do</h2>
        <p className="text-center text-lg text-gray-700 max-w-7xl mx-auto">
          Welcome to our AI-powered career guidance platform. We help you discover the ideal career path based on your unique skills, interests, and academic background. Our intelligent recommendation system analyzes your data and provides personalized suggestions tailored to your strengths. Whether you're just starting your career or looking for a change, we are here to help you make informed decisions and start your professional journey with confidence. Get started with us today, and find the perfect fit for your future!
        </p>
      </div>

      {/* Features & Benefits Section */}
      <div className="py-20 px-5 bg-gray-800">
        <h2 className="text-4xl font-semibold text-center text-teal-500 mb-8">Features & Benefits</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          <div className="text-center text-white">
            <div className="text-3xl font-semibold mb-4 text-teal-600">Personalized Recommendations</div>
            <p className="text-gray-300">
              Get career suggestions based on your unique skills, interests, and academic background.
            </p>
          </div>
          <div className="text-center text-white">
            <div className="text-3xl font-semibold mb-4 text-teal-600">AI-Powered Insights</div>
            <p className="text-gray-300">
              Use advanced AI algorithms to analyze your data and get actionable insights tailored to your future.
            </p>
          </div>
          <div className="text-center text-white">
            <div className="text-3xl font-semibold mb-4 text-teal-600">Career Exploration Tools</div>
            <p className="text-gray-300">
              Explore various career paths, industries, and job roles to find your perfect fit.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-20 px-5">
        <h2 className="text-4xl font-semibold text-center text-teal-500 mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-700 italic mb-4">
              "This platform helped me identify the perfect career path based on my skills and interests. Highly recommended!"
            </p>
            <p className="font-semibold text-teal-600">John Doe</p>
            <p className="text-gray-500">Software Engineer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-700 italic mb-4">
              "I love how personalized the recommendations are. The AI insights were exactly what I needed to make a career change."
            </p>
            <p className="font-semibold text-teal-600">Jane Smith</p>
            <p className="text-gray-500">Data Scientist</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-700 italic mb-4">
              "The career exploration tools were fantastic! I was able to discover job roles I never thought about before."
            </p>
            <p className="font-semibold text-teal-600">Mark Johnson</p>
            <p className="text-gray-500">Marketing Specialist</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 Career Guidance Platform. All rights reserved.</p>
          <p className="mt-2 text-sm">
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link> | 
            <Link to="/terms-of-service" className="hover:underline"> Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
