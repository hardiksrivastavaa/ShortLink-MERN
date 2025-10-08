import { useState } from "react";
import axios from "axios";

export default function UrlAnalyticsForm() {
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUrl = async () => {
    if (!shortUrl) {
      alert("Please enter your Shortend Url");
      return;
    }
    setLoading(true);
    const response = await axios.post(`https://url-shortner-mern-7hrn.onrender.com/analytics/`, {
      shortUrl: shortUrl.trim(),
    });
    const data = response.data;
    setHistory(data);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-10 bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-600 text-center">
        URL Analytics
      </h1>

      <input
        type="text"
        value={shortUrl}
        placeholder="Enter the shortened URL of your Original URL"
        onChange={(e) => setShortUrl(e.target.value)}
        className="text-base sm:text-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-3 w-full rounded-xl mb-5 outline-none"
      />

      <button
        className={`w-full py-3 text-base sm:text-lg font-semibold cursor-pointer rounded-xl transition-all duration-200 ${
          loading
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
        }`}
        onClick={handleUrl}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get URL Analytics"}
      </button>

      {history && (
        <div className="mt-8 p-5 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 shadow-inner">
          <p className="text-lg font-semibold text-gray-800 mb-3">
            Analytics Below
          </p>

          <h2 className="text-md font-medium text-gray-700 mb-4">
            Total Visits:{" "}
            <span className="font-semibold text-indigo-600">
              {history.totalClicks}
            </span>{" "}
            <br />
            Unique Short ID:{" "}
            <span className="font-semibold text-indigo-600">
              {history.shortId}
            </span>
          </h2>

          <div className="mt-3 space-y-4">
            {history.visitHistory.map((visit, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 p-4 border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:gap-6 w-full">
                  <p className="text-gray-700 font-medium text-sm sm:text-base">
                    Visit #{index + 1}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base break-words">
                    <span className="font-semibold">Visited Date:</span>{" "}
                    {visit["Visit Date"]}
                  </p>
                  {/* <p className="text-gray-600 text-sm sm:text-base break-words">
                    <span className="font-semibold">Visit ID:</span>{" "}
                    {visit["Visit ID"]}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
