import Admin from "../../models/AdminModel.js";
import { createToken } from "../../utils/SecretToken.js";
import {
  genMailTemplate,
  genSuccessMailTemplate,
  generateOTP,
  sendEmail,
} from "../../utils/sendEmail.js";
import VerifyToken from "../../models/verificationToken.js";

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

    // genrate OTP
    const otp = generateOTP();

    const verificationToken = await VerifyToken.create({
      owner: admin._id,
      token: otp,
    });

    // send verification email
    (await sendEmail()).sendMail({
      from: "Tes-HMS@gmail.com",
      to: admin.email,
      subject: "Verify Your Account",
      html: genMailTemplate(otp, admin.email),
    });

    // generate token
    const token = createToken(admin._id);

    // send response back to client
    res.status(201).json({
      status: "success",
      message: `Regisration successful`,
      data:{
        username: admin.username,
        email: admin.email,
        id: admin._id,
        isVerified: admin.isVerified
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  // destruction request payload
  const { userId, otp } = req.body;

  try {
    // check if all credentials exist
    if (!userId || !otp) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide all fields",
      });
    }
    // get admin
    const validAdmin = await Admin.findById(userId);
    // admin not found
    if (!validAdmin) {
      return res.status(400).json({
        status: "Failed",
        message: "Admin not found",
      });
    }
    // if admin is already verified.
    if (validAdmin.isVerified) {
      return res.status(400).json({
        status: "Failed",
        message: "Admin already verified",
      });
    }
    const validToken = await VerifyToken.findOne({ owner: validAdmin._id });
    if (!validToken) {
      return res.status(400).json({
        status: "Failed",
        message: "admin not found",
      });
    }

    // matched client OTP with the one in our db
    const isMatched = validToken.matchToken(otp);
    if (!isMatched) {
      return res.status(400).json({
        status: "Failed",
        message: "OTP is not valid",
      });
    }
    // if it matches
    validAdmin.isVerified = true;
    await VerifyToken.findByIdAndDelete(validToken._id);
    await validAdmin.save();

    await (
      await sendEmail()
    ).sendMail({
      from: "Tes-HMS@gmail.com",
      to: validAdmin.email,
      subject: `Welcome  ${validAdmin.username}`,
      html: genSuccessMailTemplate(validAdmin.email),
    });

    res.status(200).json({
      status: "success",
      message: "Admin verified successfully",
      data: {
        username: validAdmin.username,
        email: validAdmin.email,
        id: validAdmin._id,
        isVerified: validAdmin.isVerified
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
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


      // send response back to client
      res.status(200).json({
        message: "Admin logged in successfully",
        data: {
          username:validEmail.username,
          email:validEmail.email,
          isVerified: validEmail.isVerified
        },
        token,
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

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (admin) {
      res.status(200).json({
        status: "success",
        message: "Admin details retrieved successfully",
        data: admin,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Admin not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
