// 'use client';

// import { useSession, signOut } from 'next-auth/react';
// import { Button } from "@/components/ui/button"

// export default function Page() {
//   const { data: session, status } = useSession();

//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (status === 'unauthenticated') {
//     return <p>Access Denied. Please sign in.</p>;
//   }

//   const fetchProtectedData = async () => {
//     if (session?.user?.accessToken) {
//         const res = await fetch(`http://localhost:3000/api/customers`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${session.user.accessToken}`
//             }
//         });
//         const data = await res.json();
//         console.log(data);
//     }
//   }

//   if (status === 'authenticated' && session?.user?.role === 'Customer') {
//     return <p>Access Denied: You do not have admin privileges.</p>;
//   }

//   if (status === 'authenticated' && (session?.user?.role === 'Admin' || session?.user?.role === 'Staff')) {
//     return (
//       <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//           <div className="bg-muted/50 aspect-video rounded-xl" />
//           <div className="bg-muted/50 aspect-video rounded-xl" />
//           <div className="bg-muted/50 aspect-video rounded-xl" />
//         </div>
//         <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
//           <div>
//             <h1>Welcome, {session?.user?.name}</h1>
//             <p>Your email is: {session?.user?.email}</p>

//             <Button onClick={() => fetchProtectedData()}>Fetch Protected Data</Button>
//             <Button
//               className='mt-4 ml-2 bg-red-600 hover:bg-red-800 text-white'
//               onClick={() => signOut({ callbackUrl: '/login' })}
//             >Sign Out</Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null; // Should not be reached if all cases are handled
// }

export default async function Page() {

  return (<main>
    <h1>Dashboards</h1>
  </main>)
}
