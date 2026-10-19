'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  topic: string;
  template: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchBlogs();
  }, []);

  const checkAuthAndFetchBlogs = async () => {
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

      await fetchBlogs();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id));
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Blogs</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage your blog posts</p>
        </div>
        <button
          onClick={() => router.push('/admin/blogs/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Blog</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          {blogs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No blogs yet</p>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-md">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{blog.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{blog.excerpt}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {blog.status}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => router.push(`/blogs/${blog.slug}`)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="View"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/blogs/${blog._id}/edit`)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
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

export default ManageBlogs;