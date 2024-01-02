"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { ShoppingCart } from "lucide-react";
import { Button } from "shadcn/components/ui/button";
import TestSheet, { CartSheetWrapper } from "../TestSheet";
import { useState } from "react";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [open, setOpen] = useState(false)
  return (
    <>
    <CartSheetWrapper open={open} setOpen={setOpen} className={""}/>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/home" className="flex items-center font-display text-xl md:text-2xl">
            <Image
              src="/book.jpg"
              alt="Precedent logo"
              width="35"
              height="35"
              className="mr-2 rounded-full"
            ></Image>
            <p>Книжный уголок</p>
          </Link>
          <div className="inline-flex ml-auto space-x-3">
          <div className="">
            <Button className="py-0 h-[36px] focus:outline-none focus:border-0 transition-all ease-in-out hover:scale-110" onClick={()=>setOpen(true)}>
            <ShoppingCart/>
            
            </Button>
            </div>
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
          <div>
            
          </div>
        </div>
      </div>
    </>
  );
}
