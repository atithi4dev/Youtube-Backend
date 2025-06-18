import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function signupUser({
  fullName,
  userName,
  email,
  password,
  avatar,
  coverImage,
}) {
  try {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);

    const response = await axios.post(`${BASE_URL}/users/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data?.success) {
      throw new Error(response.data.message || "Server responded with failure");
    }

    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}



// Login Route
export async function loginUser({
  email,
  userName,
  password
}) {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {email, userName, password}, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })

      if(!response.data?.success){
        throw new Error(response.data.message || "Server responded with failure");
      }

      return response.data

    } catch (error) {
      console.log("Login Failed", error);
      throw error
    }
}