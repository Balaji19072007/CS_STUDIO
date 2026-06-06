import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { buildApiUrl } from '../config/api';

const Pricing = () => {
    const { user } = useAuth();
    const [currentPlan, setCurrentPlan] = useState('FREE');

    useEffect(() => {
        if (user) {
            fetchCurrentPlan();
        }
    }, [user]);

    const fetchCurrentPlan = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(buildApiUrl('/api/subscriptions/my-plan'), {
                'x-auth-token': token
            });
            if (response.ok) {
                const data = await response.json();
                setCurrentPlan(data.plan || 'FREE');
            }
        } catch (err) {
            console.error('Error fetching plan:', err);
        }
    };

    const plans = [
        {
            name: 'FREE',
            price: '$0',
            description: 'Perfect for getting started',
            features: [
                'Access to course notes',
                'Limited practice problems',
                'Community support',
                'Basic progress tracking'
            ],
            limitations: [
                'No certificates',
                'No premium quizzes',
                'Limited course access'
            ],
            cta: 'Current Plan',
            highlighted: false
        },
        {
            name: 'PRO',
            price: '$19',
            period: '/month',
            description: 'For serious learners',
            features: [
                'Full course access',
                'Unlimited problems',
                'Course completion certificates',
                'PDF certificate downloads',
                'Premium quizzes',
                'Priority support',
                'Ad-free experience',
                'Advanced analytics'
            ],
            cta: 'Upgrade to PRO',
            highlighted: true
        },
        {
            name: 'ENTERPRISE',
            price: '$99',
            period: '/month',
            description: 'For teams and organizations',
            features: [
                'Everything in PRO',
                'Bulk certificate generation',
                'Paid verification access',
                'Employer dashboard',
                'API access',
                'Team management',
                'Custom branding',
                'Dedicated support'
            ],
            cta: 'Contact Sales',
            highlighted: false
        }
    ];

    const handleSubscribe = async (planName) => {
        if (planName === 'FREE') return;

        alert(`Payment integration would go here for ${planName} plan`);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-gray-400">
                        Unlock your full learning potential with CS Studio
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-lg border-2 p-8 ${plan.highlighted
                                ? 'bg-gradient-to-br from-primary-900/30 to-primary-800/20 border-primary-500 transform scale-105'
                                : 'bg-gray-800 border-gray-700'
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="bg-primary-500 text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">
                                    RECOMMENDED
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <p className="text-gray-400 mb-6">{plan.description}</p>

                            <div className="mb-6">
                                <span className="text-5xl font-bold text-white">{plan.price}</span>
                                {plan.period && <span className="text-gray-400 text-lg">{plan.period}</span>}
                            </div>

                            <button
                                onClick={() => handleSubscribe(plan.name)}
                                disabled={currentPlan === plan.name}
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition mb-8 ${plan.highlighted
                                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                                    : currentPlan === plan.name
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                                    }`}
                            >
                                {currentPlan === plan.name ? 'Current Plan' : plan.cta}
                            </button>

                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-white mb-3">Features:</p>
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                                {plan.limitations && plan.limitations.map((limitation, idx) => (
                                    <div key={`lim-${idx}`} className="flex items-start">
                                        <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="text-gray-400 text-sm">{limitation}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-400">
                        Need help choosing? <a href="/#/contact" className="text-primary-400 hover:text-primary-300">Contact our team</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
