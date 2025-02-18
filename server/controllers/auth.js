import User from "../models/User.js";
import { response, utils } from "../utils/utils.js";

export const signup = async (req, res) => {
  try {
    const data = req.body;
    const hash = await utils.hashPassword(data.password);

    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    response(res, 201, true, "User created successfully");
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      success: false,
    });
  }
};
