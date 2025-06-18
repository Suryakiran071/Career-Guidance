import React from 'react';

function Recommendations({ recommendations }) {
  if (!recommendations) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h3 className="text-2xl font-semibold mb-4">Recommended Career Path</h3>
      <p className="text-lg">Job Role: <span className="font-medium">{recommendations.jobRole}</span></p>
      <p className="text-lg">Suggested Certifications: <span className="font-medium">{recommendations.certifications.join(', ')}</span></p>
      <p className="text-lg">Suggested Courses: <span className="font-medium">{recommendations.suggestedCourses.join(', ')}</span></p>
    </div>
  );
}

export default Recommendations;
