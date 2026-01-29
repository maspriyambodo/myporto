import React from 'react';
import { Card } from '../UI';
import {
  FileText,
  Briefcase,
  Code,
  Settings,
  MessageSquare,
  Users,
  TrendingUp,
  Eye,
  Calendar,
  Clock
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data - in real app, this would come from API
  const stats = {
    totalPosts: 24,
    totalProjects: 8,
    totalSkills: 16,
    totalServices: 4,
    totalMessages: 47,
    unreadMessages: 12,
    totalViews: 15420,
    monthlyGrowth: 12.5
  };

  const recentActivity = [
    {
      id: 1,
      type: 'post',
      title: 'New blog post published',
      description: 'Building Scalable Microservices with Golang',
      time: '2 hours ago',
      icon: FileText
    },
    {
      id: 2,
      type: 'message',
      title: 'New contact message',
      description: 'From john.doe@example.com',
      time: '4 hours ago',
      icon: MessageSquare
    },
    {
      id: 3,
      type: 'project',
      title: 'Project updated',
      description: 'Secure Infrastructure Automation',
      time: '1 day ago',
      icon: Briefcase
    },
    {
      id: 4,
      type: 'skill',
      title: 'Skills updated',
      description: 'Added Docker certification',
      time: '2 days ago',
      icon: Code
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color, change }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    change?: string;
  }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {change && (
            <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Blog Posts"
          value={stats.totalPosts}
          icon={FileText}
          color="bg-blue-500"
        />
        <StatCard
          title="Projects"
          value={stats.totalProjects}
          icon={Briefcase}
          color="bg-green-500"
        />
        <StatCard
          title="Skills"
          value={stats.totalSkills}
          icon={Code}
          color="bg-purple-500"
        />
        <StatCard
          title="Services"
          value={stats.totalServices}
          icon={Settings}
          color="bg-orange-500"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Messages"
          value={stats.totalMessages}
          icon={MessageSquare}
          color="bg-red-500"
        />
        <StatCard
          title="Page Views"
          value={stats.totalViews.toLocaleString()}
          icon={Eye}
          color="bg-indigo-500"
          change="+12.5% this month"
        />
        <StatCard
          title="Unread Messages"
          value={stats.unreadMessages}
          icon={MessageSquare}
          color="bg-yellow-500"
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">New Post</span>
            </button>

            <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group">
              <Briefcase className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Add Project</span>
            </button>

            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group">
              <Code className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Update Skills</span>
            </button>

            <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors group">
              <MessageSquare className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">View Messages</span>
            </button>
          </div>
        </Card>
      </div>

      {/* System Status */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          System Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">API Status</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">All systems operational</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Database</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Connected and healthy</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Backup</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Last backup: 2 hours ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;