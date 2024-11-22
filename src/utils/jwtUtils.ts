import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";


export const generateToken = (payload: object) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
};

// Verify a JWT token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
