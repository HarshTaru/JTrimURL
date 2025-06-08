import React from 'react'

// Pricing Card Component
function PricingCard({ title, description, price, buttonText, isFeatured = false }) {
    return (
        <div className={`
          bg-white rounded-3xl shadow-sm p-10 text-center flex flex-col
          ${isFeatured ? "border-2 border-black" : ""}
        `}>
            <h3 className={"font-semibold text-2xl mb-6 text-gray-900"}>{title}</h3>
            <p className={`mb-8 flex-1 ${isFeatured ? "text-gray-700 font-semibold" : "text-gray-500"}`}>{description}</p>
            <div className="text-4xl font-extrabold text-gray-900 mb-8">{price}</div>
            <button
                className="mt-auto bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 font-semibold"
                type="button"
            >
                {buttonText}
            </button>
        </div>
    );
}

export default PricingCard
