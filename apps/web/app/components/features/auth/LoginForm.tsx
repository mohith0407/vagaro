"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// Ensure react-icons is installed in apps/web
import { FaUser, FaLock, FaEnvelope, FaKey } from "react-icons/fa";
// Ensure these paths match the exports in packages/ui/package.json
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/input";
import { signUp, confirmSignUp } from "../../../actions";

type AuthState = "LOGIN" | "SIGNUP" | "CONFIRM";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>("LOGIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usernameForConfirm, setUsernameForConfirm] = useState("");

  async function handleLogin(formData: FormData) {
    setLoading(true); setError("");
    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) setError("Invalid credentials");
    else {
        if (onSuccess) onSuccess(); 
        router.push("/dashboard");
    }
  }

  async function handleSignUp(formData: FormData) {
    setLoading(true); setError("");
    const username = formData.get("username") as string;
    setUsernameForConfirm(username);
    const result = await signUp(null, formData);
    setLoading(false);
    if (result.success) setAuthState("CONFIRM");
    else setError(result.message);
  }

  async function handleConfirm(formData: FormData) {
    setLoading(true); setError("");
    formData.append("username", usernameForConfirm);
    const result = await confirmSignUp(null, formData);
    setLoading(false);
    if (result.success) setAuthState("LOGIN");
    else setError(result.message);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (authState === "LOGIN") await handleLogin(formData);
    else if (authState === "SIGNUP") await handleSignUp(formData);
    else await handleConfirm(formData);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-2">
          {authState === "LOGIN" && "Welcome Back"}
          {authState === "SIGNUP" && "Create Account"}
          {authState === "CONFIRM" && "Verify Email"}
        </h2>
        <p className="text-text-muted text-sm">
          {authState === "LOGIN" && "Enter your details to access your account"}
          {authState === "SIGNUP" && "Join the Royal Spin community today"}
          {authState === "CONFIRM" && "We sent a code to your email"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">{error}</p>}

        {authState === "CONFIRM" ? (
          <Input 
            name="code" 
            placeholder="Verification Code" 
            icon={FaKey} 
            required 
          />
        ) : (
          <>
            {authState === "SIGNUP" && (
                <Input name="name" placeholder="Full Name" icon={FaUser} required />
            )}
            <Input name="username" placeholder="Email / Username" icon={FaEnvelope} required />
            <Input name="password" type="password" placeholder="Password" icon={FaLock} required />
          </>
        )}

        <Button type="submit" fullWidth disabled={loading} className="mt-2">
          {loading ? "Processing..." : 
             authState === "LOGIN" ? "Sign In" : 
             authState === "SIGNUP" ? "Create Account" : "Verify"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-text-muted">
        {authState === "LOGIN" && (
          <p>Don't have an account? <button type="button" onClick={() => setAuthState("SIGNUP")} className="text-brand-accent hover:underline">Sign up</button></p>
        )}
        {authState === "SIGNUP" && (
          <p>Already have an account? <button type="button" onClick={() => setAuthState("LOGIN")} className="text-brand-accent hover:underline">Log in</button></p>
        )}
        {authState === "CONFIRM" && (
          <button type="button" onClick={() => setAuthState("SIGNUP")} className="text-text-muted hover:text-text-main underline">Back</button>
        )}
      </div>
    </div>
  );
}