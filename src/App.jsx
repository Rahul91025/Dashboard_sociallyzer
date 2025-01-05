import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LoadingSpinner from './components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/signin" />;
  
  return <Layout>{children}</Layout>;
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/comments" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/schedule" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/team" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/help" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}