'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Users, TrendingUp, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  projectType: string;
  budget: string;
  timeline: string;
  status: 'pending' | 'contacted' | 'in-progress' | 'completed' | 'declined';
  adminNotes?: string;
  adminReply?: string;
  createdAt: string;
  updatedAt: string;
  repliedAt?: string;
}

const Dashboard = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchEnquiries();
  }, []);

  const checkAuthAndFetchEnquiries = async () => {
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

      await fetchEnquiries();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/enquiries');
      const data = await response.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStats = () => {
    const stats = {
      total: enquiries.length,
      pending: enquiries.filter(e => e.status === 'pending').length,
      contacted: enquiries.filter(e => e.status === 'contacted').length,
      inProgress: enquiries.filter(e => e.status === 'in-progress').length,
      completed: enquiries.filter(e => e.status === 'completed').length,
      declined: enquiries.filter(e => e.status === 'declined').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  const RecentEnquiries = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Enquiries</h3>
      </div>
      <div className="p-6">
        {enquiries.slice(0, 5).length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No enquiries yet</p>
        ) : (
          <div className="space-y-4">
            {enquiries.slice(0, 5).map((enquiry) => (
              <div key={enquiry._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {enquiry.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{enquiry.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{enquiry.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    enquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    enquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    enquiry.status === 'in-progress' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    enquiry.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {enquiry.status.replace('-', ' ')}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Enquiries"
          value={stats.total}
          icon={MessageSquare}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={AlertCircle}
          color="bg-orange-500"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          color="bg-green-500"
        />
      </div>

      {/* Recent Enquiries */}
      <RecentEnquiries />
    </div>
  );
};

export default Dashboard;