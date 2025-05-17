'use client';

/**
 * Main App component that handles routing and initial loading state
 * Uses React Router for navigation between different sections
 */
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Loading from './components/Loading';

import ArticlesPage from './pages/ArticlesPage ';
import CreateArticlePage from './pages/CreateArticlePage';
import Dashboard from './pages/Dashboard';
import EditArticlePage from './pages/EditArticlePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  // State to manage initial loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/articles/generated" replace />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/articles/*" element={<ArticlesPage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
        <Route path="/edit-article/:articleId" element={<EditArticlePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
