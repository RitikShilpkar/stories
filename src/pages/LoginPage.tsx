import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/studio';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-400/30 blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-400/30 blur-3xl" />
                <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full bg-pink-400/30 blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-4 shadow-lg backdrop-blur-sm">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">StorySnap</h1>
                        <p className="text-white/70">Create beautiful stories in seconds</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-100 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/90 ml-1">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/90 ml-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 rounded-xl bg-white text-indigo-600 font-bold text-lg shadow-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/50 text-sm mt-6">
                    Don't have an account? Contact your admin.
                </p>
            </div>
        </div>
    );
};
