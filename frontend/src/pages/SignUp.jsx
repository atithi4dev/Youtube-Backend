import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { signupUser } from "../services/api/userapi";
import { Link } from "react-router-dom";

const schema = yup.object({
  fullName: yup.string().required("Full name is required"),
  userName: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6)
    .required("Password must be at least 6 characters"),
  avatar: yup.mixed().required("Avatar image is required"),
  coverImage: yup.mixed().required("Cover image is required"),
});

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      const res = await signupUser({
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
        password: data.password,
        avatar: data.avatar[0],
        coverImage: data.coverImage[0],
      });

      if (res.success) {
        toast.success("Signup successful!");
        reset();
      } else {
        toast.error(res.message || "Signup failed due to server error.");
      }
    } catch (err) {
      toast.error(err?.message || "Signup failed!");
      toast.error(err?.response?.data?.message || "Signup failed!");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (

  <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-gray-300 overflow-y-auto max-h-[calc(100vh-80px)]"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        <input
          {...register("fullName")}
          placeholder="Full Name"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

        <input
          {...register("userName")}
          placeholder="Username"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}

        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Avatar</label>
          <input
            {...register("avatar")}
            type="file"
            accept="image/*"
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
          />
          {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <input
            {...register("coverImage")}
            type="file"
            accept="image/*"
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
          />
          {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage.message}</p>}
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-md shadow-md"
      >
        {isSubmitting ? "Creating Account..." : "Sign Up"}
      </button>

      <div className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-purple-600 hover:underline font-medium">
          Sign In
        </Link>
      </div>
    </form>
  </div>

  );
}
