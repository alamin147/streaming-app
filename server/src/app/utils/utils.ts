import { createError } from "../error/error";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const response = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data?: any
) => {
  res.status(status).json({
    status,
    success,
    message,
    data,
  });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token)
    return next(createError(401, false, "You are not authenticated!"));

  jwt.verify(token, process.env.JWTSECRET as string, (err: any, user: any) => {
    if (err) return next(createError(403, false, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const utils = {
  hashPassword,
};
