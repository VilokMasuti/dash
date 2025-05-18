'use client';

import { ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleFormSkeleton from '../components/articles/ArticleFormSkeleton';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useAppContext } from '../hooks/useAppContext';

export default function EditArticlePage() {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const { articles, updateArticle, isLoading } = useAppContext();

  const [formData, setFormData] = useState({
    title: '',
    keyword: '',
    content: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Find the article to edit
  useEffect(() => {
    if (articles.length > 0) {
      const article = articles.find((a) => a.id === Number.parseInt(articleId));
      if (article) {
        // Extract keyword without traffic data
        const keywordOnly = article.keyword.split('[')[0].trim();

        setFormData({
          title: article.title,
          keyword: keywordOnly,
          content:
            article.content ||
            'Sample content for this article. Edit as needed.',
        });
      } else {
        // Article not found
        toast.error('Article not found');
        navigate('/articles/generated');
      }
    }
  }, [articles, articleId, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.keyword.trim()) errors.keyword = 'Keyword is required';
    if (!formData.content.trim()) errors.content = 'Content is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate word count
      const wordCount = formData.content.split(/\s+/).filter(Boolean).length;

      // Update article
      const updatedArticle = {
        title: formData.title,
        keyword: `${formData.keyword} [${Math.floor(Math.random() * 10000)}]`,
        words: wordCount || Math.floor(Math.random() * 3000) + 1000,
        content: formData.content,
      };

      await updateArticle(Number.parseInt(articleId), updatedArticle);
      navigate('/articles/generated');
    } catch (error) {
      console.error('Failed to update article:', error);
      toast.error(error.message || 'Failed to update article');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <ArticleFormSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Edit Article</h1>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Article Details</CardTitle>
            <CardDescription>
              Update the details for this article
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="edit-article-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter article title"
                  value={formData.title}
                  onChange={handleChange}
                  className={formErrors.title ? 'border-red-500' : ''}
                />
                {formErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.title}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyword">Target Keyword</Label>
                <Input
                  id="keyword"
                  name="keyword"
                  placeholder="Enter target keyword"
                  value={formData.keyword}
                  onChange={handleChange}
                  className={formErrors.keyword ? 'border-red-500' : ''}
                />
                {formErrors.keyword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.keyword}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Article Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your article content here..."
                  value={formData.content}
                  onChange={handleChange}
                  className={`min-h-[200px] ${
                    formErrors.content ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.content}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-article-form"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
