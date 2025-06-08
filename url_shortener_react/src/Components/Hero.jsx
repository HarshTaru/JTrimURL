import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const redirectIfNoAuth = (e) => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            e.preventDefault();
            window.location.href = "/auth";
        } else {
            window.location.href = "/dashboard";
        }
    };

    return (
        <section className="pt-24 pb-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
                className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900 select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Simplify Your Links with JTrimURL
            </motion.h1>
            <motion.p
                className="text-gray-500 text-lg md:text-xl mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                Effortlessly shorten, create, and manage your URLs with a clean, secure, and elegant solution.
            </motion.p>
            <motion.button
                onClick={redirectIfNoAuth}
                className="font-bold bg-black text-white rounded-lg px-8 py-4 text-lg hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                type="button"
                aria-label="Get Started"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                Get Started
            </motion.button>
        </section>
    );
};

export default Hero;
