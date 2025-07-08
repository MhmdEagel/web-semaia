"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
// import { generateVerificationToken } from "@/lib/tokens";
import { IRegister } from "@/types/Auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { sendVerificationEmail } from "./sendEmail";
// import { sendVerificationEmail } from "./sendEmail";

const registerUser = async (data: IRegister) => {
  const { fullname, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already used.");
  }
  
  await db.user.create({
    data: {
      fullname,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  redirect("/auth/register/success");
};

export { registerUser };
