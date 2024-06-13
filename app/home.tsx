import Image from "next/image";
import React from "react";

type Props = {};

export default function HomePage(props: Props) {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl font-semibold md:text-5xl">
          Reflect on your day.
        </h1>
        <p className="text-lgtext-center md:text-xl font-normal text-slate-600">
          Improve by looking through your mistakes
        </p>
      </div>
      <div className="flex flex-col items-center gap-10">
        <Image
          src="/reflection.svg"
          alt="Reflection illustration image"
          width={500}
          height={500}
        />
        <button className="btn text-xl text-white bg-black">Start Journaling</button>
      </div>
    </div>
  );
}
