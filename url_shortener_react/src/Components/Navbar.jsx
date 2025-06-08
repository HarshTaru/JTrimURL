import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);

    // Check authToken on mount
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        setIsLogin(!!authToken);
    }, []);

    const redirectIfNoAuth = (e, fallbackHref = "/auth") => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            e.preventDefault();
            setIsLogin(false);
            window.location.href = fallbackHref;
        } else {
            setIsLogin(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLogin(false);
        window.location.href = "/"; // Redirect to home or login
    };

    return (
        <nav className="sticky top-0 bg-white shadow-sm z-30">
            <div className="flex justify-between items-center h-16 px-0 sm:px-4 lg:px-8 max-w-7xl mx-auto">
                <a href="/" className="font-extrabold text-2xl text-gray-900 select-none">JTrimURL</a>

                {!isLogin && (
                    <div className="flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-200">Features</a>
                        <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-200">Pricing</a>
                        <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-200">Testimonials</a>
                    </div>
                )}

                <div className="flex items-center space-x-4">
                    {isLogin ? (
                        <>
                            <button
                                onClick={handleLogout}
                                className="font-semibold text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a
                                href="/auth"
                                className="font-semibold bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                Login
                            </a>
                        </>
                    )}
                    <button
                        onClick={(e) => redirectIfNoAuth(e)}
                        className="hidden md:inline-block font-semibold border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        type="button"
                        aria-label="Create Links"
                    >
                        Create Links
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
