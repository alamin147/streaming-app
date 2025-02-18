class CustomError extends Error {
  status: number;
  success: boolean;

  constructor(status: number, success: boolean, message: string) {
    super(message);
    this.status = status;
    this.success = success;
  }
}

export const createError = (
  status: number,
  success: boolean,
  message: string
) => {
  const err = new CustomError(status, success, message);

  err.status = status;
  err.success = success;
  err.message = message;
  return err;
};
