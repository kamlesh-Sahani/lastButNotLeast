// "use client";
// import React, { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
// import { MdEmail } from "react-icons/md";
// import { generateOTP } from "@/utils/otp.utils";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState<"success" | "error" | "">("");
//   const router = useRouter();

//   const handleOtp = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/emails/approvalmail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           //   email,
//           //   name: "DBIT",
//           //   faculty: "Saad Nehmood",
//           //   course: "BCA",
//           //   subject: "Computer Organization",
//           //   department: "Computer Science",
//           //   semester: "3rd",
//           //   timing: "12:45 pm",
//           //   link: "this is your link",
//           email,
//           name: "DBIT",
//           role: "HOD",
//           faculty: "Saad Nehmood",
//           department: "Computer Science",

//           leaveType: "Medical Leave",
//           startDat: "15-08-2024",
//           endDate: "20-08-2024",
//           reason: "I need leave",
//           link: "this is your link",
//         }),
//       });

//       const data = await response.json();
//       if (response.ok && data.message === "Email sent successfully") {
//         setMessageType("success");
//         setMessage("Email sent successfully.");
//         router.push("/");
//       } else {
//         setMessageType("error");
//         setMessage(data.message || "Invalid EMAIL.");
//       }
//     } catch (error) {
//       setMessageType("error");
//       setMessage("An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <form onSubmit={handleOtp}>
//           <div>
//             <div className="relative">
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 pr-10"
//                 placeholder="saadmehmood@gmail.com"
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex justify-center py-5">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-400"
//             >
//               {loading ? "Sending OTP..." : "GET OTP"}
//             </button>
//           </div>
//           {message && (
//             <p
//               className={`text-center ${
//                 messageType === "success" ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
