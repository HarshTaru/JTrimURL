import React from 'react'

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-8 text-center">
            <div className="mx-auto h-16 w-16 mb-6 stroke-current text-gray-700" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }}></div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900">{title}</h3>
            <p className="text-gray-500 text-base">{description}</p>
        </div>
    );
}

export default FeatureCard
