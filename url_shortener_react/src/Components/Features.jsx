import React from 'react'
import FeatureCard from './FeatureCard'

const features = [
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="currentColor" d="M3 12h18M3 6h18M3 18h18"/>
        </svg>`,
        title: "Easy URL Shortening",
        description: "Create short and memorable links in seconds with intuitive tools.",
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="currentColor" d="M12 3v18m9-9H3"/>
        </svg>`,
        title: "Link Management",
        description: "Track, edit, and organize all your URLs from a clean dashboard.",
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle stroke="currentColor" cx="12" cy="12" r="9"/>
        </svg>`,
        title: "Secure & Reliable",
        description: "Your data and links are safe with robust security protocols.",
    },
];

const Features = () => {
    return (
        <section id="features" className="pt-16 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center select-none">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {features.map((f, idx) => <FeatureCard key={idx} {...f} />)}
            </div>
        </section>
    );
}

export default Features
