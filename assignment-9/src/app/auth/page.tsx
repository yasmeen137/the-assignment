"use client";
import { useRouter } from "next/navigation"; 
import { useState } from "react";
import FormField from "@/components/ui/formFiled";
import useAuthStore from "@/hooks/useAuthStore";

const inputFieldsSignIn = [
  { id: "email", name: "email", type: "email", label: "Email" },
  { id: "password", name: "password", type: "password", label: "Password" },
];

const inputFieldsSignUp = [
  { id: "email", name: "email", type: "email", label: "Email" },
  { id: "password", name: "password", type: "password", label: "Password" },
  { id: "confirmPassword", name: "confirmPassword", type: "password", label: "Confirm Password" },
];

type FormData = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const AuthCard = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSignUp, setIsSignUp] = useState(false); 
  const router = useRouter();
  const { login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setMessage(result.message); 
        login(result.user);
        router.push("/forms");
      } else {
        const errorResult = await response.json();
        setError(errorResult.message); 
        setMessage(null);
      }
    } catch (error) {
      console.error("Sign-In failed:", error);
      setError("An error occurred. Please try again later.");
      setMessage(null);
    }
  };

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setMessage(null);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });
      
      if (response.ok) {
        const result = await response.json();
        setMessage(result.message); 
        setError(null);
        setIsSignUp(false);
      } else {
        const errorResult = await response.json();
        setError(errorResult.message); 
        setMessage(null);
      }
    } catch (error) {
      console.error("Sign-Up failed:", error);
      setError("An error occurred. Please try again later.");
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-purple-200">
      <div className="flex justify-center items-center flex-grow">
        <div className="w-96 p-6 shadow-lg bg-white rounded-lg">
          <div className="flex gap-x-2 justify-between mb-4">
            <button
              onClick={() => setIsSignUp(false)}
              className={`w-1/2 py-2 ${!isSignUp ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600"} rounded-md`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`w-1/2 py-2 ${isSignUp ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600"} rounded-md`}
            >
              Sign Up
            </button>
          </div>

          {isSignUp ? (
            <>
              <h2 className="text-xl font-semibold text-center">Sign Up</h2>
              <p className="text-center text-gray-500 mb-4">Create a new account</p>

              <form onSubmit={handleSubmitSignUp} className="space-y-4">
                <FormField
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
                {inputFieldsSignUp.map((field) => (
                  <FormField
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    label={field.label}
                    value={formData[field.name as keyof FormData] || ""}
                    onChange={handleChange}
                  />
                ))}
                <input
                  type="submit"
                  value="Sign Up"
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition cursor-pointer"
                />
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center">Sign In</h2>
              <p className="text-center text-gray-500 mb-4">Enter your email and password</p>

              <form onSubmit={handleSubmitSignIn} className="space-y-4">
                {inputFieldsSignIn.map((field) => (
                  <FormField
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    label={field.label}
                    value={formData[field.name as keyof FormData] || ""}
                    onChange={handleChange}
                  />
                ))}
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition cursor-pointer"
                />
              </form>
            </>
          )}

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {message && <p className="text-green-500 text-center mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;