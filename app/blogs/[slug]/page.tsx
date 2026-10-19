import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  renderedHtml: string;
  excerpt: string;
  publishedAt: string;
  topics: Array<{ name: string; slug: string }>;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
}

async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${slug}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.blog || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          {/* Topics/Tags */}
          {blog.topics && blog.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/blogs?topic=${topic.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {topic.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
            <Calendar className="h-5 w-5 mr-2" />
            <time dateTime={blog.publishedAt}>
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="mb-8">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-sm"
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: blog.renderedHtml }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Published on {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {/* Share buttons could go here */}
            <div className="flex gap-2">
              {/* Add social share buttons if needed */}
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}