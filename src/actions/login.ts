"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { ILogin } from "@/types/Auth";
import { AuthError } from "next-auth";

const loginUser = async (data: ILogin) => {
  const { email, password } = data;
  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    throw new Error("Email not found")
  }

  if (!user.emailVerified) {
    throw new Error("Email not verified. Check your inbox or spam.")
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/"
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Email or password incorrect.");
        default:
          throw new Error("Something went wrong");
      }
    }
    throw error;
  }
};

export default loginUser;
