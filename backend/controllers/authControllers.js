import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegister = async (req, res) => {
  // console.log(req.username);
  console.log(req.body);
  const { username, password } = req.body;
  //check fields are present
  console.log(username, password);

  //check for duplicates

  //handle register logic
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPwd });
    console.log(user);
    return res
      .status(201)
      .json({ message: "New user created", data: JSON.stringify(user) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  // check fields are present
  console.log("Username", username);
  //check user exists
  const user = await User.findOne({ username }).exec();
  console.log("Found User", user);
  if (!user) {
    console.log("user not found");
    return res.status(401).json({ message: "Username not found" });
  }

  //handle login logic
  const match = await bcrypt.compare(password, user.password);
  console.log(match);
  if (match) {
    const accessToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_EXP }
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: process.env.REFRESH_EXP }
    );
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    const result = await user.save();
    console.log(result);
    //creates secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      partition: true,
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } else {
    console.log("sending status 401");
    return res.sendStatus(401);
  }
};
export const handleLogout = async (req, res) => {
  // on client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  // is refreshToken in database?
  const user = await User.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //delete refreshToken
  user.refreshToken = "";
  const result = await user.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

export const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  console.log("JWT Cookie", cookies?.jwt);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
    if (err || user.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_EXP }
    );
    res.json({ accessToken });
  });
};
