import { useState } from "react";
import axios from "axios";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUrl = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }
    setLoading(true);
    const response = await axios.post("http://localhost:3000/url", {
      url: url.trim(),
    });
    const id = response.data?.id;
    setShortUrl(`http://localhost:3000/url/${id}`);
    setLoading(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="w-full mx-auto my-10 bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
        URL Shortener
      </h1>

      <input
        type="text"
        value={url}
        placeholder="Enter the URL you want to shorten"
        onChange={(e) => setUrl(e.target.value)}
        className="text-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-3 w-full rounded-xl mb-5 outline-none"
      />

      <button
        className={`w-full py-3 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-200 ${
          loading
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
        }`}
        onClick={handleUrl}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Short URL"}
      </button>

      {shortUrl && (
        <div className="mt-8 p-5 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 shadow-inner">
          <p className="text-lg font-medium text-gray-700 mb-2">Short URL:</p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="underline text-indigo-600 font-medium break-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
