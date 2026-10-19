'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface BlogTemplate {
  _id: string;
  name: string;
  description: string;
  structure: string;
  createdAt: string;
  updatedAt: string;
}

const ManageTemplates = () => {
  const [templates, setTemplates] = useState<BlogTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchTemplates();
  }, []);

  const checkAuthAndFetchTemplates = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (!response.ok) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      if (!data.success) {
        router.push('/login');
        return;
      }

      await fetchTemplates();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/templates');
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTemplates(templates.filter(template => template._id !== id));
      }
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Blog Templates</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage blog post templates</p>
        </div>
        <button
          onClick={() => router.push('/admin/templates/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Template</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          {templates.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No templates yet</p>
          ) : (
            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template._id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-md">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{template.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Created: {new Date(template.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => router.push(`/admin/templates/${template._id}/edit`)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(template._id)}
                      className="p-2 text-red-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTemplates;