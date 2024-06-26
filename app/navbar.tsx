import React from "react";
import SignupModalButton from "./_components/SignupModalButton";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="navbar p-0">
      <div className="flex-1">
        <h3 className="btn btn-ghost text-xl">Journalize</h3>
      </div>
      <div
        className="flex-none lg:tooltip lg:hover:tooltip-open lg:tooltip-left"
        data-tip="start journaling"
      >
        <SignupModalButton btnStyle="btn btn-outline" btnName="Get started" />
      </div>
    </div>
  );
}
