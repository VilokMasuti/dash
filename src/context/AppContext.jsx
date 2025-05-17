/* eslint-disable no-unused-vars */

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext();

export function AppProvider({ children }) {
  // State for articles data
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAccount, setActiveAccount] = useState('amazon.com'); // Default account set
  const [error, setError] = useState(null);

  // Load articles from local storage or use default data
  const loadArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Load articles from local storage
      const storedArticles = localStorage.getItem('articles');
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      } else {
        // Use default data
        const module = await import('../data/articles-data.js');
        const articlesWithTimestamps = module.articlesData.map((article) => ({
          ...article,
          createdOn: new Date().toISOString(),
        }));
        setArticles(articlesWithTimestamps);
        localStorage.setItem(
          'articles',
          JSON.stringify(articlesWithTimestamps)
        );
      }
    } catch (error) {
      setError(error);
      toast.error('Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const addArticle = (article) => {
    try {
      if (!article.title || !article.content) {
        throw new Error("Title and content are required");
      }
      const newArticle = {
        id: Date.now(), // More reliable ID
        ...article,
        createdOn: new Date().toISOString(),
      };
      const updatedArticles = [...articles, newArticle];
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      toast.success("Article created successfully!");
      return newArticle;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const deleteArticle = (id) => {
    try {
      const updatedArticles = articles.filter(article => article.id !== id);
      setArticles(updatedArticles);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      toast.success("Article deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete article");
    }
  };

  const updateArticle = (id, updatedData) => {
    try {
      if (!updatedData.title || !updatedData.content) {
        throw new Error("Title and content are required");
      }
      const updatedArticles = articles.map(article =>
        article.id === id ? {
          ...article,
          ...updatedData,
          updatedOn: new Date().toISOString()
        } : article
      );
      setArticles(updatedArticles);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      toast.success("Article updated successfully!");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const switchAccount = (account) => {
    setActiveAccount(account);
    toast.success(`Switched to ${account}`);
    // You might want to persist the active account in localStorage
    localStorage.setItem('activeAccount', account);
  };

  // Load active account from localStorage on initial render
  useEffect(() => {
    const savedAccount = localStorage.getItem('activeAccount');
    if (savedAccount) {
      setActiveAccount(savedAccount);
    }
  }, []);

  const value = {
    articles,
    isLoading,
    error,
    activeAccount,
    addArticle,
    deleteArticle,
    updateArticle,
    switchAccount
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}



export default AppContext;
