"use client";

import React, { useState } from "react";
import axios from "axios";

type Props = {
  btnStyle: string;
  btnName: string;
};

export default function SignupModalButton({ btnStyle, btnName }: Props) {
  const [apiResponse, setApiResponse] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // send data to the backend
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
      });
      if (response.status === 200) {
        setApiResponse(response.data.message);
      } else {
        setApiResponse("An error occurred.");
      }
    } catch (error) {
      setApiResponse("An error occurred.");
    }
  };

  const signupModalPopup = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    } else {
      console.error("Element with ID 'my_modal_3' not found.");
    }
  };

  return (
    <div>
      <button onClick={signupModalPopup} className={btnStyle}>
        {btnName}
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div className="flex flex-col gap-5">
              <h3 className="font-bold text-lg">Signup/Login</h3>
              <div className="flex gap-3 w-full">
                <input
                  type="text"
                  name="email"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button type="submit" className="btn btn-default text-white">
                  Done
                </button>
              </div>
              <p>{apiResponse}</p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
