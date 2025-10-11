import User from "../models/user.js";
import Url from "../models/url.js";

const handleUserRegistration = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if email or username already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({ error: "User Already Exists" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};


const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); // <-- use findOne
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password); // now this works
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

const handleUserDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    // 🧠 Validate user existence first
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔗 Fetch all URLs created by this user
    const urls = await Url.find({ owner: userId }).sort({ createdAt: -1 });

    // 🧾 Optionally populate 'owner' if you need user info in each URL
    // const urls = await Url.find({ owner: userId })
    //   .populate("owner", "username email")
    //   .sort({ createdAt: -1 });

    // ✅ Send response
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      urls,
    });
  } catch (error) {
    console.error("Error in handleUserDashboard:", error);
    return res.status(500).json({ error: "Server error while fetching dashboard data" });
  }
};

const handleUserUrlDeleteRequest = async (req, res) => {
  try {
    const { userId } = req.params;

    // 🧠 Validate user existence first
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔗 Fetch all URLs created by this user
    const urls = await Url.find({ owner: userId }).sort({ createdAt: -1 });

    // 🧾 Optionally populate 'owner' if you need user info in each URL
    // const urls = await Url.find({ owner: userId })
    //   .populate("owner", "username email")
    //   .sort({ createdAt: -1 });

    // ✅ Send response
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      urls,
    });
  } catch (error) {
    console.error("Error in handleUserDashboard:", error);
    return res.status(500).json({ error: "Server error while fetching dashboard data" });
  }
};
export { handleUserRegistration, handleUserLogin, handleUserDashboard };
