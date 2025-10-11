import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { user_Route } from "../utils/constant";

const UserRegistration = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!register.username || !register.email || !register.password) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      // ✅ Wrap axios POST call in toast.promise
      await toast.promise(
        axios.post(`${user_Route}/register`, {
          username: register.username,
          email: register.email,
          password: register.password,
        }),
        {
          loading: "Registering user...",
          success: "Registered successfully!",
          error: "Registration failed. Try again.",
        }
      );

      setRegister({ username: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 800);
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
          Create an Account
        </h1>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          value={register.username}
          onChange={(e) =>
            setRegister({ ...register, username: e.target.value })
          }
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          value={register.email}
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          value={register.password}
          onChange={(e) =>
            setRegister({ ...register, password: e.target.value })
          }
        />

        {/* Register Button */}
        <button
          onClick={handleClick}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Redirect to Login */}
        <p className="text-sm text-gray-500 mt-5 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserRegistration;
