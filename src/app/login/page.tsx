"use client";
import { Button, Spinner } from "flowbite-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { removeUser, setUser } from "@/lib/strore/features/user/userSlice";
import {useDispatch} from 'react-redux'
import { AppDispatch } from "@/lib/strore/store";
const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading,setIsLoading] =  useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   try {
    setIsLoading(true);
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/employee/login`,{email,password},{withCredentials:true});
    if(data.success){

      dispatch(setUser({user:data.employee,role:data.employee.role}));
      toast.success(data?.message);
      
      router.push("/user");
    }
    setIsLoading(false);
    } catch (error: any) {
      dispatch(removeUser());
      console.log(error.response?.data.message,"loginerror 2");
      toast.error(error.response?.data.message || "Something went wrong");
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">
          Login
        </h2>
        <form className="space-y-6" onSubmit={loginHandler} method="post">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <div className="text-blue-500">
              <Link href="/forgotpassword/OTP/">
                Forgot Password?
              </Link>
            </div>
          {isLoading ? (
            <Button>
              <Spinner aria-label="Spinner button example" size="sm" />
              <span className="pl-3">loading...</span>
            </Button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
