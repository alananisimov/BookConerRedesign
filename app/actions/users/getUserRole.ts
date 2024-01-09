"use server";
import { authOptions } from "@/app/lib/configuration";
import { prismaWithCaching } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

export default async function getUserRole() {
  const ses = await getServerSession(authOptions);
  if (!ses || !ses.user || !ses.user.email) {
    return "User";
  }
  const user = await prismaWithCaching.user.findUnique({
    where: {
      email: ses.user.email,
    },
  });

  return user?.role;
}
