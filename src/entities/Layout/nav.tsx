import { authOptions } from "src/app/lib/configuration";
import Navbar from "./Navbar";
import { getServerSession } from "next-auth/next";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  return <Navbar session={session} />;
}
