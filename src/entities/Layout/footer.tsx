import Link from "next/link";
import { Telegram } from "src/shared/icons";

export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center">
      <p className="text-gray-500">
        Проект от{" "}
        <Link
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://t.me/hollz69"
          target="_blank"
          rel="noopener noreferrer"
        >
          gothex
        </Link>
      </p>
      <Link
        href="https://t.me/hollz69"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-2 flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-6 py-2 transition-all duration-75 hover:scale-105"
      >
        <Telegram className="h-5 w-5" />
        <p className="font-medium text-gray-600">Связатся в телеграм</p>
      </Link>
    </div>
  );
}
