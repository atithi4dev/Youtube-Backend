import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import {loginUser} from '../services/api/userapi'
import { Link } from "react-router-dom";

const schema = yup.object({
     email: yup.string().email().required("Email is required"),
     userName: yup.string().required("Username is required"),
     password: yup.string().min(6).required("Password must be at least 6 characters")
})

const LoginForm = () => {
     
const {
     register,
     handleSubmit,
     formState: { errors }, 
     reset,
} = useForm({
     resolver: yupResolver(schema)
});

const [isSubmitting, setIsSubmitting] = useState(false);

const onSubmit = async(data) => {
     try {
          const res = await loginUser({
               email: data.email,
               userName: data.userName,
               password: data.password
          });
          if(res.success){
               toast.success("Login successful!");
               reset();
          }else{
               toast.error(res.message || "Login failed due to server error.")
          }
     } catch (error) {
          toast.error(error?.message || "Login Failed")
          toast.error(error?.response?.data?.message || "Login Failed")
     }finally{
          setIsSubmitting(false);
     }
}

  return (
   

      <div className="w-full  min-h-screen  bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-300 animate-fade-in"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Sign In to Your Account
          </h2>

          {/* User Name */}
          <div className="flex flex-col gap-1">
            <input
              {...register("userName")}
              placeholder="User Name"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 mt-4">
            <input
              {...register("email")}
              placeholder="Email"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 mt-4">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 transition text-white font-semibold py-2 rounded-md shadow-md"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-red-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
  );
}

export default LoginForm
