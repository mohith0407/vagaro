
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { Card } from "@repo/ui/components/card";
// import { Input } from "@repo/ui/components/input";
// import { Button } from "@repo/ui/components/button";
// import { FaLock, FaUser } from "react-icons/fa";
// // import { AuthHeader } from "@repo/ui/components/molecules/AuthHeader";


// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
    
//     const formData = new FormData(e.currentTarget);
//     const res = await signIn("credentials", {
//       username: formData.get("username"),
//       password: formData.get("password"),
//       redirect: false,
//     });

//     setLoading(false);
//     if (res?.error) setError("Invalid credentials. Try again.");
//     else router.push("/");
//   };

//   return (
//     <div className="min-h-screen bg-dark flex">
      
//       {/* Left Side - Graphic (Hidden on Mobile) */}
//       <div className="hidden lg:flex w-1/2 bg-dark-card relative items-center justify-center overflow-hidden border-r border-dark-light">
//         {/* Abstract Neon Glows */}
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]"></div>
//         <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
        
//         <div className="relative z-10 text-center p-12">
//           <h1 className="text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-primary to-emerald-600 mb-6">
//             ROYAL<br/>SPIN
//           </h1>
//           <p className="text-gray-text text-xl max-w-md mx-auto">
//             Experience the next generation of sports betting and casino games.
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
//         <div className="w-full max-w-md space-y-8">
          
//           {/* Mobile Logo */}
//           <div className="lg:hidden text-center mb-8">
//             <h1 className="text-4xl font-black italic text-primary">ROYAL SPIN</h1>
//           </div>

//           <div className="text-center lg:text-left">
//             <h2 className="text-2xl font-bold text-text-main">Welcome Back</h2>
//             <p className="text-gray-text mt-2">Enter your details to access your account.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6 mt-8">
//             {error && (
//               <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm font-bold text-center">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-4">
//               <Input 
//                 name="username" 
//                 placeholder="Email or Username" 
//                 icon={FaUser} 
//                 required 
//               />
//               <Input 
//                 name="password" 
//                 type="password" 
//                 placeholder="Password" 
//                 icon={FaLock} 
//                 required 
//               />
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2 cursor-pointer group">
//                 <input type="checkbox" className="accent-primary w-4 h-4 rounded" />
//                 <span className="text-gray-text group-hover:text-text-main transition">Remember me</span>
//               </label>
//               <Link href="/forgot-password" className="text-primary hover:text-primary-dark font-medium transition">
//                 Forgot Password?
//               </Link>
//             </div>

//             <Button type="submit" fullWidth isLoading={loading} size="lg" className="mt-4">
//               Sign In
//             </Button>
//           </form>

//           <div className="text-center text-sm text-gray-text mt-8">
//             Don't have an account?{" "}
//             <Link href="/signup" className="text-primary font-bold hover:underline">
//               Create Account
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#111418] text-white font-sans selection:bg-[#0CE68A] selection:text-black">
      
      {/* --- Left Side: Hero / Brand (Hidden on Mobile) --- */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-center items-center overflow-hidden bg-[#1A1D21] border-r border-[#2A2E33]">
        {/* Abstract Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0CE68A]/20 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[#0CE68A]/10 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 text-center p-12">
          <h1 className="text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#0CE68A] to-[#0ABF70] mb-6 drop-shadow-2xl">
            ROYAL<br/>SPIN
          </h1>
          <p className="text-gray-400 text-xl max-w-md mx-auto font-medium leading-relaxed">
            The next generation of sports betting and casino games. <br/>
            <span className="text-white">Live. Fast. Secure.</span>
          </p>
        </div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-10">
          
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-5xl font-black italic text-[#0CE68A] tracking-tighter">ROYAL SPIN</h1>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500">Enter your details to access your account.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center animate-pulse">
                {error}
              </div>
            )}

            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email or Username</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#0CE68A] transition-colors">
                  <FaUser size={18} />
                </div>
                <input
                  name="username"
                  type="text"
                  placeholder="name@example.com"
                  required
                  className="w-full bg-[#1A1D21] border-2 border-[#2A2E33] rounded-xl px-4 py-4 pl-12
                           text-white placeholder:text-gray-600 outline-none transition-all duration-200
                           focus:border-[#0CE68A] focus:shadow-[0_0_0_4px_rgba(12,230,138,0.1)]"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#0CE68A] transition-colors">
                  <FaLock size={18} />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1A1D21] border-2 border-[#2A2E33] rounded-xl px-4 py-4 pl-12
                           text-white placeholder:text-gray-600 outline-none transition-all duration-200
                           focus:border-[#0CE68A] focus:shadow-[0_0_0_4px_rgba(12,230,138,0.1)]"
                />
              </div>
            </div>

            {/* Remember & Forgot Row */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-[#2A2E33] bg-[#1A1D21] checked:border-[#0CE68A] checked:bg-[#0CE68A] transition-all" />
                  <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-black transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-gray-500 group-hover:text-white transition-colors font-medium">Remember me</span>
              </label>
              <Link href="#" className="text-[#0CE68A] hover:text-[#0ABF70] font-bold transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0CE68A] hover:bg-[#0ABF70] text-[#111418] font-bold text-lg rounded-full py-4 px-8
                       shadow-[0_0_20px_rgba(12,230,138,0.3)] hover:shadow-[0_0_30px_rgba(12,230,138,0.5)]
                       transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#0CE68A] font-bold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}