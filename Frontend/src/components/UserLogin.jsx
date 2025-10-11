import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!login.email || !login.password) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      // ✅ Wrap axios request in toast.promise
      const response = await toast.promise(
        axios.post("http://localhost:3000/user/login", {
          email: login.email,
          password: login.password,
        }),
        {
          loading: "Logging in...",
          success: "Logged in successfully!",
          error: "Login failed. Try again.",
        }
      );

      // ✅ Extract user data
      const userData = {
        userId: response?.data?.user?._id,
        username: response?.data?.user?.username,
        email: response?.data?.user?.email,
      };

      // ✅ Save user globally
      loginUser(userData);

      setLogin({ email: "", password: "" });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (error) {
      console.error(error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Login to Your Account
        </h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />

        {/* Submit Button */}
        <button
          onClick={handleClick}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Redirect to register */}
        <p className="text-sm text-gray-500 mt-5 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
