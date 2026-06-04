// frontend/src/pages/Community.jsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as feather from 'feather-icons';
import { communityAPI } from '../api/communityApi';
import { useAuth } from '../hooks/useAuth';


// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────
const getUserDisplayName = (userObj) => {
    if (!userObj) return 'Unknown User';
    if (userObj.firstName && userObj.lastName) {
        return `${userObj.firstName} ${userObj.lastName}`;
    }
    return userObj.username || 'Unknown User';
};

const getUserInitials = (userObj) => {
    if (!userObj) return 'U';
    if (userObj.firstName && userObj.lastName) {
        return `${userObj.firstName.charAt(0)}${userObj.lastName.charAt(0)}`.toUpperCase();
    }
    return (userObj.username || 'U').charAt(0).toUpperCase();
};

// ─────────────────────────────────────────────
//  UserAvatar
// ─────────────────────────────────────────────
const UserAvatar = ({ user, size = 'md' }) => {
    const [imgError, setImgError] = React.useState(false);

    const sizeClasses = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg'
    };
    const currentSize = sizeClasses[size] || sizeClasses.md;

    if (user && user.photoUrl && !imgError) {
        return (
            <img
                src={user.photoUrl}
                alt={getUserDisplayName(user)}
                className={`${currentSize} rounded-full object-cover border border-primary-500/30`}
                onError={() => setImgError(true)}
            />
        );
    }

    return (
        <div className={`${currentSize} rounded-full bg-primary-900/50 flex items-center justify-center text-primary-400 font-bold border border-primary-500/30 shrink-0`}>
            {getUserInitials(user)}
        </div>
    );
};

