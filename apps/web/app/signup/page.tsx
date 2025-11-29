"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { Button, Input, Card } from "@repo/ui";
import { Button } from "@repo/ui/components/atoms/button";
import { Input } from "@repo/ui/components/atoms/input";
import { Card } from "@repo/ui/components/molecules/card";
import { signUp, confirmSignUp } from "../actions"; // Ensure your server actions are imported
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";

export default function SignupPage() {
  const [step, setStep] = useState<"SIGNUP" | "CONFIRM">("SIGNUP");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const user = formData.get("username") as string;
    setUsername(user);

    const res = await signUp(null, formData);
    setLoading(false);
    
    if (res.success) setStep("CONFIRM");
    else setError(res.message);
  };

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("username", username); // Attach saved username

    const res = await confirmSignUp(null, formData);
    setLoading(false);

    if (res.success) {
      window.location.href = "/login"; // Redirect to login on success
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-bg-app flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {step === "SIGNUP" ? "Create Account" : "Verify Email"}
          </h1>
          <p className="text-text-secondary text-sm">
            {step === "SIGNUP" ? "Join the action today." : `Code sent to ${username}`}
          </p>
        </div>

        {error && <div className="mb-6 p-3 rounded-lg bg-danger/10 text-danger text-sm font-bold text-center">{error}</div>}

        {step === "SIGNUP" ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <Input name="name" placeholder="Full Name" leftIcon={<FaUser />} required />
            <Input name="username" placeholder="Email Address" leftIcon={<FaEnvelope />} required />
            <Input name="password" type="password" placeholder="Password" leftIcon={<FaLock />} required />
            <Button type="submit" fullWidth isLoading={loading} size="lg">Create Account</Button>
          </form>
        ) : (
          <form onSubmit={handleConfirm} className="space-y-4">
            <Input name="code" placeholder="Verification Code" leftIcon={<FaKey />} required />
            <Button type="submit" fullWidth isLoading={loading} size="lg">Verify & Login</Button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-400 font-bold hover:underline">
            Log In
          </Link>
        </div>
      </Card>
    </div>
  );
}