import React from 'react'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className="navbar p-0">
      <div className="flex-1">
        <h3 className="btn btn-ghost text-xl">Journalize</h3>
      </div>
      <div className="flex-none">
            <button className="btn btn-outline">Get started</button>
      </div>
    </div>
  );
}