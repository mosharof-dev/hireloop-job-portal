"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiUser, BiEnvelope, BiLockAlt, BiBuilding } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { FiCpu, FiActivity, FiAward } from "react-icons/fi";
import { motion } from "framer-motion";

const SignUp = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("seeker");

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const planId = user.role === "seeker" ? "seeker_free" : "recruiter_free";
    const { data, error } = await authClient.signUp.email({
      name: user.fullName,
      email: user.email,
      password: user.password,
      role: user.role,
      plan: planId,
      callbackURL: "/signin",
    });

    setIsLoading(false);

    if (error) {
      toast.error(
        `Registration Failed: ${error.message || "Something went wrong!"}`,
      );
      return;
    }

    if (data) {
      console.log("Registered User Name:", user.fullName);
      console.log("Registered User Email:", user.email);

      toast.success("Registration Successful! 🎉 Please login to continue.");

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/send-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.fullName,
              role: user.role,
              plan: planId,
            }),
          },
        );
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      await authClient.signOut();
      router.push(`/signin?redirect=${redirectTo}`);
    }
  };

  const signinWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className=" w-full flex items-center justify-center bg-[#030303] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/*  Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[130px] opacity-70" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-950/10 blur-[130px] opacity-70" />
        {/* Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10"
      >
        {/* Left Side: Branding / Features Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="hidden lg:flex lg:w-1/2 p-12 lg:p-16 flex-col justify-between bg-linear-to-b from-zinc-900/30 via-zinc-900/10 to-transparent relative overflow-hidden border-r border-zinc-850/70"
        >
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 flex flex-col gap-8">
            {/* Live Badge */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4.5 py-1.5 shadow-[0_0_15px_rgba(59,130,246,0.06)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                  HireLoop Ecosystem
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Join the elite tech talent pool and match with{" "}
              <span className="bg-linear-to-r from-blue-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
                top-tier
              </span>{" "}
              companies.
            </h2>

            {/* Features List */}
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-start gap-4 group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  <FiCpu className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white">
                    Smart Matchmaking
                  </h4>
                  <p className="text-[13px] text-zinc-400 mt-1 leading-relaxed">
                    Advanced recommendation engine pairing you with
                    high-affinity career opportunities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                  <FiActivity className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white">
                    Application Pipeline
                  </h4>
                  <p className="text-[13px] text-zinc-400 mt-1 leading-relaxed">
                    Real-time status updates and end-to-end transparent process
                    tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/5 text-sky-400 group-hover:text-sky-300 transition-colors duration-300">
                  <FiAward className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white">
                    Premium Direct Channels
                  </h4>
                  <p className="text-[13px] text-zinc-400 mt-1 leading-relaxed">
                    Direct messaging routes to verified engineering managers and
                    product heads.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="relative z-10 pt-8 border-t border-zinc-900 flex items-center justify-between text-zinc-500 text-xs">
            <span className="font-semibold">Join 15K+ members</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="font-semibold">1.2M jobs matches</span>
          </div>
        </motion.div>

        {/* Right Side: SignUp Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0d0d10]/30 relative z-10">
          {/* Form Header */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Create Account
            </h1>
            <p className="mt-2 text-zinc-400 text-[15px]">
              Enter your details to get started.
            </p>
          </div>

          <Form
            className="flex flex-col gap-5 max-w-lg mx-auto lg:mx-0 w-full"
            onSubmit={onSubmit}
          >
            {/* Full Name */}
            <TextField
              isRequired
              name="fullName"
              validate={(value) =>
                value.length < 3 ? "Name must be at least 3 characters." : null
              }
              className="w-full"
            >
              <Label className="mb-1.5 text-sm font-semibold text-zinc-300">
                Full Name
              </Label>
              <InputGroup className="group rounded-xl bg-zinc-900/40 border border-zinc-800/80 focus-within:border-blue-500/50 focus-within:bg-zinc-950/70 transition-all duration-300 shadow-inner focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <InputGroup.Prefix className="pl-3.5">
                  <BiUser className="size-4.5 text-zinc-500 group-focus-within:text-blue-400 transition-colors duration-200" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your full name"
                  className="bg-transparent py-3 text-[15px] text-white font-medium focus:outline-none placeholder-zinc-600 w-full"
                />
              </InputGroup>
              <FieldError className="text-xs text-red-400 mt-1.5 pl-1 font-semibold" />
            </TextField>

            {/* Email Address */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
              className="w-full"
            >
              <Label className="mb-1.5 text-sm font-semibold text-zinc-300">
                Email Address
              </Label>
              <InputGroup className="group rounded-xl bg-zinc-900/40 border border-zinc-800/80 focus-within:border-blue-500/50 focus-within:bg-zinc-950/70 transition-all duration-300 shadow-inner focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <InputGroup.Prefix className="pl-3.5">
                  <BiEnvelope className="size-4.5 text-zinc-500 group-focus-within:text-blue-400 transition-colors duration-200" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your email"
                  className="bg-transparent py-3 text-[15px] text-white font-medium focus:outline-none placeholder-zinc-600 w-full"
                />
              </InputGroup>
              <FieldError className="text-xs text-red-400 mt-1.5 pl-1 font-semibold" />
            </TextField>

            {/* Password */}
            <TextField
              className="w-full"
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 6)
                  return "Password must be at least 6 characters.";
                if (!/[A-Z]/.test(value))
                  return "Include at least one uppercase letter.";
                if (!/[a-z]/.test(value))
                  return "Include at least one lowercase letter.";
                if (!/[0-9]/.test(value)) return "Include at least one number.";
                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-semibold text-zinc-300">
                Password
              </Label>
              <InputGroup className="group rounded-xl bg-zinc-900/40 border border-zinc-800/80 focus-within:border-blue-500/50 focus-within:bg-zinc-950/70 transition-all duration-300 shadow-inner focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <InputGroup.Prefix className="pl-3.5">
                  <BiLockAlt className="size-4.5 text-zinc-500 group-focus-within:text-blue-400 transition-colors duration-200" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Create a strong password"
                  className="bg-transparent py-3 text-[15px] text-white font-medium tracking-wide focus:outline-none placeholder-zinc-600 w-full"
                  type={isVisible ? "text" : "password"}
                />
                <InputGroup.Suffix className="pr-1.5">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    className="text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <BsEye className="size-4" />
                    ) : (
                      <BsEyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError className="text-xs text-red-400 mt-1.5 pl-1 font-semibold" />
            </TextField>

            {/* Role based  */}
            <input type="hidden" name="role" value={selectedRole} />
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-zinc-300">
                Join as
              </label>
              <div className="grid grid-cols-2 gap-4 w-full">
                {/* Job Seeker Card */}
                <div
                  onClick={() => setSelectedRole("seeker")}
                  className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border cursor-pointer transition-all duration-300 select-none overflow-hidden ${
                    selectedRole === "seeker"
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      : "border-zinc-800/80 bg-zinc-900/20 hover:border-zinc-700/80 hover:bg-zinc-900/40"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl border transition-colors duration-300 ${
                      selectedRole === "seeker"
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400"
                    }`}
                  >
                    <BiUser className="size-6" />
                  </div>
                  <span className="mt-3 font-bold text-sm text-white">
                    Job Seeker
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-1 text-center font-medium leading-tight">
                    Looking for new opportunities
                  </span>
                  {selectedRole === "seeker" && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  )}
                </div>

                {/* Recruiter Card */}
                <div
                  onClick={() => setSelectedRole("recruiter")}
                  className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border cursor-pointer transition-all duration-300 select-none overflow-hidden ${
                    selectedRole === "recruiter"
                      ? "border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                      : "border-zinc-800/80 bg-zinc-900/20 hover:border-zinc-700/80 hover:bg-zinc-900/40"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl border transition-colors duration-300 ${
                      selectedRole === "recruiter"
                        ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400"
                    }`}
                  >
                    <BiBuilding className="size-6" />
                  </div>
                  <span className="mt-3 font-bold text-sm text-white">
                    Recruiter
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-1 text-center font-medium leading-tight">
                    Hiring top-tier talent
                  </span>
                  {selectedRole === "recruiter" && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="mt-4 w-full rounded-xl bg-linear-to-r from-blue-600 via-sky-600 to-orange-500 py-6 text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="relative my-6 max-w-sm mx-auto lg:mx-0 w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#0b0b0e] px-4 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Sign Up */}
          <Button
            onClick={signinWithGoogle}
            variant="outline"
            className="flex w-full  mx-auto lg:mx-0 items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/30 py-6 text-[15px] font-bold text-zinc-300 transition-all hover:bg-zinc-900/80 hover:border-zinc-700 shadow-sm hover:text-white cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            <FcGoogle className="size-5" />
            Sign Up with Google
          </Button>

          {/* Footer Link */}
          <p className="mt-8 text-center lg:text-left text-[14px] text-zinc-400 font-medium">
            Already have an account?{" "}
            <a
              href={`/signin?redirect=${redirectTo}`}
              className="font-bold text-orange-400 hover:text-orange-300 transition-colors ml-1 inline-flex items-center gap-1 group"
            >
              Sign In{" "}
              <FaArrowRight
                size={10}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
