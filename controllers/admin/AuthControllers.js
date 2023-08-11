import Admin from "../../models/AdminModel.js";
import { createToken } from "../../utils/SecretToken.js";

export const adminSignUp = async (req, res) => {
  // destructure payload coming from client side
  const { username, email, password } = req.body;
  try {
    // check if payloads are present
    if (!username || !email || !password) {
      return res.status(400).json("Please provide all fields");
    }
    // check if email already exists
    const alreadyExists = await Admin.findOne({ email: email });

    if (alreadyExists) {
      return res.status(400).json("Email already exists");
    }

    // create new user
    const admin = await Admin.create({
      username,
      email,
      password,
    });

    // generate token
    const token = createToken(admin._id);

    // store token in cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // send response back to client
    res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  // destructure payload coming from client side
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("Please provide all fields");
    }
    // check if email is valid
    const validEmail = await Admin.findOne({ email });
    if (validEmail && (await validEmail.matchPassword(password))) {
      // generate token
      const token = createToken(validEmail._id);

      // store token in cookie
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });

      // send response back to client
      res.status(200).json({
        message: "Admin logged in successfully",
        admin: validEmail,
      });
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getAdmin = async(req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if(admin) {
      res.status(200).json({
        status:"success",
        message: "Admin details retrieved successfully",
        data: admin 
      })
    }else{
      res.status(404).json({
        status:"error",
        message: "Admin not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
