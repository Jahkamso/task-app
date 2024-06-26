"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import SignupModalButton from "./_components/SignupModalButton";

type Props = {};

type Authorization = {
  token: string
}

export default function HomePage({}: Props) {
  const [email, setEmail] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const router = useRouter();

  // Handle login and send magic link email
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
      });
      console.log("Login response:", response.data);
      const token = response.data.token;
      localStorage.setItem("authToken", token); // Store the token in local storage
      alert("Login successful! Magic link sent to your email.");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed.");
    }
  };

  // Verify user once the token is received
  useEffect(() => {

    const verifyUser = async (token: string) => {
      try {
        const response = await axios.get(`http://localhost:3001/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Verify response:", response.data);
        if (response.status === 200) {
          setVerificationMessage(response.data.message);
          router.push("/dashboard");
        } else {
          setVerificationMessage("Verification failed.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationMessage("Verification failed.");
      }
    };

      verifyUser(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc0MmYwYTFhMWQzOGJlZDAwY2NmZTEiLCJpYXQiOjE3MTkyOTk3NDUsImV4cCI6MTcxOTMwMzM0NX0.IY307fYweEKLDfAPDA_--iNurDQ3r8rGVNgqOWzp6Jg"
      );

  }, [router]);

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl font-semibold md:text-5xl">
          Reflect on your day.
        </h1>
        <p className="text-lg text-center md:text-xl font-normal text-slate-600">
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
        <SignupModalButton
          btnStyle="btn btn-default text-xl text-white transform hover:scale-110"
          btnName="Start Journaling"
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input input-bordered"
        />
        <button onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
      </div>
      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
}
