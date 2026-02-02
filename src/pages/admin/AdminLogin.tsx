import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Mock Authentication
        // In a real app, this would hit an API endpoint
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials.');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src="/src/assets/logo.png" alt="Logo" className="admin-logo" />
                    <h2>Admin Portal</h2>
                    <p>Please sign in to continue</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-wrapper">
                            <User size={18} className="input-icon" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-full">Sign In</button>
                </form>

                <div className="login-footer">
                    <p>Secure Admin Access Only</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
