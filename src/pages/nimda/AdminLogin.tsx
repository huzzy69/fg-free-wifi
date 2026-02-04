import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock as LockIcon, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { config } = useSiteConfig();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Use credentials from config, fallback to defaults if not set (though they are set in defaultConfig)
        const validUsername = config.adminUsername || 'admin';
        const validPassword = config.adminPassword || 'admin123';

        if (username === validUsername && password === validPassword) {
            const loginTime = new Date().getTime();
            localStorage.setItem('isAdminAuthenticated', 'true');
            localStorage.setItem('adminLoginTime', loginTime.toString());
            navigate('/nimda/dashboard');
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
                            <UserIcon size={18} className="input-icon" />
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
                            <LockIcon size={18} className="field-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? "Hide Password" : "Show Password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
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
