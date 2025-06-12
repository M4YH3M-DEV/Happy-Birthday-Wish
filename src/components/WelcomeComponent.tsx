"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { userList } from "@@/data/userList";

type Props = {
  name: string;
};

interface UserData {
  name: string;
  picLink: string;
  inviteMessage: string;
  songLink: string; // Added songLink property
}

export default function WelcomeComponent({ name }: Props) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName");

    if (!isLoggedIn || storedUserName !== name) {
      // If not logged in or trying to access another user's page, redirect to login
      router.push("/");
      return;
    }

    // Find user data
    const user = userList.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );

    if (user) {
      setUserData({
        name: user.name,
        picLink: user.picLink,
        inviteMessage: user.inviteMessage,
        songLink: user.songLink, // Make sure this property exists in userList
      });
    }

    setLoading(false);
  }, [name, router]);

  // Effect to play the song when userData is loaded
  useEffect(() => {
    if (userData?.songLink && audioRef.current) {
      // Try to play the audio
      const playPromise = audioRef.current.play();

      // Handle autoplay restrictions
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Autoplay prevented:", error);
          // You could show a button to manually play the audio here
        });
      }
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex min-h-screen max-[1303px]:flex-col max-[1303px]:justify-center">
      {/* Audio element for playing the song */}
      {userData.songLink && (
        <audio ref={audioRef} src={userData.songLink} loop={true} />
      )}

      {/* Confetti */}
      <motion.img
        initial={{ y: -750 }}
        animate={{ y: 600 }}
        transition={{ duration: 2 }}
        src="/img/confetie.png"
        className="fixed top-0 scale-200 z-[2]"
      />

      {/* Decor */}
      <motion.img
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 1, type: "spring", bounce: 0.6 }}
        src="/img/welcomedecor.png"
        className="fixed top-0 blur-md z-[-6] bg-cover w-full"
      />

      {/* Background */}
      <motion.div
        className="fixed top-[-10%] right-[-15%] blur-3xl z-[-5]"
        initial={{ x: 150, y: -600 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="size-[30rem] rounded-full bg-radial-[at_50%_75%] from-[#3AB1F5] via-[#0088CC] to-[#1793D1] to-90% blur-3xl" />
      </motion.div>
      <motion.div
        className="fixed bottom-[-10%] left-[-15%] blur-3xl z-[-5]"
        initial={{ x: -150, y: 600 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="size-[30rem] rounded-full bg-radial-[at_50%_75%] from-[#FF69B4] via-[#9900FF] to-[#FF69B4] to-90% blur-3xl" />
      </motion.div>

      {/* Content */}
      {/* Image */}
      <div className="min-[1303px]:w-1/2 flex min-[1303px]:hidden mt-15 mb-15">
        <motion.img
          initial={{ rotate: -15, x: 250, opacity: 0 }}
          animate={{ rotate: 24, x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.6, delay: 0.8 }}
          src={userData.picLink}
          className="m-auto rounded-4xl backdrop-blur-3xl border-blue-500 border-6 h-[290px] w-[290px]"
        />
      </div>

      {/* Text */}
      <div className="min-[1303px]:w-1/2 w-[42rem] mx-auto flex">
        <div className="w-[85%] m-auto">
          <motion.h1
            className="text-6xl font-black mb-10"
            initial={{ rotate: -15, y: -250, opacity: 0.5 }}
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.6 }}
          >
            Hey {userData.name}👋
          </motion.h1>

          <motion.p
            className="text-justify text-lg mb-10 font-bold"
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              bounce: 0.3,
              delay: 0.35,
            }}
          >
            {userData.inviteMessage}
          </motion.p>

          {/* Logout button */}
          <motion.button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("userName");
              router.push("/");
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              bounce: 0.6,
              delay: 1,
            }}
            className="outline-none select-none border-2 text-lg font-bold border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black cursor-pointer"
          >
            Logout
          </motion.button>
        </div>
      </div>

      <div className="w-1/2 flex max-[1303px]:hidden">
        <motion.img
          initial={{ rotate: -15, x: 250, opacity: 0 }}
          animate={{ rotate: 24, x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.6, delay: 0.8 }}
          src={userData.picLink}
          className="min-[1303px]:h-[447px] min-[1303px]:w-[447px] m-auto rounded-4xl backdrop-blur-3xl border-blue-500 border-6"
        />
      </div>
    </div>
  );
}
