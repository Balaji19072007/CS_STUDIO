import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Users, Activity, CheckCircle, Clock, ShieldAlert, BookOpen, Download, List } from 'lucide-react';
import api from '../services/apiService';
import FullPageLoader from '../components/common/FullPageLoader';
import EmptyState from '../components/common/EmptyState';

const AdminDashboard = () => {
  const { user, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const [updates, setUpdates] = useState({ recentUsers: [], recentProgress: [], stats: {} });
  const [auditLogs, setAuditLogs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && (!isLoggedIn || user?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, isLoggedIn, loading, navigate]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const [updatesRes, logsRes] = await Promise.all([
          api.get('/api/admin/updates'),
          api.get('/api/admin/audit-logs')
        ]);
        
        if (typeof updatesRes.data === 'string' && updatesRes.data.toLowerCase().includes('<!doctype html>')) {
           throw new Error("API request returned an HTML page. Please ensure VITE_API_BASE_URL is correctly set in your frontend hosting environment variables and you've triggered a new build.");
        }

        if (updatesRes.data && updatesRes.data.success) {
          setUpdates(updatesRes.data.data);
        } else {
          setError(`Failed to fetch updates. Server responded with: ${JSON.stringify(updatesRes.data)}`);
        }

        if (logsRes.data && typeof logsRes.data !== 'string' && logsRes.data.success) {
          setAuditLogs(logsRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load admin data:', err);
        const errorMsg = err.response?.data?.msg || err.response?.data?.error || err.message || 'Unknown error';
        setError(`Access Error: ${errorMsg}`);
      } finally {
        setFetching(false);
      }
    };

    if (user?.role === 'admin') {
      fetchUpdates();
    }
  }, [user]);

  const handleExportCSV = async () => {
    try {
      const response = await api.get('/api/admin/export-users', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export CSV');
    }
  };

  if (loading || fetching) {
    return <FullPageLoader message="Loading Admin Dashboard..." />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Access Error</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.firstName || 'Admin'}. Here are the latest updates.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <button
             onClick={handleExportCSV}
             className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center gap-2 shadow-sm transition-colors"
           >
             <Download size={18} />
             Export Users
           </button>
           <div className="hidden sm:flex px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full font-medium items-center gap-2 shadow-sm border border-blue-200 dark:border-blue-800/50">
             <ShieldAlert size={18} />
             System Administrator
           </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex items-center gap-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-xl text-blue-600 dark:text-blue-400">
            <Users size={32} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {updates?.stats?.totalUsers || 0}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex items-center gap-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="bg-purple-100 dark:bg-purple-900/40 p-4 rounded-xl text-purple-600 dark:text-purple-400">
            <BookOpen size={32} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Problems Solved</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {updates?.stats?.totalProblems || 0}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-3">
            <Activity className="text-blue-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Signups</h2>
          </div>
          <div className="p-5 flex-grow overflow-y-auto max-h-[400px]">
            {(!updates?.recentUsers || updates.recentUsers.length === 0) ? (
              <EmptyState iconType="default" title="No recent signups" description="No new signups in the latest period." />
            ) : (
              <div className="space-y-4">
                {updates?.recentUsers?.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-inner">
                        {user.username ? user.username[0].toUpperCase() : user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{user.username || 'No Username'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                       {user.role === 'admin' ? (
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md mb-1 font-medium">Admin</span>
                       ) : null}
                       <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                         <Clock size={12} />
                         {new Date(user.created_at).toLocaleDateString()}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h2>
          </div>
          <div className="p-5 flex-grow overflow-y-auto max-h-[400px]">
            {(!updates?.recentProgress || updates.recentProgress.length === 0) ? (
              <EmptyState iconType="default" title="No recent activity" description="No recent progress updates found." />
            ) : (
              <div className="space-y-4">
                {updates?.recentProgress?.map(progress => (
                  <div key={progress.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-lg text-green-600 dark:text-green-400">
                      <CheckCircle size={20} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        User <span className="font-mono text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">{progress.user_id.substring(0,6)}</span> updated progress.
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(progress.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <List className="text-indigo-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Audit Logs</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admin</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody>
              {!auditLogs || auditLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8"><EmptyState iconType="default" title="No audit logs" description="No audit log entries recorded." compact /></td>
                </tr>
              ) : (
                auditLogs?.map(log => (
                  <tr key={log.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 font-medium">
                      {log.admin?.email || 'Unknown'}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-md font-mono text-xs">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 font-mono text-xs">
                      {JSON.stringify(log.details)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
