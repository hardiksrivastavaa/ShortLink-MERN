import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";

const UserDashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      if (!user?.userId) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/user/dashboard/${user.userId}`
        );
        setUrls(res.data.urls || []);
      } catch (err) {
        console.error("Error fetching URLs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [user, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleCopy = (url) => {
    // const shortUrl = `http://localhost:3000/url/${shortId}`;
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-indigo-600 text-lg font-medium animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-10 px-4 flex justify-center mt-12">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 text-center sm:text-left">
            Welcome, {user?.username || "User"} 👋
          </h1>
          <button
            onClick={handleLogout}
            className="hidden sm:block bg-red-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-all shadow-md"
          >
            Logout
          </button>
        </div>

        {/* URLs List */}
        {urls.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg">
              You haven’t created any shortened URLs yet.
            </p>
            <p className="text-indigo-600 font-medium mt-2">
              Start by shortening a URL from the home page!
            </p>
          </div>
        ) : (
          <>
            {/* Responsive Table (hidden on small screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse text-sm lg:text-base">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-700">
                    <th className="p-3 text-left">Short ID</th>
                    <th className="p-3 text-left">Short URL</th>
                    <th className="p-3 text-left">Original URL</th>
                    <th className="p-3 text-center">Clicks</th>
                    <th className="p-3 text-left">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map((url) => {
                    const shortUrl = `http://localhost:3000/url/${url.shortId}`;
                    const originalUrl = url.redirectUrl;
                    
                    return (
                      <tr key={url._id} className="border-b hover:bg-gray-50 transition">


                        <td className="p-3 font-mono text-indigo-600">
                          {url.shortId}
                        </td>


                        <td className="p-3 flex items-center gap-2" title={shortUrl}>
                          <a href={shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">
                            Short Url
                          </a>
                          <button onClick={() => handleCopy(shortUrl)} className="text-gray-500 hover:text-indigo-600" title="Copy">
                            <Copy size={16} />
                          </button>
                        </td>
                        

                        <td className="p-3" title={originalUrl}>
                          <a href={originalUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">
                            Original Url
                          </a>
                          <button onClick={() => handleCopy(originalUrl)} className="text-gray-500 hover:text-indigo-600 px-2" title="Copy">
                            <Copy size={16} />
                          </button>
                        </td>


                        <td className="p-3 text-center">
                          {url.visitHistory.length}
                        </td>


                        <td className="p-3 text-gray-500">
                          {new Date(url.createdAt).toLocaleDateString()}
                        </td>


                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Card View (for small screens) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden mt-6">
              {urls.map((url) => {
                const shortUrl = `https://url-shortner-mern-7hrn.onrender.com/url/${url.shortId}`;
                return (
                  <div
                    key={url._id}
                    className="p-5 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
                  >
                    <h2 className="font-bold text-indigo-600 text-lg mb-2">
                      {url.shortId}
                    </h2>

                    <div className="mb-2 flex items-center gap-2">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 text-sm truncate hover:underline"
                      >
                        {shortUrl}
                      </a>
                      <button
                        onClick={() => handleCopy(url.shortId)}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <Copy size={16} />
                      </button>
                    </div>

                    <p
                      className="text-gray-700 text-sm truncate mb-2"
                      title={url.redirectUrl}
                    >
                      <a
                        href={url.redirectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {url.redirectUrl}
                      </a>
                    </p>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Clicks: {url.visitHistory.length}</span>
                      <span>
                        {new Date(url.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
