
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import { supabase } from '../config/supabase';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ type: null, text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        feather.replace();
    }, []);

    const showMessage = (type, text) => {
        setMessage({ type, text });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: null, text: '' });

        if (!email) {
            showMessage('error', 'Please enter your email address.');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/#/reset-password`,
            });

            if (error) throw error;

            showMessage('success', 'If your email is registered, a password reset link has been sent.');
        } catch (error) {
            console.error('Password reset error:', error.message);
            if (error.message.includes('rate limit')) {
                showMessage('error', 'Too many requests. Please try again later.');
            } else {
                showMessage('success', 'If your email is registered, a password reset link has been sent.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        CS
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
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
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                                {!loading && <Send className="ml-2 h-4 w-4" />}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

