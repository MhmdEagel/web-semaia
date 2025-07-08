"use server";

import { getUserByEmail } from "@/data/user";
import { getVerifictaionTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerifictaionTokenByToken(token);

  if (!existingToken) {
    return { error: "Token doesn't exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email not found." };
  }

  if (hasExpired) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
    await db.user.delete({
      where: { id: existingUser.id },
    });
    return { error: "Token expired." };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email berhasil diverifikasi" };
};
