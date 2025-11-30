import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { MainLayout } from './components/MainLayout';

import { StudioPage } from './pages/StudioPage';
import { StoriesPage } from './pages/StoriesPage';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<MainLayout />}>
                        <Route path="/studio" element={
                            <ProtectedRoute>
                                <StudioPage />
                            </ProtectedRoute>
                        } />

                        <Route path="/stories" element={
                            <ProtectedRoute>
                                <StoriesPage />
                            </ProtectedRoute>
                        } />
                    </Route>

                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/studio" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
