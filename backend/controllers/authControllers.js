import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegister = async (req, res) => {
  const { username, password } = req.body;
  //check fields are present

  //check for duplicates

  //handle register logic
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPwd });

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

  //check user exists
  const user = await User.findOne({ username }).exec();

  if (!user) {
    return res.status(401).json({ message: "Username not found" });
  }

  //handle login logic
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const accessToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "1d" }
    );
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    const result = await user.save();

    //creates secure cookie with refresh token

    res.cookie("jwt", refreshToken, {
      domain: process.env.COOKIE_HOST,
      partition: true,
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } else {
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
    res.clearCookie("jwt", {
      domain: ".smrtnews.org",
      partition: true,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  //delete refreshToken
  user.refreshToken = "";
  const result = await user.save();

  res.clearCookie("jwt", {
    domain: ".smrtnews.org",
    partition: true,
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

export const handleRefresh = async (req, res) => {
  const cookies = req.cookies;

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
