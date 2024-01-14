"use client";
import Link from "next/link";
export default function NoBooks() {
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-cyan-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Товар не найден
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Извените, такого товара пока нет. Надеемся он скоро будет в наличии
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/home"
              className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Вернутся на главную
            </Link>
            <Link
              href="https://t.me/hollz69"
              className="text-sm font-semibold text-gray-900"
            >
              Связатся с поддержкой <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
