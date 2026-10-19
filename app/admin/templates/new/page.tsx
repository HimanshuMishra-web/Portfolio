'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import GrapesJS to avoid SSR issues
const GrapesJSEditor = dynamic(() => import('../../../components/GrapesJSEditor'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-4 border-gray-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
});

const CreateTemplate = () => {
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      if (!data.success) {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  };

  const handleSave = async (html: string, css: string) => {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: templateName,
          description: templateDescription,
          structure: JSON.stringify({ html, css }),
        }),
      });

      if (response.ok) {
        router.push('/admin/templates');
      } else {
        alert('Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Template</h1>
          <p className="text-gray-600 dark:text-gray-400">Design your blog template using the visual editor</p>
        </div>
        <button
          onClick={() => router.push('/admin/templates')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
        >
          Back to Templates
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Template Name *
            </label>
            <input
              type="text"
              id="name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter template name"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter template description"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Template Editor</h3>
          <GrapesJSEditor onSave={handleSave} saving={saving} />
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;