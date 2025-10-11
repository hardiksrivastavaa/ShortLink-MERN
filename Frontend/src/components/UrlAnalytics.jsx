import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const UrlAnalytics = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrl = async () => {
    if (!shortUrl.trim()) {
      toast.error("Please enter your shortened URL");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/url/analytics/",
        { shortUrl: shortUrl.trim() }
      );
      setHistory(response.data);
      toast.success("Analytics fetched successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-20 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-200 flex flex-col items-center"
      >
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          URL Analytics
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Enter your shortened URL below to view analytics and visit history.
        </p>

        {/* Input */}
        <input
          type="text"
          value={shortUrl}
          placeholder="e.g. https://your-short-link"
          onChange={(e) => setShortUrl(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-700 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                     transition-all outline-none mb-5 placeholder-gray-400"
        />

        {/* Button */}
        <button
          onClick={handleUrl}
          disabled={loading}
          className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 shadow-md ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg"
          }`}
        >
          {loading ? "Fetching..." : "Get URL Analytics"}
        </button>

        {/* Analytics Data */}
        {history && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 w-full p-5 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 shadow-inner"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-4 text-center">
              Analytics Overview
            </h2>

            <div className="text-gray-700 text-center mb-5">
              <p>
                <span className="font-semibold">Total Visits:</span>{" "}
                <span className="text-indigo-600 font-bold">
                  {history.totalClicks}
                </span>
              </p>
              <p>
                <span className="font-semibold">Short ID:</span>{" "}
                <span className="text-indigo-600 font-bold">
                  {history.shortId}
                </span>
              </p>
            </div>

            {/* Visit History */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {history.visitHistory.length > 0 ? (
                history.visitHistory.map((visit, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    <p className="text-gray-700 font-medium text-sm">
                      Visit #{index + 1}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      <span className="font-semibold">Visited At:</span>{" "}
                      {visit["Visit Date"]}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center italic">
                  No visit history available yet.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default UrlAnalytics;
