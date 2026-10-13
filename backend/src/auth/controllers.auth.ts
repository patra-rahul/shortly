import { type Request, type Response } from "express";
import argon2 from "argon2";
import { User } from "../models/user.model.js";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body ?? {};

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return res.status(400).json({
      message:
        "Provide a valid email and a password with at least 8 characters.",
    });
  }

  try {
    const passwordHash = await argon2.hash(password);
    const user = await User.create({ email, passwordHash });

    return res.status(201).json({
      message: "User registered successfully.",
      user: { id: user._id, email: user.email }, // the id needs to be changed later that comes from envoy
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    console.error("User registration failed:", error);
    return res.status(500).json({ message: "Unable to register user." });
  }
}
