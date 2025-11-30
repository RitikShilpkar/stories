import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PlusSquare, Grid } from 'lucide-react';
import { clsx } from 'clsx';

export const MainLayout: React.FC = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar / Navbar */}
            <aside className="bg-white border-r border-gray-200 w-full md:w-64 flex-shrink-0 flex flex-col h-auto md:h-screen sticky top-0 z-50">
                <div className="p-6 flex items-center justify-between md:justify-start">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                            S
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                            StorySnap
                        </span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1 overflow-x-auto md:overflow-visible flex md:flex-col">
                    <NavLink
                        to="/studio"
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap',
                                isActive
                                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            )
                        }
                    >
                        <PlusSquare className="w-5 h-5" />
                        Create Story
                    </NavLink>

                    <NavLink
                        to="/stories"
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap',
                                isActive
                                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            )
                        }
                    >
                        <Grid className="w-5 h-5" />
                        My Stories
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-gray-200 mt-auto">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0 hidden md:block">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden h-[calc(100vh-64px)] md:h-screen">
                <Outlet />
            </main>
        </div>
    );
};