// ─────────────────────────────────────────────
//  parseContent – renders @mentions and #problems as inline elements
// ─────────────────────────────────────────────
const parseContent = (text, onProblemClick) => {
    if (!text) return null;
    // Split on @username or #number tokens
    const parts = text.split(/(@[\w.]+|#\d+)/g);
    return parts.map((part, i) => {
        if (/^@[\w.]+$/.test(part)) {
            return (
                <span
                    key={i}
                    className="inline-flex items-center gap-0.5 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 cursor-pointer transition-colors"
                    title={`User: ${part.slice(1)}`}
                >
                    {part}
                </span>
            );
        }
        if (/^#\d+$/.test(part)) {
            const problemId = part.slice(1);
            return (
                <span
                    key={i}
                    onClick={(e) => { e.stopPropagation(); onProblemClick(problemId); }}
                    className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer underline underline-offset-2 decoration-dotted transition-colors"
                    title={`Open Problem #${problemId}`}
                >
                    {part}
                </span>
            );
        }
        return <span key={i}>{part}</span>;
    });
};

// ─────────────────────────────────────────────
//  MentionTextarea – textarea with @/# autocomplete
// ─────────────────────────────────────────────
const MentionTextarea = ({ value, onChange, placeholder, rows = 4, allUsers = [], className = '' }) => {
    const [dropdown, setDropdown] = useState({ show: false, type: null, query: '', pos: 0 });
    const textareaRef = useRef(null);

    const handleKeyUp = (e) => {
        const ta = textareaRef.current;
        if (!ta) return;

        const cursor = ta.selectionStart;
        const textBefore = value.slice(0, cursor);

        // Look for @ or # trigger
        const atMatch = textBefore.match(/@([\w.]*)$/);
        const hashMatch = textBefore.match(/#(\d*)$/);

        if (atMatch) {
            setDropdown({ show: true, type: '@', query: atMatch[1], pos: cursor - atMatch[0].length });
        } else if (hashMatch) {
            setDropdown({ show: true, type: '#', query: hashMatch[1], pos: cursor - hashMatch[0].length });
        } else {
            setDropdown({ show: false, type: null, query: '', pos: 0 });
        }
    };

    const insertMention = (replacement) => {
        const ta = textareaRef.current;
        const cursor = ta.selectionStart;
        const before = value.slice(0, dropdown.pos);
        const after = value.slice(cursor);
        const newVal = before + replacement + ' ' + after;
        onChange({ target: { value: newVal } });
        setDropdown({ show: false, type: null, query: '', pos: 0 });
        // Restore focus
        setTimeout(() => {
            ta.focus();
            const newPos = before.length + replacement.length + 1;
            ta.setSelectionRange(newPos, newPos);
        }, 0);
    };

    // Filter users for @ dropdown
    const userSuggestions = allUsers
        .filter(u => u.username && u.username.toLowerCase().includes(dropdown.query.toLowerCase()))
        .slice(0, 6);

    // Suggest problem numbers for # dropdown (1-50 shown as hints)
    const problemSuggestions = dropdown.query
        ? [dropdown.query].filter(n => n.length > 0)
        : ['1', '2', '3', '4', '5'];

    return (
        <div className="relative">
            <textarea
                ref={textareaRef}
                rows={rows}
                className={`w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:border-primary-500 focus:outline-none resize-none transition-colors ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyUp={handleKeyUp}
                onClick={handleKeyUp}
            />

            {/* Dropdown */}
            {dropdown.show && (
                <div className="absolute z-50 bottom-full mb-1 left-0 w-64 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl overflow-hidden">
                    {dropdown.type === '@' && (
                        <>
                            <div className="px-3 py-1.5 text-xs text-gray-400 border-b border-gray-700 flex items-center gap-1">
                                <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">@</span> Mention a user
                            </div>
                            {userSuggestions.length === 0 ? (
                                <div className="px-3 py-2 text-xs text-gray-500">No users found</div>
                            ) : (
                                userSuggestions.map((u, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onMouseDown={(e) => { e.preventDefault(); insertMention(`@${u.username}`); }}
                                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-700 transition-colors text-left"
                                    >
                                        <UserAvatar user={u} size="sm" />
                                        <div>
                                            <div className="text-sm text-white font-medium">@{u.username}</div>
                                            {(u.firstName || u.lastName) && (
                                                <div className="text-xs text-gray-400">{u.firstName} {u.lastName}</div>
                                            )}
                                        </div>
                                    </button>
                                ))
                            )}
                        </>
                    )}
                    {dropdown.type === '#' && (
                        <>
                            <div className="px-3 py-1.5 text-xs text-gray-400 border-b border-gray-700 flex items-center gap-1">
                                <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">#</span> Link a problem
                            </div>
                            {dropdown.query ? (
                                <button
                                    type="button"
                                    onMouseDown={(e) => { e.preventDefault(); insertMention(`#${dropdown.query}`); }}
                                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-700 transition-colors text-left"
                                >
                                    <span className="text-amber-600 dark:text-amber-400 font-bold text-base">#</span>
                                    <span className="text-white text-sm">Problem <span className="text-amber-400 font-semibold">#{dropdown.query}</span></span>
                                </button>
                            ) : (
                                problemSuggestions.map((n, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onMouseDown={(e) => { e.preventDefault(); insertMention(`#${n}`); }}
                                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-700 transition-colors text-left"
                                    >
                                        <span className="text-amber-600 dark:text-amber-400 font-bold">#</span>
                                        <span className="text-white text-sm">Problem #{n}</span>
                                    </button>
                                ))
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Hint row */}
            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">@</span>mention a user
                </span>
                <span className="flex items-center gap-1">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">#</span>link a problem (e.g. #42)
                </span>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
//  Community Component
// ─────────────────────────────────────────────
const Community = () => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // All unique users extracted from discussions (for @ autocomplete)
    const [allUsers, setAllUsers] = useState([]);

    // Create Modal State
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
    const [creating, setCreating] = useState(false);

    // View Modal State
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [commenting, setCommenting] = useState(false);

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [discussionToDelete, setDiscussionToDelete] = useState(null);

    // Navigate to a problem page
    const openProblem = (problemId) => {
        navigate(`/solve?problemId=${problemId}`);
    };

    // Fetch Discussions
    const fetchDiscussions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await communityAPI.getAllDiscussions();
            setDiscussions(response.data);

            // Collect unique users from all authors & comment authors for mentions
            const usersMap = new Map();
            response.data.forEach(d => {
                if (d.author && d.author.username) {
                    usersMap.set(d.author.username, d.author);
                }
                (d.comments || []).forEach(c => {
                    if (c.author && c.author.username) {
                        usersMap.set(c.author.username, c.author);
                    }
                });
            });
            setAllUsers(Array.from(usersMap.values()));
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load discussions.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDiscussions();
    }, [fetchDiscussions]);

    useEffect(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, [discussions, selectedDiscussion]);

    // Handle Scroll for back to top
    const handleScroll = useCallback(() => {
        if (window.pageYOffset > 300) setIsVisible(true);
        else setIsVisible(false);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle Create Post
    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) return alert('Please login to post.');

        try {
            setCreating(true);
            const tagsArray = newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            await communityAPI.createDiscussion({ ...newPost, tags: tagsArray });

            setShowCreateModal(false);
            setNewPost({ title: '', content: '', tags: '' });
            fetchDiscussions();
        } catch {
            alert('Failed to create post. Please try again.');
        } finally {
            setCreating(false);
        }
    };

    // Handle View Discussion
    const openDiscussion = async (id) => {
        try {
            const response = await communityAPI.getDiscussionById(id);
            setSelectedDiscussion(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Handle Comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) return alert('Please login to comment.');
        if (!commentContent.trim()) return;

        try {
            setCommenting(true);
            await communityAPI.addComment(selectedDiscussion.id, commentContent);
            const updatedDiscussion = await communityAPI.getDiscussionById(selectedDiscussion.id);
            setSelectedDiscussion(updatedDiscussion.data);
            setCommentContent('');
        } catch {
            alert('Failed to post comment.');
        } finally {
            setCommenting(false);
        }
    };

    // Handle Like
    const handleLike = async (e, id) => {
        e.stopPropagation();
        if (!isLoggedIn) return alert('Please login to like.');

        try {
            await communityAPI.toggleLike(id);
            if (selectedDiscussion && selectedDiscussion.id === id) {
                const updated = await communityAPI.getDiscussionById(id);
                setSelectedDiscussion(updated.data);
            }
            fetchDiscussions();
        } catch (err) {
            console.error(err);
        }
    };

    // Request Delete (Open Modal)
    const requestDelete = (e, id) => {
        e.stopPropagation();
        setDiscussionToDelete(id);
        setShowDeleteModal(true);
    };

    // Confirm Delete
    const confirmDelete = async () => {
        if (!discussionToDelete) return;

        try {
            await communityAPI.deleteDiscussion(discussionToDelete);
            setDiscussions(prev => prev.filter(d => d.id !== discussionToDelete));
            if (selectedDiscussion?.id === discussionToDelete) {
                setSelectedDiscussion(null);
            }
            setShowDeleteModal(false);
            setDiscussionToDelete(null);
        } catch (err) {
            console.error(err);
            alert("Failed to delete discussion.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] dark:dark-gradient-secondary font-sans text-gray-900 dark:text-gray-100">
            {/* Hero Section */}
            <div className="pt-24 pb-10 relative z-10 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6">
                        Join Our <span className="text-primary-500">Community</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-3">
                        Connect, share, and grow with fellow developers. Discuss problems, share solutions, and get help.
                    </p>
                    {/* Hints for mentions */}
                    <div className="flex items-center justify-center gap-4 mb-6 text-sm">
                        <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/60 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                            <span className="text-primary-600 dark:text-primary-400 font-bold text-base">@</span>
                            mention users
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/60 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                            <span className="text-amber-600 dark:text-amber-400 font-bold text-base">#</span>
                            link problems
                        </span>
                    </div>

                    <button
                        onClick={() => isLoggedIn ? setShowCreateModal(true) : alert('Please login to start a discussion')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10"
                    >
                        <i data-feather="plus-circle" className="w-5 h-5 text-gray-900"></i>
                        Start Discussion
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading discussions...</div>
                ) : error ? (
                    <div className="text-center py-20 text-red-400">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {discussions.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">No discussions yet. Be the first to post!</div>
                        ) : (
                            discussions.map(discussion => (
                                <div
                                    key={discussion.id}
                                    onClick={() => openDiscussion(discussion.id)}
                                    className="bg-[#ffffff] dark:!bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-xl p-4 sm:p-6 hover:shadow-lg dark:hover:bg-gray-800/60 transition-all cursor-pointer group hover:border-primary-500/30"
                                >
                                    {/* User Info Header */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <UserAvatar user={discussion.author} size="md" />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 dark:text-white text-sm">{getUserDisplayName(discussion.author)}</span>
                                                {discussion.author?.username && (
                                                    <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">@{discussion.author.username}</span>
                                                )}
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(discussion.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs">
                                                <i data-feather="eye" className="w-3 h-3"></i>
                                                <span>{discussion.views}</span>
                                            </div>
                                            {user && discussion.author && user.id === discussion.author._id && (
                                                <button
                                                    onClick={(e) => requestDelete(e, discussion.id)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                                    title="Delete Discussion"
                                                >
                                                    <i data-feather="trash-2" className="w-4 h-4"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-left">
                                        {discussion.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm text-left">
                                        {parseContent(discussion.content, openProblem)}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/30">
                                        <div className="flex gap-2 flex-wrap">
                                            {discussion.tags.map((tag, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-700">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-6 text-gray-400">
                                            <button
                                                className="flex items-center gap-2 hover:text-red-400 transition-colors"
                                                onClick={(e) => handleLike(e, discussion.id)}
                                            >
                                                <i data-feather="heart" className={`w-4 h-4 ${discussion.likes.includes(user?.id) ? 'fill-red-500 text-red-500' : ''}`}></i>
                                                {discussion.likes.length}
                                            </button>
                                            <div className="flex items-center gap-2">
                                                <i data-feather="message-square" className="w-4 h-4"></i>
                                                {discussion.comments.length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* CREATE POST MODAL */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#ffffff] dark:bg-gray-900 rounded-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
                        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Create Discussion</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <i data-feather="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        <form onSubmit={handleCreatePost} className="p-4 md:p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none"
                                    placeholder="What's on your mind?"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Content</label>
                                <MentionTextarea
                                    rows={6}
                                    placeholder="Describe your question or topic... Use @username to mention someone or #42 to link a problem."
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    allUsers={allUsers}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none"
                                    placeholder="java, algorithms, web-dev"
                                    value={newPost.tags}
                                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-6 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="dark-btn px-6 py-2 rounded-lg font-bold disabled:opacity-50"
                                >
                                    {creating ? 'Publishing...' : 'Publish Discussion'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW DISCUSSION MODAL */}
            {selectedDiscussion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-gray-900 rounded-2xl w-full max-w-4xl border border-gray-700 shadow-2xl my-8 flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="p-4 md:p-6 border-b border-gray-800 flex justify-between items-start sticky top-0 bg-gray-900 z-10 rounded-t-2xl">
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <UserAvatar user={selectedDiscussion.author} size="md" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-base">{getUserDisplayName(selectedDiscussion.author)}</span>
                                        {selectedDiscussion.author?.username && (
                                            <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">@{selectedDiscussion.author.username}</span>
                                        )}
                                        <span className="text-sm text-gray-400">{new Date(selectedDiscussion.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <h2 className="text-xl md:text-3xl font-bold text-white mb-2 text-left">{selectedDiscussion.title}</h2>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                {user && selectedDiscussion.author && user.id === selectedDiscussion.author._id && (
                                    <button
                                        onClick={(e) => requestDelete(e, selectedDiscussion.id)}
                                        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                                        title="Delete Discussion"
                                    >
                                        <i data-feather="trash-2" className="w-6 h-6"></i>
                                    </button>
                                )}
                                <button onClick={() => setSelectedDiscussion(null)} className="text-gray-400 hover:text-white p-2">
                                    <i data-feather="x" className="w-6 h-6"></i>
                                </button>
                            </div>
                        </div>

                        {/* Content Scrollable Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6">
                            {/* Parsed content with @mentions and #problems */}
                            <div className="prose prose-invert max-w-none mb-8 text-gray-300 whitespace-pre-wrap leading-relaxed text-left">
                                {parseContent(selectedDiscussion.content, openProblem)}
                            </div>

                            <div className="flex gap-2 mb-8 flex-wrap">
                                {selectedDiscussion.tags.map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-gray-800 text-sm text-primary-400 rounded-full border border-gray-700">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 py-4 border-y border-gray-800 mb-8">
                                <button
                                    onClick={(e) => handleLike(e, selectedDiscussion.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${selectedDiscussion.likes.includes(user?.id) ? 'text-red-500' : 'text-gray-400'}`}
                                >
                                    <i data-feather="heart" className={`w-5 h-5 ${selectedDiscussion.likes.includes(user?.id) ? 'fill-current' : ''}`}></i>
                                    {selectedDiscussion.likes.length} Likes
                                </button>
                                <div className="flex items-center gap-2 text-gray-400 px-4 py-2">
                                    <i data-feather="message-circle" className="w-5 h-5"></i>
                                    {selectedDiscussion.comments.length} Comments
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white">Comments</h3>

                                {selectedDiscussion.comments.map((comment, idx) => (
                                    <div key={idx} className="bg-gray-800/30 rounded-xl p-4 border border-gray-800">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <UserAvatar user={comment.author} size="sm" />
                                                <div>
                                                    <span className="font-bold text-white text-sm">{getUserDisplayName(comment.author)}</span>
                                                    {comment.author?.username && (
                                                        <span className="ml-1.5 text-xs text-primary-600 dark:text-primary-400">@{comment.author.username}</span>
                                                    )}
                                                    <span className="ml-1.5 text-xs text-gray-500">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Parsed comment with @mentions and #problems */}
                                        <p className="text-gray-300 pl-8 whitespace-pre-wrap">
                                            {parseContent(comment.content, openProblem)}
                                        </p>
                                    </div>
                                ))}

                                {/* Add Comment Form */}
                                <form onSubmit={handleAddComment} className="mt-8">
                                    <MentionTextarea
                                        rows={3}
                                        placeholder="Add to the discussion... Use @username to mention or #42 to link a problem."
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)}
                                        allUsers={allUsers}
                                    />
                                    <div className="mt-2 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={commenting || !commentContent.trim()}
                                            className="dark-btn px-6 py-2 rounded-lg font-bold text-sm disabled:opacity-50"
                                        >
                                            {commenting ? 'Posting...' : 'Post Comment'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-gray-900 rounded-2xl w-full max-w-sm border border-gray-700 shadow-2xl p-6 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mb-4 border border-red-500/30">
                            <i data-feather="alert-triangle" className="w-6 h-6 text-red-500"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Delete Discussion?</h3>
                        <p className="text-gray-400 mb-6 text-sm">
                            Are you sure you want to delete this discussion? <br /> This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => { setShowDeleteModal(false); setDiscussionToDelete(null); }}
                                className="px-5 py-2 rounded-lg text-gray-300 hover:bg-gray-800 border border-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-5 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Back to Top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary-600 text-white shadow-lg transition-all duration-300 z-40 hidden md:block ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <i data-feather="arrow-up" className="w-6 h-6"></i>
            </button>
        </div>
    );
};

export default Community;
