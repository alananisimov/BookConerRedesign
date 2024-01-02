import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export default async function handle(req: NextRequest, res: NextResponse) {
  const books = await prisma.book.findMany()
  return 123
}