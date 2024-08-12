// components/TypingAnimation.tsx
"use client";
import { Typewriter } from "react-simple-typewriter";
const TypingAnimation = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-center drop-shadow-lg   max-sm:text-3xl">
        <span className="text-blue-500">Efficiently Manage</span>{" "}
        <Typewriter
          words={[
            "Your Leave Requests",
            "Track Your Leave Status",
            "Access Leave History",
          ]}
          loop={Infinity}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl font-light text-center max-w-3xl mt-6 px-4">
        Manage your leave requests with ease and efficiency. Our Leave Management System helps you 
        <span className="text-blue-500 font-bold drop-shadow-lg"> submit leave applications</span>, 
        <span className="text-blue-500 font-bold drop-shadow-lg"> track approval statuses</span>, and 
        <span className="text-blue-500 font-bold drop-shadow-lg"> view your leave history</span> all in one place.
      </p>
    </div>
  );
};

export default TypingAnimation;