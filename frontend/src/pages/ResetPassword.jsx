
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import { supabase } from '../config/supabase';
import { Lock, Check, AlertCircle } from 'lucide-react';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ type: null, text: '' });
    const [loading, setLoading] = useState(false);
    const [sessionChecking, setSessionChecking] = useState(true);
    const [hasValidSession, setHasValidSession] = useState(false);

    useEffect(() => {
        feather.replace();
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setHasValidSession(true);
            } else {
                setMessage({ type: 'error', text: 'Invalid or expired link. Please request a new password reset.' });
            }
            setSessionChecking(false);
        });
    }, []);

    const showMessage = (type, text) => {
        setMessage({ type, text });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: null, text: '' });

        if (password !== confirmPassword) {
            showMessage('error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            showMessage('error', 'Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({ password: password });

            if (error) throw error;

            showMessage('success', 'Password updated successfully! Redirecting...');
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            console.error('Update password error:', error.message);
            showMessage('error', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (sessionChecking) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-gray-600">Checking your reset link...</p>
                </div>
            </div>
        );
    }

    if (!hasValidSession && message.text) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                        <div className="rounded-md bg-red-50 p-4 mb-4">
                            <p className="text-sm font-medium text-red-800">{message.text}</p>
                        </div>
                        <a href="/forgot-password" className="text-blue-600 hover:text-blue-500 font-medium">
                            Request a new reset link
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        CS
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Set New Password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Create a new secure password for your account.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {message.text && (
                        <div className={`rounded-md p-4 mb-4 ${message.type === 'success' ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    {message.type === 'success' ? (
                                        <div className="h-5 w-5 text-green-400">✓</div>
                                    ) : (
                                        <div className="h-5 w-5 text-red-400">!</div>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-800' : 'text-red-800'
                                        }`}>
                                        {message.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                    placeholder="New Password"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || !password || !confirmPassword}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

