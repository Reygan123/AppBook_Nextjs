// pages/api/login.js
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, secret);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid credentials" });
  }
}
