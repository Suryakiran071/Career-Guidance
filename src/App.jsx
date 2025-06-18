import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CareerGuidancePage from './components/CareerGuidancePage';
import LoginPage from './components/LoginPage';
import ProfileSetupPage from './components/ProfileSetupPage';
import Dashboard from './components/Dashboard';
import SignUpPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import ChatbotPage from './components/ChatbotPage';  // Import the ChatbotPage component


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career-guidance" element={<CareerGuidancePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
      </Routes>
    </Router>
  );
}

export default App;
