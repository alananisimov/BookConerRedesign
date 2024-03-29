"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "src/app/lib/hooks/use-scroll";
import { useSignInModal } from "./SignInModal";
import UserDropdown from "./UserDropdown";
import { Session } from "next-auth";
import CartButton from "../Cart/OpenCartButton";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(25);
  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link
            href="/home"
            className="flex items-center font-display text-xl md:text-2xl"
          >
            <Image
              src="/book.jpg"
              alt="Precedent logo"
              width="35"
              height="35"
              className="mr-2 rounded-full"
            ></Image>
            <p className=" truncate">Книжный уголок</p>
          </Link>
          <div className="inline-flex ml-auto space-x-3">
            <CartButton />
            <div className="">
              {session ? (
                <UserDropdown session={session} />
              ) : (
                <button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                >
                  Войти
                </button>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
