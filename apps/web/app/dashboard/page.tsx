// // // apps/web/src/app/dashboard/page.tsx
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@repo/auth"; // Import shared config
// // import { redirect } from "next/navigation";
// // import { SignOutButton } from "../components/SignOutButton"; // Re-using the button we made earlier

// // export default async function DashboardPage() {
// //   // 1. Fetch Session on Server
// //   const session = await getServerSession(authOptions);

// //   // 2. Protect the Route
// //   // If no session exists, kick them back to the login page
// //   if (!session) {
// //     redirect("/");
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col">
// //       {/* --- Top Navigation Bar --- */}
// //       <header className="bg-white shadow-sm border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
// //           <div className="flex items-center gap-2">
// //             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
// //               B
// //             </div>
// //             <span className="font-bold text-xl text-gray-800">BettingApp</span>
// //           </div>
          
// //           <div className="flex items-center gap-4">
// //             <div className="text-right hidden sm:block">
// //               <p className="text-sm font-medium text-gray-900">{session.user?.name || "User"}</p>
// //               <p className="text-xs text-gray-500">{session.user?.email}</p>
// //             </div>
// //             <SignOutButton />
// //           </div>
// //         </div>
// //       </header>

// //       {/* --- Main Content --- */}
// //       <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
// //         {/* Welcome Section */}
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
// //           <p className="mt-1 text-gray-500">Overview of your betting activity.</p>
// //         </div>

// //         {/* Stats Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           {/* Card 1 */}
// //           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// //             <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
// //             <p className="text-2xl font-bold text-gray-900 mt-2">$1,250.00</p>
// //             <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full mt-2 inline-block">
// //               +12% this week
// //             </span>
// //           </div>
          
// //           {/* Card 2 */}
// //           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// //             <h3 className="text-sm font-medium text-gray-500">Active Bets</h3>
// //             <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
// //             <span className="text-xs text-gray-500 mt-2 inline-block">
// //               Next result in 2 hours
// //             </span>
// //           </div>

// //           {/* Card 3 */}
// //           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// //             <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
// //             <div className="flex items-center mt-2 gap-2">
// //               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
// //               <p className="text-lg font-semibold text-gray-900">Verified</p>
// //             </div>
// //             {/* <p className="text-xs text-gray-400 mt-1">ID: {session.user?.id?.slice(0, 8)}...</p> */}
// //           </div>
// //         </div>

// //         {/* Recent Activity Section */}
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
// //           <div className="px-6 py-4 border-b border-gray-100">
// //             <h3 className="font-semibold text-gray-800">Recent Activity</h3>
// //           </div>
// //           <div className="p-6 text-center text-gray-500 py-12">
// //             No bets placed yet.
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// // apps/web/src/app/dashboard/page.tsx
// "use client"; // We switch to Client Component to use Hooks

// import { redirect } from "next/navigation";
// import { useUser } from "../../hooks/useUser"; // Use the hook we just made
// import { SignOutButton } from "../components/SignOutButton";

// export default function DashboardPage() {
//   const { dbUser, loading, session } = useUser();

//   // If loading or not logged in yet
//   if (loading) {
//     return <div className="p-10">Loading your wallet...</div>;
//   }

//   // Protection (Optional here if Middleware handles it)
//   if (!session) {
//     redirect("/");
//   }
// console.log("DB User:", dbUser);
// console.log("Session User:", session.user);
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
//           <div className="font-bold text-xl text-gray-800">BettingApp</div>
          
//           <div className="flex items-center gap-4">
//             <div className="text-right">
//               {/* Show Data from Postgres DB */}
//               <p className="text-sm font-medium text-gray-900">
//                  {dbUser?.name || session.user?.name}
//               </p>
//               <p className="text-sm font-medium text-gray-900">
//                  {dbUser?.cognitoId || session.user?.id}
//               </p>
              
//               <p className="text-xs text-green-600 font-bold">
//                  {/* Show Paper Money from DB */}
//                  ₹{dbUser?.paperBalance?.toFixed(2) || "0.00"}
//               </p>
              
//             </div>
//             <SignOutButton />
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//         <div className="bg-white p-6 rounded-lg shadow">
//            <p>Welcome to the betting arena!</p>
//            {/* You can add the MatchCard components here later */}
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { useUser } from "../../hooks/useUser";
// UPDATED: Cleaner imports
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { BottomNav } from "@repo/ui/bottomNav";
import { Header } from "../components/Header";
import { FaBolt, FaTrophy, FaGift, FaDice } from "react-icons/fa";

export default function DashboardPage() {
  const { dbUser, loading } = useUser();

  if (loading) return <div className="min-h-screen bg-dark-bg flex items-center justify-center text-brand-primary">Loading Royal Spin...</div>;

  return (
    <div className="min-h-screen bg-dark-bg pb-24">
      <Header user={dbUser} />

      <main className="px-4 pt-6 max-w-7xl mx-auto space-y-8">
        
        {/* --- Hero Banner --- */}
        <Card gradient className="p-6 relative overflow-hidden">
          <div className="relative z-10 max-w-[70%]">
            <h2 className="text-xl font-bold text-text-main mb-1">Claim Your Welcome Offer</h2>
            <p className="text-text-muted text-xs mb-4">Up to <span className="text-brand-accent font-bold">$99,000</span> in Casino Bonuses!</p>
            <Button size="sm">Join Now</Button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -right-4 -bottom-10 w-32 h-32 bg-brand-primary/20 blur-2xl rounded-full"></div>
        </Card>

        {/* --- VIP Club Section --- */}
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold text-text-main">VIP Club</h3>
          <button className="text-xs text-text-muted hover:text-brand-accent">See all &gt;</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 hover:border-brand-primary transition cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-3">
              <FaDice />
            </div>
            <h4 className="font-bold text-sm mb-1">Casino</h4>
            <p className="text-[10px] text-text-muted mb-3">Slots, Live Casino & more</p>
            <Button size="sm" fullWidth variant="secondary">Play</Button>
          </Card>

          <Card className="p-4 hover:border-brand-primary transition cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
              <FaBolt />
            </div>
            <h4 className="font-bold text-sm mb-1">Sports</h4>
            <p className="text-[10px] text-text-muted mb-3">Bet on Live Events</p>
            <Button size="sm" fullWidth variant="secondary">Bet</Button>
          </Card>
        </div>

        {/* --- Special Offers (Right Image in screenshot) --- */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-brand-accent">
              <FaGift />
              <h3 className="text-sm font-bold">Special Offers & Bonuses</h3>
           </div>

           <Card className="p-4 flex flex-col gap-3">
              <div className="flex gap-3">
                 <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center">
                    <FaTrophy />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">Spin for Free Every Day</h4>
                    <p className="text-[10px] text-text-muted">Claim it every 24 hours!</p>
                 </div>
              </div>
              <div className="bg-dark-bg rounded-lg p-2 flex justify-center gap-4 text-sm font-mono text-text-muted">
                 <span>22</span>:<span>56</span>:<span>20</span>
              </div>
              <Button fullWidth>Spin Win</Button>
           </Card>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}