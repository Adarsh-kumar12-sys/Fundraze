import React from "react";
import { Link } from "react-router-dom";
import businessmenHero from "../assets/hero section.png";
import FounderAssistant from "../components/FounderAssistant";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { toast } from "react-toastify";



import { motion } from "framer-motion";

// Function to show contact toast
const showContactToast = () => {
    toast.success("📧 Contact: adarshpandey9910@gmail.com", {
        position: "top-right",
        autoClose: 7000,
        closeOnClick: true,
        hideProgressBar: true,
        icon: "✅",
        style: {
            background: "#d1fae5",
            borderLeft: "5px solid #10b981",
            color: "#065f46",
            fontSize: "14px",
            padding: "12px 16px",
            fontWeight: "500",
        },
    });
};

// Animated Heading component for hero section
const AnimatedHeading = ({ text, delayOffset = 0 }) => {
    return (
        <div className="leading-tight">
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: delayOffset + i * 0.07, // slower speed
                        duration: 0.4,
                        ease: "easeOut",
                    }}
                    className="text-[50px] md:text-[62px] font-extrabold text-blue-700"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    );
};

// Home component
const Home = () => {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 bg-white text-black shadow">
                <div className="flex items-center gap-2">
                    <img src="/favicon.jpg" alt="Fundraze Logo" className="h-10 w-10" />
                    <span className="text-2xl font-bold text-gray-800">Fundraze</span>
                </div>

                <ul className="flex gap-6 text-sm font-medium">
                    <li><a href="#startup">Startup</a></li>
                    <li><a href="#investor">Investor</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
                <div className="flex gap-2">
                    <Link
                        to="/login"
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Register
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="w-full bg-[#e9f6ff]">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-[1300px] mx-auto px-2 py-24">
                    <div className="md:w-1/2">
                        <span className="text-base bg-[#DCE8FF] text-[#1D4ED8] px-5 py-2 rounded-full mb-8 inline-block font-semibold">
                            Where Startups Meet Investors
                        </span>
                        <div className="mb-6 space-y-2">
                            <AnimatedHeading text="From Pitch to" delayOffset={0} />
                            <AnimatedHeading text="Partnership," delayOffset={1.2} />
                            <AnimatedHeading text="Seamlessly" delayOffset={2.4} />
                        </div>


                        <p className="text-2xl text-black mb-6 font-medium">
                            From Ideas to Impact — Get Started Now.
                        </p>
                        <Link
                            to="/register"
                            className="inline-block px-6 py-3 bg-green-400 hover:bg-green-600 text-white rounded-lg text-lg font-semibold transition"
                        >
                            Register
                        </Link>

                        <p className="mt-8 text-xl text-black font-medium">
                            Invest Today, Empower Tomorrow — Your Future Starts Here.
                        </p>
                    </div>

                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <img
                            src={businessmenHero}
                            alt="Businessmen Shaking Hands"
                            className="w-full max-w-[500px] mx-auto rounded-xl"
                        />
                    </div>
                </div>
            </section>


            {/* Investor Guide */}
            <section id="investor" className="bg-purple-100 py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-6">How to Invest in Startups</h2>
                    <p className="text-center text-gray-700 mb-12">
                        Discover and fund promising startups in three simple steps.
                    </p>
                    <div className="grid md:grid-cols-3 gap-10">
                        {["Browse Startups", "Review Details", "Make Investments"].map((title, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 rounded-lg shadow-lg hover:bg-purple-200 transition"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold">{title}</h3>
                                    <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">
                                        Step {i + 1}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {["Explore startups based on your domain expertise and interest.", "Watch pitches, review metrics and decide confidently.", "Fund startups with customizable terms and conditions."][i]}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link
                            to="/register"
                            className="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            {/* Startup Guide */}
            <section id="startup" className="bg-purple-200 py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-6">How to Attract Investors</h2>
                    <p className="text-center text-gray-700 mb-12">
                        Showcase your startup and secure funding in three simple steps.
                    </p>
                    <div className="grid md:grid-cols-3 gap-10">
                        {["Create Your Profile", "Showcase Your Business", "Connect with Investors"].map((title, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 rounded-lg shadow-lg hover:bg-purple-300 transition"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold">{title}</h3>
                                    <span className="text-xs bg-purple-300 text-purple-900 px-2 py-1 rounded">
                                        Step {i + 1}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {["Add startup details like model, domain, and funding need.", "Upload pitch decks, financials, and proof of growth.", "Match with the right investors based on your vision."][i]}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link
                            to="/register"
                            className="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
            {/* Trusted By Section */}
            <section className="bg-gradient-to-b from-[#f0faff] to-white py-20 px-4 border-t border-gray-200">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                        Trusted by <span className="text-green-600">1,000+</span> Investors &{" "}
                        <span className="text-blue-600">20,000+</span> Startups
                    </h2>
                    <p className="text-gray-600 text-lg mb-12">
                        Our growth over the years reflects the trust from both sides of the ecosystem.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Investors Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-green-600 mb-4">
                                Investor Growth
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart
                                    data={[
                                        { year: "2021", count: 200 },
                                        { year: "2022", count: 500 },
                                        { year: "2023", count: 800 },
                                        { year: "2024", count: 1500 },
                                        { year: "2025", count: 1000 },
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <Tooltip />
                                    <Bar
                                        dataKey="count"
                                        fill="#22c55e"
                                        radius={[10, 10, 0, 0]}
                                        barSize={35}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Startups Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">
                                Startup Onboarding
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart
                                    data={[
                                        { year: "2021", count: 3000 },
                                        { year: "2022", count: 7000 },
                                        { year: "2023", count: 12000 },
                                        { year: "2024", count: 18000 },
                                        { year: "2025", count: 22000 },
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <Tooltip />
                                    <Bar
                                        dataKey="count"
                                        fill="#3b82f6"
                                        radius={[10, 10, 0, 0]}
                                        barSize={35}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer id="contact" className="bg-gray-100 text-black py-12 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-xl font-bold mb-2">Fundraze</h4>
                        <p>Connecting innovative startups with visionary investors.</p>
                        <div className="flex gap-4 mt-4 text-xl">
                            <a href="#" className="hover:text-purple-600"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-purple-600"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-purple-600"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Product</h4>
                        <ul className="space-y-1 text-sm">
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>Security</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Company</h4>
                        <ul className="space-y-1 text-sm">
                            <li>About</li>
                            <li>Careers</li>
                            <li>
                                <button onClick={showContactToast} className="hover:underline">
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Resources</h4>
                        <ul className="space-y-1 text-sm">
                            <li>Documentation</li>
                            <li>Help Center</li>
                            <li>Admin Login</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
                    <p>© 2025 Fundraze. All rights reserved.</p>
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Made with <span className="text-red-500">❤️</span> by Adarsh
                    </p>

                    <div className="flex gap-4 mt-2 md:mt-0">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </footer>
            <FounderAssistant />
            {/* Removed redundant ToastContainer from here */}
        </div>
    );
};

export default Home;
