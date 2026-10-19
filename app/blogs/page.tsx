import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, Tag } from 'lucide-react';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Topic from '@/models/Topic';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | Himanshu Portfolio',
  description: 'Read our latest blog posts on technology, development, and industry trends.',
};

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  topics: Array<{ name: string; slug: string }>;
  featuredImage?: string;
}

async function getPublishedBlogs(topic?: string): Promise<BlogPost[]> {
  try {
    if (!process.env.MONGODB_URI) {
      return [];
    }
    await dbConnect();

    const query: any = { status: 'published' };

    if (topic) {
      const topicDoc = await Topic.findOne({ slug: topic });
      if (topicDoc) {
        query.topics = topicDoc._id;
      } else if (mongoose.isValidObjectId(topic)) {
        query.topics = topic;
      }
    }

    const blogs = await Blog.find(query)
      .populate('topics', 'name slug')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(20)
      .lean();

    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams?: { topic?: string };
}) {
  const blogs = await getPublishedBlogs(searchParams?.topic);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on technology, development, and industry trends.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for our latest insights and tutorials.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Load More Button (if needed) */}
        {blogs.length >= 20 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="aspect-video bg-gray-200 dark:bg-gray-700">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Topics/Tags */}
        {blog.topics && blog.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.topics.slice(0, 3).map((topic) => (
              <span
                key={topic.slug}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {topic.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          <Link
            href={`/blogs/${blog.slug}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {blog.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-1" />
          <time dateTime={blog.publishedAt}>
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </div>
    </article>
  );
}