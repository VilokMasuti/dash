'use client';

import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ArticleDeleteDialog from '../components/articles/ArticleDeleteDialog';
import ArticlesTable from '../components/articles/ArticlesTable';
import ArticlesTabs from '../components/articles/ArticlesTabs';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { useAppContext } from '../hooks/useAppContext';

export default function ArticlesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { refreshArticles } = useAppContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  // Redirect to generated articles tab if no specific tab is selected
  useEffect(() => {
    if (path === '/articles') {
      navigate('/articles/generated', { replace: true });
    }
  }, [path, navigate]);

  // Handle article deletion
  const handleDeleteArticle = (articleId) => {
    setArticleToDelete(articleId);
    setDeleteDialogOpen(true);
  };

  // Handle dialog close and refresh articles if needed
  const handleDialogOpenChange = (open) => {
    setDeleteDialogOpen(open);
    if (!open) {
      // Refresh articles list when dialog is closed
      refreshArticles();
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Articles</h1>
          <Button
            onClick={() => navigate('/create-article')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Article
          </Button>
        </div>

        <ArticlesTabs />

        <Routes>
          <Route
            path="/"
            element={<ArticlesTable onDeleteArticle={handleDeleteArticle} />}
          />
          <Route
            path="/generated"
            element={
              <ArticlesTable
                category="generated"
                onDeleteArticle={handleDeleteArticle}
              />
            }
          />
          <Route
            path="/published"
            element={
              <ArticlesTable
                category="published"
                onDeleteArticle={handleDeleteArticle}
              />
            }
          />
          <Route
            path="/scheduled"
            element={
              <ArticlesTable
                category="scheduled"
                onDeleteArticle={handleDeleteArticle}
              />
            }
          />
          <Route
            path="/archived"
            element={
              <ArticlesTable
                category="archived"
                onDeleteArticle={handleDeleteArticle}
              />
            }
          />
        </Routes>

        <ArticleDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={handleDialogOpenChange}
          articleId={articleToDelete}
        />
      </div>
    </DashboardLayout>
  );
}
