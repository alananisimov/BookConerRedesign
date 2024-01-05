import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import PrismaVercelKV from "prisma-vercel-kv";
export const prismaWithCaching = new PrismaClient().$extends(withAccelerate());
const prisma = new PrismaClient();
export default prisma;
