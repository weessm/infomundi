"use client";

import Link from "next/link";
import Image from "next/image";

export default function ErrorPage() {
  return (
    <section className="flex flex-col container">
      <Link href={"/"} className="flex items-center py-2 gap-2 text-lg w-fit">
        <Image src={"/back-arrow.svg"} alt="Back icon" width={16} height={16} />
        Back
      </Link>
      <h2 className="text-5xl text-center font-bold text-gray-800 mt-16 mb-3">
        Error
      </h2>
      <div className="text-2xl text-center font-bold text-gray-800 mb-16">
        <p>Sorry, an error occurred while processing your request.</p>
        <p>We will try to resolve the issue as soon as possible.</p>
      </div>
    </section>
  );
}
