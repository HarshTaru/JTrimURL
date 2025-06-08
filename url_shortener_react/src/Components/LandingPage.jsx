import Navbar from './Navbar'
import Hero from './Hero'
import Features from './Features'
import Pricing from './Pricing'
import Testimonials from './Testimonials'
import Footer from './Footer'
import React from 'react'

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Pricing />
                <Testimonials />
            </main>
            <Footer />
        </>
    )
}

export default LandingPage









