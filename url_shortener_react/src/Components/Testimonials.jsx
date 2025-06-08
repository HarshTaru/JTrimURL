import React from 'react'
import TestimonialCard from './TestimonialCard'
const Testimonials = () => {
      const testimonials = [
        {
            quote: "JTrimURL has transformed the way I share links with clients. Fast, reliable, and easy to manage.",
            author: "Alice Wang",
        },
        {
            quote: "The user-friendly dashboard makes tracking and organizing my URLs a breeze.",
            author: "Marcus Lee",
        },
        {
            quote: "High-quality security ensures my data is safe, giving me great peace of mind.",
            author: "Priya Patel",
        },
    ];

    return (
        <section id="testimonials" className="pt-16 pb-20 bg-gray-50 rounded-3xl max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center select-none">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {testimonials.map((testimonial, i) => (
                    <TestimonialCard key={i} {...testimonial} />
                ))}
            </div>
        </section>
    );
}

export default Testimonials
