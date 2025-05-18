import {  Route, Routes } from 'react-router-dom';

import ArticlesPage from '../pages/ArticlesPage ';
import CreateArticlePage from '../pages/CreateArticlePage';
import Dashboard from '../pages/Dashboard';
import EditArticlePage from '../pages/EditArticlePage';

import SettingsPage from '../pages/SettingsPage';

export default function AppRoutes() {



  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/articles/*" element={<ArticlesPage />} />
      <Route path="/create-article" element={<CreateArticlePage />} />
      <Route path="/edit-article/:articleId" element={<EditArticlePage />} />
      <Route path="/settings" element={<SettingsPage />} />
  
    </Routes>
  );
}
