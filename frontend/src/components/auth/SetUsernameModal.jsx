import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import api from '../../config/api';
import { useAuth } from '../../hooks/useAuth';

const SetUsernameModal = () => {
    const { user, refreshSession } = useAuth();
    const [username, setUsername] = useState('');
    const [isAvailable, setIsAvailable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [debouncedUsername, setDebouncedUsername] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedUsername(username), 500);
        return () => clearTimeout(handler);
    }, [username]);

    useEffect(() => {
        const checkUsername = async () => {
            if (!debouncedUsername || debouncedUsername.length < 3) {
                setIsAvailable(null);
                return;
            }
            try {
                setChecking(true);
                const res = await api.get(`/api/auth/session/check-username?username=${debouncedUsername}`);
                setIsAvailable(res.data.available);
            } catch (err) {
                console.error('Check username error', err);
            } finally {
                setChecking(false);
            }
        };
        checkUsername();
    }, [debouncedUsername]);

    const handleSave = async () => {
        if (!username || username.length < 3) {
            toast.error('Username must be at least 3 characters');
            return;
        }
        if (!isAvailable) {
            toast.error('Username is not available');
            return;
        }

        try {
            setLoading(true);
            const res = await api.put('/api/auth/profile', { username });
            toast.success('Username set successfully!');
            if (refreshSession) {
                await refreshSession();
            } else {
                window.location.reload();
            }
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Failed to save username');
        } finally {
            setLoading(false);
        }
    };

    if (!user || !user.needsUsername) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden p-6 relative">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                    Please choose a unique username for your account to continue.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                            placeholder="e.g. awesome_coder"
                            className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-lg p-3 text-gray-900 dark:text-white focus:outline-none transition-colors ${
                                username.length > 0 && username.length < 3 ? 'border-red-500 focus:border-red-500' :
                                isAvailable === true ? 'border-green-500 focus:border-green-500' : 
                                isAvailable === false ? 'border-red-500 focus:border-red-500' : 
                                'border-gray-300 dark:border-gray-700 focus:border-blue-500'
                            }`}
                        />
                        <div className="mt-2 text-xs font-medium h-4">
                            {checking && <span className="text-gray-500">Checking availability...</span>}
                            {!checking && username.length > 0 && username.length < 3 && <span className="text-red-500">Username must be at least 3 characters</span>}
                            {!checking && isAvailable === true && <span className="text-green-500">Username is available!</span>}
                            {!checking && isAvailable === false && <span className="text-red-500">Username is already taken</span>}
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={loading || checking || !isAvailable || username.length < 3}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Save and Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetUsernameModal;
