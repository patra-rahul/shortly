import { type Request, type Response } from "express";
import argon2 from "argon2";
import { User } from "../models/user.model.js";

import {
  generateAccessToken,
  generateRefreshToken,
  REFRESH_TOKEN_MAX_AGE,
} from "./jwt.js";

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
    
    // Create password hash
    const passwordHash = await argon2.hash(password);

    // Stores in the database
    const user = new User({ email, passwordHash });

    const userId = user._id.toString(); // in mongodb, the ObjectId is created before inserting the document in database
    
    // Generating the accessToken and refreshToken using the ObjectId we got
    const [accessToken, refreshToken] = await Promise.all([ 
      generateAccessToken(userId),
      generateRefreshToken(userId),
    ]);

    await user.save();

    // Store the refreshToken in the Cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/auth/v1",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
    res.setHeader("Cache-Control", "no-store");

    return res.status(201).json({
      message: "User registered successfully.",
      accessToken,
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

export async function login(req: Request, res: Response) {}
