import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const response = (res, status, success, message) => {
  res.status(status).json({
    status,
    success,
    message,
  });
};
export const utils = {
  hashPassword,
};
