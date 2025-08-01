import genToken from "../config/token.js";
import bcrypt from 'bcrypt';
import User from "../model/user.model.js";

// ✅ SignUp Controller
export const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const findWithEmail = await User.findOne({ email });
    if (findWithEmail) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = await genToken(user._id);

 res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
  sameSite: "None",                // required for cross-site cookies
  secure: true,                    // required for HTTPS
});

    return res.json({ success: true, message: "Account created successfully" });

  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// ✅ Login Controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Email incorrect" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.json({ success: false, message: "Password incorrect" });
    }

    const token = await genToken(user._id);

   res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
  sameSite: "None",                // required for cross-site cookies
  secure: true,                    // required for HTTPS
});


    return res.json({ success: true,user });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Logout Controller
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "None",  // ✅ Make sure to clear the correct cookie
      secure: true,      // ✅ Must match the cookie's original options
    });

    return res.json({ success: true, message: "Logout successfully" });

  } catch (error) {
    return res.json({ success: false, message: "Logout error" });
  }
};




export const currentUser = async (req, res) => {
  try {
    const userid = req.userid; // Make sure this is set by your auth middleware

    const user = await User.findById(userid)
      .select("-password")            // remove password field
      .populate("members");           // populate members from Member collection

    if (!user) {
      return res.json({ success: false, message: "User Not Logged In" });
    }

    return res.json({ success: true, user });

  } catch (error) {
    console.error("currentUser Error:", error);
    return res.json({ success: false, message: "currentUser Error" });
  }
};

