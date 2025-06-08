import React from 'react';
const { useState } = React;

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', role: ['ROLE_USER'] });
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const switchMode = (mode) => {
        setMessage(null);
        setIsLogin(mode === 'login');
    };

    const handleInputChange = (e, isLoginForm) => {
        const { name, value } = e.target;
        if (isLoginForm) {
            setLoginData(prev => ({ ...prev, [name]: value }));
        } else {
            setRegisterData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const response = await fetch('http://localhost:8080/api/auth/public/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });
            const text = await response.text();
            if (response.ok) {
                setMessage({ type: 'success', text: text || 'User registered successfully' });
                setRegisterData({ username: '', email: '', password: '', role: ['ROLE_USER'] });
                setRegisterData({ username: '', email: '', password: '' })
                window.location.href = "/auth";
                switchMode('login')

            } else {
                setMessage({ type: 'error', text: text || 'Registration failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        }
        setLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const response = await fetch('http://localhost:8080/api/auth/public/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (response.ok && data.token) {
                setMessage({ type: 'success', text: 'Login successful' });
                localStorage.setItem('authToken', data.token);
                window.location.href = "/dashboard";
                setLoginData({ username: '', password: '' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Login failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-4xl shadow-neutral-500 shadow-2xl px-10 py-12 max-w-md w-full mx-5">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold mb-2">{isLogin ? 'Login' : 'Register'}</h1>
                    <p className="text-gray-500 text-sm">
                        {isLogin
                            ? 'New here? '
                            : 'Already have an account? '}
                        <button
                            onClick={() => switchMode(isLogin ? 'register' : 'login')}
                            className="text-black font-bold hover:underline focus:outline-none"

                            aria-label={isLogin ? 'Switch to Register' : 'Switch to Login'}
                        >
                            {isLogin ? 'Create an account' : 'Login'}
                        </button>
                    </p>
                </header>

                {message && (
                    <div
                        className={`
                mb-6 px-4 py-3 rounded text-center
                ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
              `}
                        role="alert"
                        aria-live="assertive"
                    >
                        {message.text}
                    </div>
                )}

                {isLogin ? (
                    <form onSubmit={handleLogin} noValidate>
                        <div className="mb-6">
                            <label htmlFor="login-username" className="block mb-2 text-sm font-semibold text-gray-700">Username</label>
                            <input
                                type="text"
                                id="login-username"
                                name="username"
                                value={loginData.username}
                                onChange={(e) => handleInputChange(e, true)}
                                required
                                className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="username"
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="login-password" className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
                            <input
                                type="password"
                                id="login-password"
                                name="password"
                                value={loginData.password}
                                onChange={(e) => handleInputChange(e, true)}
                                required
                                className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="current-password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className=" w-full font-bold bg-black text-white rounded-lg px-8 py-4 text-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900">
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} noValidate>
                        <div className="mb-6">
                            <label htmlFor="register-username" className="block mb-2 text-sm font-semibold text-gray-700">Username</label>
                            <input
                                type="text"
                                id="register-username"
                                name="username"
                                value={registerData.username}
                                onChange={(e) => handleInputChange(e, false)}
                                required
                                className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="username"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="register-email" className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
                            <input
                                type="email"
                                id="register-email"
                                name="email"
                                value={registerData.email}
                                onChange={(e) => handleInputChange(e, false)}
                                required
                                className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="email"
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="register-password" className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
                            <input
                                type="password"
                                id="register-password"
                                name="password"
                                value={registerData.password}
                                onChange={(e) => handleInputChange(e, false)}
                                required
                                className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="new-password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className=" w-full font-bold bg-black text-white rounded-lg px-8 py-4 text-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900">
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthPage;
