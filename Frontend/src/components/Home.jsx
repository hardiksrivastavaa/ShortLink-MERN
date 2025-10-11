import { Link } from "react-router-dom";
import features from "../utils/features";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white flex flex-col items-center justify-start pt-28 pb-16 px-6 overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-indigo-700 mb-5 leading-tight">
          Simplify Your Links with{" "}
          <span className="text-indigo-500">ShortLink</span>
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Shorten, share, and track your links effortlessly — built for speed,
          simplicity, and smart analytics.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shorten"
            className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 text-lg font-semibold rounded-xl hover:bg-indigo-50 hover:border-indigo-700 hover:text-indigo-700 transition-all duration-300"
          >
            Create Account
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="mt-20 w-full max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose <span className="text-indigo-600">ShortLink?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border border-gray-100"
            >
              <div className="text-5xl mb-4 text-indigo-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24 w-full max-w-4xl bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl shadow-lg text-white text-center py-12 px-6"
      >
        <h3 className="text-3xl font-bold mb-3">
          Start Shortening Your Links Today!
        </h3>
        <p className="text-indigo-100 mb-6">
          Join thousands of users making their links smarter and cleaner.
        </p>
        <Link
          to="/register"
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all duration-300"
        >
          Sign Up Free
        </Link>
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-indigo-600 font-semibold">ShortLink</span>. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
