import React from 'react'

// Testimonial Card Component
function TestimonialCard({ quote, author }) {
    return (
        <blockquote className="bg-white border-1 rounded-3xl shadow-sm p-8 text-gray-700 flex flex-col select-none">
            <p className="mb-6 text-lg">&ldquo;{quote}&rdquo;</p>
            <footer className="mt-auto text-right font-semibold text-gray-900">— {author}</footer>
        </blockquote>
    );
}

export default TestimonialCard
