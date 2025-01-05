import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LoadingSpinner from './components/LoadingSpinner';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/signin" />;
  
  return <>{children}</>;
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        {user && <Sidebar />}
        <main className={user ? "flex-1 ml-64" : "flex-1"}>
          <Routes>
            <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;