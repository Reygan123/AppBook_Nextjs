// components/HeroSection.js
import React from 'react';

const HeroSection = () => {
    return (
        <div className="bg-[#19376D] text-white py-20 rounded-xl">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Book Manager</h1>
                <p className="text-lg mb-8">Manage Your Book Here</p>
                <button className="bg-white text-blue-800 px-6 py-3 rounded-full font-bold hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
