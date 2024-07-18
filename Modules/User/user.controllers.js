import { customAlphabet } from "nanoid";
import User from "../../DB/Models/User/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError, catchAysncErrorr } from "../../Utils/ErrorHandling.js";
import { sendEmail } from "../../Utils/Email.js";


// User Signup
export const signup = catchAysncErrorr(async (req, res) => {
  const {
    email,
    password,
    reCoveryEmail,
    fristName,
    lastName,
    DOB,
    mobileNumber,
    role
  } = req.body;

  const hashPass = bcrypt.hashSync(password, 10);

  const sign = await User.create({
    email,
    reCoveryEmail,
    password: hashPass,
    fristName,
    lastName,
    username: `${fristName}${lastName}`,
    DOB,
    mobileNumber,
    role
  });

  res.json({ message: "Accuont Created Success", sign });
});

// To User Login
export const signin = catchAysncErrorr(async (req, res) => {
  const { email, mobileNumber, reCoveryEmail, password } = req.body;

  const login = await User.findOne({
    $or: [{ email }, { mobileNumber }, { reCoveryEmail }],
  });

  if (!login) {
    throw new AppError(
      "Email or mobile number or recovery email not found, please signup",
      400
    );
  }
  const isPasswordValid = bcrypt.compareSync(password, login.password);
  if (!isPasswordValid) {
    return res.json({ message: "Invalid password" });
  }

  login.state = "online";
  await login.save();

  jwt.sign(
    { userId: login._id, name: login.userName, role: login.role },
    "secret_token",
    (error, token) => {
      res.json({ message: "Login Successfully", token });
    }
  );
});

// Udate User Account
export const updateAcc = catchAysncErrorr(async (req, res) => {
  const { email, userName, mobileNumber, DOB, reCoveryEmail } = req.body;
  const update = await User.updateOne({
    email,
    userName,
    mobileNumber,
    DOB,
    reCoveryEmail,
  });
  res.json({ message: "Updated Successfully", update });
});

// Delete User Account
export const deleteAcc = catchAysncErrorr(async (req, res) => {
  const accDelete = await User.deleteOne();
  res.json({ message: "Account Deleted Successfully" });
});

// Get All Data By Id
export const getAllDataById = catchAysncErrorr(async (req, res) => {
  const getData = await User.findById(req.params.id);
  if (!getData) return res.json({ message: "User Not Found" });
  res.json({ message: "Get Successfully", getData });
});

// Det All Data By Token
export const getAllData = catchAysncErrorr(async (req, res) => {
  const allData = await User.findOne();
  res.json({ message: "get Data Successfully", allData });
});

// Update Password
export const updatePassword = catchAysncErrorr(async (req, res) => {
  const { password } = req.body;
  const updatePass = await User.updateOne({ password });
  res.json({ message: "update password successufully", updatePass });
});

// Forget Password
export const forgetPass = catchAysncErrorr(async (req, res) => {
  const { email } = req.body;
  const findEmail = await User.find({ email });
  if (!findEmail) return res.json({ message: "email not found" });

  const code = customAlphabet("123456789", 6);
  const newPass = code();

  await sendEmail(
    email,
    "code for reset password",
    `<h1>Your Code Is ${newPass}</h1>`
  );
  await User.updateOne({ email }, { code: newPass });

  res.json({ message: "Done , Check Your Email" });
});


// Get Account By Recovery Email
export const GetAllAccRecoveryEmail = catchAysncErrorr(async (req, res) => {
  const { reCoveryEmail } = req.body;
  const check = await User.find({ reCoveryEmail });
  if (!check.length) throw new AppError("recoveryEmail Not Found", 400);
  res.json({ message: "get Account Successfully", check });
});
