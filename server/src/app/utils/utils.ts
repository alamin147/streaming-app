import bcrypt from "bcryptjs";
import { Response } from "express";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const response = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  token?: string,
  data?: any
) => {
  if (token) {
    res.cookie("token", token, {
      httpOnly: true,
    });
  }
  res.status(status).json({
    status,
    success,
    message,
    data,
  });
};
export const utils = {
  hashPassword,
};
