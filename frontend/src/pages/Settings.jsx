// frontend/src/pages/Settings.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import {
    User,
    Mail,
    FileText,
    Save,
    Camera,
    ArrowLeft,
    Settings as SettingsIcon,
    Loader,
    CheckCircle,
    AlertTriangle,
    X,
    Move,
    Check
} from 'lucide-react';
import { updateProfile } from '../api/authApi.js';
import { useSimpleImageCropper } from '../hooks/useSimpleImageCropper.js';
import { ProfileSkeleton } from '../components/common/SkeletonLoader';
import SuccessState from '../components/common/SuccessState';

const Settings = () => {
    const { user, updateUser: updateUserProfile, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    // Simple image cropper hook
    const {
        isCropModalOpen,
        originalImage,
        imageDimensions,
        scale,
        fileInputRef,
        handlePhotoChange,
        handleFileInputChange,
        applyCropManually,
        cancelCrop,
        crop,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        isResizing,
        handleResizeMouseDown,
        handleResizeMouseMove,
        handleResizeMouseUp,
        // Touch versions
        handleTouchMove,
        handleTouchEnd,
        handleTouchResizeMove,
        handleTouchResizeEnd,
        canvasRef,
        imageRef
    } = useSimpleImageCropper();

    // Local form state
    const [firstName, setFirstName] = useState(user?.firstName || user?.name?.split(' ')[0] || '');
    const [lastName, setLastName] = useState(user?.lastName || user?.name?.split(' ').slice(1).join(' ') || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    // Mobile navigation state
    const [containerScale, setContainerScale] = useState(1);
    const cropperContainerRef = useRef(null);

    // Update container scale on resize
    useEffect(() => {
        const updateScale = () => {
            if (cropperContainerRef.current) {
                const width = cropperContainerRef.current.clientWidth;
                setContainerScale(Math.min(1, width / 400));
            }
        };

        if (isCropModalOpen) {
            // Wait for modal to render
            setTimeout(updateScale, 50);
            window.addEventListener('resize', updateScale);
            return () => window.removeEventListener('resize', updateScale);
        }
    }, [isCropModalOpen]);

    // Profile picture states
    const [profilePicture, setProfilePicture] = useState(user?.photoUrl || '');
    const [isUploading, setIsUploading] = useState(false);



    // Update local state when user changes
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || user.name?.split(' ')[0] || '');
            setLastName(user.lastName || user.name?.split(' ').slice(1).join(' ') || '');
            setBio(user.bio || '');
            setProfilePicture(user.photoUrl || '');
        }
    }, [user]);

    // Add event listeners for drag and resize
    useEffect(() => {
        if (isCropModalOpen) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isCropModalOpen, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleResizeMouseMove);
            document.addEventListener('mouseup', handleResizeMouseUp);
            document.addEventListener('touchmove', handleTouchResizeMove, { passive: false });
            document.addEventListener('touchend', handleTouchResizeEnd);
            return () => {
                document.removeEventListener('mousemove', handleResizeMouseMove);
                document.removeEventListener('mouseup', handleResizeMouseUp);
                document.removeEventListener('touchmove', handleTouchResizeMove);
                document.removeEventListener('touchend', handleTouchResizeEnd);
            };
        }
    }, [isResizing, handleResizeMouseMove, handleResizeMouseUp, handleTouchResizeMove, handleTouchResizeEnd]);

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn && !loading) {
            navigate('/signin');
        }
    }, [isLoggedIn, loading, navigate]);


    // --- Utility Functions ---
    const showAlert = (message, type = 'success') => {
        setAlertMessage({ message, type });
        setTimeout(() => setAlertMessage(null), 5000);
    };

    const applyCrop = async () => {
        setIsUploading(true);

        try {
            const imageBlob = await applyCropManually();

            if (!imageBlob) {
                throw new Error('Failed to process image');
            }

            // Convert blob to File object for proper multer handling
            const imageFile = new File([imageBlob], 'profile.jpg', { type: 'image/jpeg' });

            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('bio', bio);
            formData.append('profilePicture', imageFile);

            const apiResponse = await updateProfile(formData);

            // Update user in global state with the new method
            if (apiResponse.user) {
                await updateUserProfile(apiResponse.user);
                setProfilePicture(apiResponse.user.photoUrl);
                showAlert('Profile picture updated successfully!');
            } else {
                // If backend doesn't return user, update locally with temporary URL
                const tempUrl = URL.createObjectURL(imageBlob);
                await updateUserProfile({
                    photoUrl: tempUrl,
                    firstName,
                    lastName,
                    bio,
                    updatedAt: Date.now()
                });
                setProfilePicture(tempUrl);
                showAlert('Profile picture updated!');
            }

            cancelCrop();

        } catch (error) {
            console.error('Crop application error:', error);
            const errorMessage = error.response?.data?.msg || error.message || 'Failed to update profile picture. Please try again.';
            showAlert(errorMessage, 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (!user) return logout();

        setLoading(true);
        setAlertMessage(null);

        if (!firstName || !lastName) {
            showAlert('Full Name cannot be empty.', 'error');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                firstName: firstName,
                lastName: lastName,
                bio: bio,
            };

            const apiResponse = await updateProfile(payload);

            // Update user with response using the new method
            if (apiResponse.user) {
                await updateUserProfile(apiResponse.user);
                setProfilePicture(apiResponse.user.photoUrl);
            } else {
                await updateUserProfile({
                    firstName,
                    lastName,
                    name: `${firstName} ${lastName}`.trim(),
                    bio: bio,
                });
            }

            showAlert('Profile information updated successfully!');
        } catch (error) {
            showAlert(error.message || 'Failed to update profile.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getInitials = useCallback(() => {
        const fullName = user?.name || `${firstName} ${lastName}`.trim() || 'User';
        const parts = fullName.split(' ');
        if (parts.length > 1) {
            return parts.map(n => n[0]).join('').toUpperCase().substring(0, 2);
        }
        return fullName.charAt(0).toUpperCase();
    }, [user, firstName, lastName]);


    const renderProfilePictureSection = () => {
        const initials = getInitials();

        return (
            <div className="flex flex-col items-center space-y-6">
                {/* Profile Picture Preview */}
                <div className="relative group">
                    <div className="relative">
                        {/* Profile Picture Image */}
                        <img
                            src={profilePicture ? `${profilePicture}?${user?.updatedAt || Date.now()}` : ''}
                            alt="Profile"
                            className={`w-40 h-40 rounded-full object-cover border-4 border-primary-500/30 shadow-2xl transition-all duration-300 group-hover:border-primary-500/50 ${profilePicture ? 'block' : 'hidden'
                                }`}
                            onError={(e) => {
                                // Hide image and show fallback initials
                                e.target.style.display = 'none';
                                const fallback = e.target.parentElement?.querySelector('.profile-fallback');
                                if (fallback) {
                                    fallback.classList.remove('hidden');
                                    fallback.classList.add('flex');
                                }
                            }}
                            onLoad={(e) => {
                                // Show image and hide fallback
                                e.target.style.display = 'block';
                                const fallback = e.target.parentElement?.querySelector('.profile-fallback');
                                if (fallback) {
                                    fallback.classList.remove('flex');
                                    fallback.classList.add('hidden');
                                }
                            }}
                            key={profilePicture} // Force re-render when URL changes
                        />

                        {/* Fallback initials */}
                        <div className={`profile-fallback w-40 h-40 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center border-4 border-primary-500/30 shadow-2xl transition-all duration-300 group-hover:border-primary-500/50 ${profilePicture ? 'hidden' : 'flex'
                            }`}>
                            <span className="text-4xl font-bold text-white">
                                {initials}
                            </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Camera Button */}
                    <button
                        type="button"
                        onClick={handlePhotoChange}
                        disabled={isUploading || loading}
                        className="absolute -bottom-2 -right-2 bg-primary-500 hover:bg-primary-600 text-white p-3.5 rounded-full shadow-2xl transition-all duration-200 disabled:opacity-50 group-hover:scale-110 flex items-center justify-center"
                        title="Change profile picture"
                    >
                        <Camera className="w-5 h-5" />
                    </button>
                </div>

                {/* Profile Picture Actions */}
                <div className="flex flex-col space-y-3 w-full max-w-xs px-2">
                    <div className="text-center">
                        <p className="text-gray-900 dark:text-white font-bold text-base">
                            {profilePicture ? 'Profile Photo' : 'Add Photo'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Click the camera icon to upload a new one
                        </p>
                    </div>

                    {/* Upload Progress */}
                    {(isUploading || loading) && (
                        <div className="flex items-center justify-center space-x-2 text-sm text-primary-500">
                            <Loader className="w-4 h-4 animate-spin" />
                            <span className="font-medium">{isUploading ? 'Uploading...' : 'Saving...'}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (!user) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                id="file-input"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={handleFileInputChange}
            />

            {/* Mobile Header - Native-like */}
            <div className="lg:hidden sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 active:scale-95 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                    <SettingsIcon className="w-5 h-5 text-primary-500" />
                </div>
            </div>

            <main className="flex-grow py-6 md:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center justify-between mb-10">
                        <div className="flex items-center">
                            <button onClick={() => navigate(-1)} className="mr-5 p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 transition-all active:scale-95">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                    Account Settings
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your profile and account preferences</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-primary-500/10 border border-primary-500/20 text-primary-500">
                            <SettingsIcon className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                        <div className="p-6 lg:p-8">
                            {/* Alert Message */}
                            {alertMessage && (
                                <div className={`flex items-center gap-3 p-4 rounded-xl border animate-in fade-in slide-in-from-top duration-300 ${alertMessage.type === 'error'
                                    ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-300'
                                    : 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                                    }`}>
                                    {alertMessage.type === 'error' ? (
                                        <AlertTriangle className="w-5 h-5 shrink-0" />
                                    ) : (
                                        <CheckCircle className="w-5 h-5 shrink-0" />
                                    )}
                                    <p className="text-sm font-medium">{alertMessage.message}</p>
                                    <button
                                        onClick={() => setAlertMessage(null)}
                                        className={`ml-auto p-1 rounded-lg transition-colors ${alertMessage.type === 'error'
                                            ? 'hover:bg-red-100 dark:hover:bg-red-500/20'
                                            : 'hover:bg-emerald-100 dark:hover:bg-emerald-500/20'
                                            }`}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            {/* Profile Content */}
                            <div>
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>

                                <div className="flex flex-col lg:flex-row lg:space-x-8">
                                    {/* Left Side: Profile Picture Section */}
                                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl p-6 border border-indigo-200/50 dark:border-gray-600/50">
                                            {renderProfilePictureSection()}
                                        </div>
                                    </div>

                                    {/* Right Side: Form */}
                                    <div className="lg:w-2/3">
                                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                                            {/* Full Name */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">First Name</label>
                                                    <div className="relative group/input">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-primary-500 transition-colors">
                                                            <User className="w-5 h-5" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            id="firstName"
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            placeholder="Coder"
                                                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl text-gray-900 dark:text-white font-medium transition-all outline-none"
                                                            disabled={loading}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Last Name</label>
                                                    <div className="relative group/input">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-primary-500 transition-colors">
                                                            <User className="w-5 h-5" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            id="lastName"
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            placeholder="User"
                                                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl text-gray-900 dark:text-white font-medium transition-all outline-none"
                                                            disabled={loading}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                        <Mail className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={user.email}
                                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-100/50 dark:bg-gray-800/50 border-2 border-transparent rounded-2xl text-gray-500 dark:text-gray-500 font-medium cursor-not-allowed"
                                                        disabled
                                                    />
                                                </div>
                                                <p className="ml-1 text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">Registered Email (Cannot be changed)</p>
                                            </div>

                                            {/* Bio */}
                                            <div className="space-y-2">
                                                <label htmlFor="bio" className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Bio</label>
                                                <div className="relative group/input">
                                                    <div className="absolute left-4 top-6 text-gray-400 group-focus-within/input:text-primary-500 transition-colors">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <textarea
                                                        id="bio"
                                                        value={bio}
                                                        onChange={(e) => setBio(e.target.value)}
                                                        rows="4"
                                                        placeholder="Tell us about yourself..."
                                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl text-gray-900 dark:text-white font-medium transition-all outline-none resize-none"
                                                        disabled={loading}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            {/* Save Button */}
                                            <div className="pt-8 border-t border-gray-100 dark:border-gray-700/50 flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={loading || isUploading}
                                                    className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 px-10 rounded-2xl shadow-xl text-base font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <Loader className="animate-spin w-5 h-5" />
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="w-5 h-5" />
                                                            Save Changes
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                    {/* Support & Feedback Section */}
                    <div className="mt-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Support & Feedback</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => window.dispatchEvent(new Event('open-rating-popup'))}
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                Rate CS Studio
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Premium Cropper Modal */}
            {isCropModalOpen && originalImage && (
                <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-[100] bg-black/95 backdrop-blur-xl">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-xl border border-white/20 dark:border-gray-800 overflow-hidden animate-in fade-in zoom-in duration-300">
                        {/* Header */}
                        <div className="p-6 sm:p-8 flex justify-between items-center">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Adjust Photo</h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Pinch to resize, drag to position
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={cancelCrop}
                                className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 transition-all active:scale-95"
                                disabled={isUploading}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-4 pb-8 sm:px-8 sm:pb-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <div className="flex justify-center mb-8">
                                <div
                                    ref={cropperContainerRef}
                                    className="relative aspect-square w-full max-w-[400px] bg-gray-100 dark:bg-gray-950 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-gray-100 dark:ring-gray-800"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="relative w-[400px] h-[400px] origin-center transition-transform duration-200"
                                            style={{ transform: `scale(${containerScale})` }}
                                        >
                                            <img
                                                ref={imageRef}
                                                src={originalImage}
                                                alt="Crop preview"
                                                className="absolute max-w-none max-h-none select-none"
                                                style={{
                                                    left: `${(400 - imageDimensions.width * scale) / 2}px`,
                                                    top: `${(400 - imageDimensions.height * scale) / 2}px`,
                                                    transform: `scale(${scale})`,
                                                    transformOrigin: 'top left'
                                                }}
                                                draggable={false}
                                            />
                                            {/* Circular mask overlay */}
                                            <div className="absolute inset-0">
                                                <div
                                                    className="absolute border-4 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] rounded-full cursor-move z-10"
                                                    style={{
                                                        left: `${(400 - imageDimensions.width * scale) / 2 + crop.x * scale}px`,
                                                        top: `${(400 - imageDimensions.height * scale) / 2 + crop.y * scale}px`,
                                                        width: `${crop.width * scale}px`,
                                                        height: `${crop.width * scale}px`
                                                    }}
                                                    onMouseDown={handleMouseDown}
                                                    onTouchStart={(e) => {
                                                        const touch = e.touches[0];
                                                        handleMouseDown({
                                                            clientX: touch.clientX,
                                                            clientY: touch.clientY,
                                                            preventDefault: () => { }
                                                        });
                                                    }}
                                                >
                                                    {/* Visual Corner Resize Handle */}
                                                    <div
                                                        className="absolute -right-1 -bottom-1 w-10 h-10 bg-white border-4 border-primary-500 cursor-se-resize rounded-full shadow-2xl flex items-center justify-center text-primary-500 active:scale-125 transition-transform z-20"
                                                        onMouseDown={(e) => {
                                                            e.stopPropagation();
                                                            handleResizeMouseDown(e);
                                                        }}
                                                        onTouchStart={(e) => {
                                                            e.stopPropagation();
                                                            const touch = e.touches[0];
                                                            handleResizeMouseDown({
                                                                clientX: touch.clientX,
                                                                clientY: touch.clientY,
                                                                preventDefault: () => { },
                                                                stopPropagation: () => { }
                                                            });
                                                        }}
                                                    >
                                                        <Move className="w-5 h-5 pointer-events-none" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hidden canvas for processing */}
                            <canvas ref={canvasRef} className="hidden" />

                            {/* Controls */}
                            <div className="flex flex-col gap-4">
                                <button
                                    type="button"
                                    onClick={applyCrop}
                                    disabled={isUploading}
                                    className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-5 rounded-[1.5rem] text-xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader className="animate-spin w-6 h-6" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-6 h-6" />
                                            Set Profile Photo
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelCrop}
                                    disabled={isUploading}
                                    className="w-full py-5 rounded-[1.5rem] text-lg font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-[0.98]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;