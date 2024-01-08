"use server";
import { prismaWithCaching } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

export default async function getUserRole(email: string) {
  const user = await prismaWithCaching.user.findUnique({
    where: {
      email: email,
    },
  });
  return user?.role;
}
