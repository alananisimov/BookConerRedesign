import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import PrismaVercelKV from "prisma-vercel-kv";
const prisma = new PrismaClient().$extends(withAccelerate());

export default prisma;
