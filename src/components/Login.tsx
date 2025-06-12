"use client";
import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [verifyStatus, setVerifyStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const verifyUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password) {
      setVerifyStatus("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      setVerifyStatus("Verifying...");
      setLoading(true);

      const res = await fetch("/api/verifyUser", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.status === 200) {
        setVerifyStatus("Login Successful");
        // Store login state in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", name);
        // Navigate to welcome page
        router.push(`/welcome/${name}`);
      } else {
        setVerifyStatus("User not found :(");
        setLoading(false);
      }
    } catch{
      setVerifyStatus("Login Failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Background */}
      <motion.div
        className="fixed top-[-10%] left-[-15%] blur-3xl z-[-10]"
        initial={{ x: -150, y: 600 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="size-[30rem] rounded-full bg-radial-[at_50%_75%] from-[#3AB1F5] via-[#0088CC] to-[#1793D1] to-90% blur-3xl" />
      </motion.div>
      <motion.div
        className="fixed bottom-[-10%] right-[-15%] blur-3xl z-[-10]"
        initial={{ x: 150, y: -600 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="size-[30rem] rounded-full bg-radial-[at_50%_75%] from-[#FF69B4] via-[#9900FF] to-[#FF69B4] to-90% blur-3xl" />
      </motion.div>

      <motion.img
        initial={{ y: -750 }}
        transition={{ duration: 1, type: "spring", bounce: 0.7 }}
        animate={{ y: 0 }}
        src="/img/triangleDecoration.png"
        className="fixed bg-cover z-[-9] top-0 blur-sm"
      />

      <motion.div
        className="relative flex w-[40rem] h-[70%] mx-7 max-[707px]:hidden"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.7 }}
      >
        <div className="rounded-xl w-full bg-gradient-to-bl p-[5px] from-[#9900FF] via-[#1793D1] to-[#FF69B4]">
          {/* Form */}
          <div className="flex flex-col h-full bg-black rounded-lg items-center">
            {/* Spacer */}
            <div className="my-auto" />

            {/* Welcome message */}
            <motion.h1
              className="text-5xl font-bold"
              initial={{ y: -40, opacity: 0, rotate: -10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
            >
              🎉 Happy Birthday 🎉
            </motion.h1>
            <br />
            <motion.h1
              className="text-5xl font-bold"
              initial={{ y: -40, opacity: 0, rotate: 10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
            >
              🎉 Rehat 🎉
            </motion.h1>

            {/* Spacer */}
            <div className="my-auto" />

            <form
              className="flex flex-col gap-4 w-full px-10"
              onSubmit={verifyUser}
            >
              {/* Username */}
              <motion.input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-full px-4 py-2 outline-none border-2 border-white text-2xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7, type: "spring" }}
              />

              {/* Password */}
              <motion.input
                type="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password :)"
                className="w-full rounded-full px-4 py-2 outline-none border-2 border-white text-2xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1, type: "spring" }}
              />

              {/* Submit button */}
              <div className="flex items-center gap-7">
                <motion.button
                  className="ml-none rounded-full px-4 py-1 mt-3 bg-white text-black text-2xl cursor-pointer"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.3, type: "spring" }}
                >
                  Login
                </motion.button>

                {verifyStatus && (
                  <p
                    className={`mt-2 text-xl ${
                      loading ? "text-[#00FF00]" : "text-[#FF3333]"
                    } font-bold`}
                  >
                    {verifyStatus}
                  </p>
                )}
              </div>
            </form>

            {/* Spacer */}
            <div className="my-auto" />
          </div>
        </div>
      </motion.div>

      {/* Open in laptop */}
      <div className="min-[707px]:hidden h-[100vh] flex flex-col justify-center items-center px-10 relative z-10">
        <p className="text-3xl text-center">Open in laptop</p>
      </div>
    </div>
  );
}
