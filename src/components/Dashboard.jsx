import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [jobAnalytics, setJobAnalytics] = useState([]);

  // Fetch job analytics data from the backend API
  useEffect(() => {
    const fetchJobAnalytics = async () => {
      try {
        const response = await axios.get("http://localhost:8000/job-analytics");
        setJobAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching job analytics data", error);
      }
    };

    fetchJobAnalytics();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="text-4xl font-bold">Job Analytics Dashboard</h1>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={jobAnalytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jobTitle" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="averageSalary" fill="#8884d8" />
            <Bar dataKey="demand" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
