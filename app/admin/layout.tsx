'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Home, MessageSquare, Sun, Moon, LogOut, FileText, Layers, Tag } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Enquiry', href: '/admin/enquiry', icon: MessageSquare },
    { name: 'Manage Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Manage Templates', href: '/admin/templates', icon: Layers },
    { name: 'Manage Topics', href: '/admin/topics', icon: Tag },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex" suppressHydrationWarning>
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-gray-900 text-white dark:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            {theme === 'light' ? <Moon className="mr-2 h-5 w-5" /> : <Sun className="mr-2 h-5 w-5" />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 ease-in-out ml-64">
        {/* Top Bar */}
        <div className="relative z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm"
              >
                ← Back to Portfolio
              </Link>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        onClick={() => {}}
      />
    </div>
  );
};

export default AdminLayout;