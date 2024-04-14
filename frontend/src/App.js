import logo from './logo.svg';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './pages/Registration';
import Login from './pages/Login';

import PostListPage from './components/Post';
import LikedPostsPage from './components/LikedPost';
import PostListByCurrentUser from './components/CurrentUserPosts';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter> {/* Wrap the app in a BrowserRouter component */}
      <Routes> {/* Use the Routes component to define the routes */}
        <Route path="/" element={<ProtectedRoute><PostListPage /></ProtectedRoute>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/liked-posts" element={<ProtectedRoute><LikedPostsPage /></ProtectedRoute>} />
        <Route path="/my-posts" element={<ProtectedRoute><PostListByCurrentUser /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
