import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const normalizeUrl = (input) => {
    // Auto-prepend https:// if user missed it
    if (!/^https?:\/\//i.test(input)) {
      return `https://${input}`;
    }
    return input;
  };

  const handleUrl = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      const normalizedUrl = normalizeUrl(url);
      console.log(normalizedUrl);
      
      const response = await axios.post("http://localhost:3000/url", {
        url: normalizedUrl,
        userId: user?.userId,
      });

      const id = response.data?.id;
      const newShort = `http://localhost:3000/url/${id}`;
      setShortUrl(newShort);

      toast.success("Short URL generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
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
          Shorten Your Link
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Paste your long URL below and get a short, trackable link instantly.
        </p>

        <input
          type="text"
          value={url}
          placeholder="e.g. www.example.com/my-long-link"
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-700 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                     transition-all outline-none mb-5 placeholder-gray-400"
        />

        <button
          className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 shadow-md ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg"
          }`}
          onClick={handleUrl}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Short URL"}
        </button>

        {/* Shortened Link Section */}
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 w-full p-5 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 shadow-inner"
          >
            <p className="text-lg font-semibold text-gray-800 mb-3 text-center">
              Your Shortened Link 🔗
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="underline text-indigo-600 font-medium break-all text-center sm:text-left"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 
                           text-white font-medium rounded-lg shadow-sm transition-all"
              >
                Copy
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default UrlShortener;
