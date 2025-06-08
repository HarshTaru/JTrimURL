import React from 'react'
import PricingCard from './PricingCard'
const Pricing = () => {
  const plans = [
        {
            title: "Free Plan",
            description: "Basic features to get started with link shortening.",
            price: (<><span>$0</span><span className="text-lg font-normal"> / month</span></>),
            buttonText: "Get Started",
        },
        {
            title: "Pro Plan",
            description: "Advanced features for professionals and businesses.",
            price: (<><span>$9.99</span><span className="text-lg font-normal"> / month</span></>),
            buttonText: "Get Started",
            isFeatured: true,
        },
        {
            title: "Enterprise",
            description: "Custom plans and features tailored to your needs.",
            price: "Contact Us",
            buttonText: "Contact Sales",
        },
    ];

    return (
        <section id="pricing" className="pt-16 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center select-none">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {plans.map((plan, i) => (
                    <PricingCard key={i} {...plan} />
                ))}
            </div>
        </section>
    );
}

export default Pricing

