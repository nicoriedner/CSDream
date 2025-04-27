import { useState } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Navbar */}
            <nav className="w-full bg-gray-800 p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center">
                    <Home className="text-white mr-2" />
                </div>
                <h1 className="text-2xl font-bold text-yellow-400">CSDream</h1>
                <div className="flex gap-2">
                    <button className="bg-gray-700 px-4 py-2 rounded-lg">Login</button>
                    <button className="bg-gray-700 px-4 py-2 rounded-lg">Register</button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="flex flex-col items-center justify-center text-center px-4 py-20">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-extrabold text-yellow-400 mb-4"
                >
                    Experience the Thrill of Opening CS Cases for Free!
                </motion.h2>
                <p className="text-lg max-w-2xl">
                    CSDream replicates the case-opening experience from Counter-Strike. Open cases for free, earn balance, and trade skins with other users.
                </p>
            </header>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20">
                <FeatureCard title="Open Cases for Free" description="Enjoy case openings without spending real money." />
                <FeatureCard title="Trade with Others" description="Use your balance to buy and sell skins on the marketplace." />
                <FeatureCard title="Build Your Collection" description="Expand your inventory with rare and valuable skins." />
            </section>

            {/* Footer */}
            <footer className="text-center p-4 bg-gray-800 text-gray-400">
                &copy; 2024 CSDream - All rights reserved.
            </footer>
        </div>
    );
}

function FeatureCard({ title, description }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center"
        >
            <h3 className="text-xl font-semibold text-yellow-400">{title}</h3>
            <p className="mt-2 text-gray-300">{description}</p>
        </motion.div>
    );
}
