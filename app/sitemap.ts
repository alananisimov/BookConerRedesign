import { MetadataRoute } from "next";
import prisma from "@/app/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
    take: 1,
  });

  return [
    {
      url: "https://bookconer.site",
      lastModified: new Date(),
    },
    ...users.map((user) => ({
      url: `https://bookconer.site/${user.id}`,
      lastModified: new Date(),
    })),
  ];
}
