import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import UserHomePage from './UserHomePage.jsx';
import SaaSLandingPage from './SaaSLandingPage.jsx';
import Loader from '../components/common/Loader.jsx';

const Home = () => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B1120]">
                <Loader size="lg" message="Initializing Workspace..." className="text-primary-500" />
            </div>
        );
    }

    if (isLoggedIn) {
        return <UserHomePage />;
    }

    return <SaaSLandingPage />;
};

export default Home;
