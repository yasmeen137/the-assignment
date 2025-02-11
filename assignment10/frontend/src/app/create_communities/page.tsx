"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";



// Form Validation Schema
const formSchema = z.object({
  name: z.string().min(3, "Community name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  photo: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file instanceof File && file.type.startsWith("image/")),
      "Only image files are allowed"
    ),
});

export default function CreateCommunityPage() {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      photo: undefined,
    },
  });

  const { control, handleSubmit, formState: { errors }, setValue } = formMethods;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setValue("photo", file, { shouldValidate: true });
    }
  };

  const handleCreateCommunity = async (data: { name: string; description: string; photo?: any }) => {
    if (!token) {
      setSubmissionError("You must be logged in to create a community.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.photo) {
      formData.append("photo", data.photo);
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/communities`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to create community");
      }

      router.push("/communities");
      router.refresh();
    } catch (error) {
      console.error("Submission error:", error);
      if (error instanceof Error) {
        setSubmissionError(error.message);
      } else {
        setSubmissionError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black text-cyan-400 overflow-hidden">
      
      <div className="relative z-10 p-8 max-w-lg w-full bg-gray-900/80 backdrop-blur-sm rounded-xl 
        border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-pink-400 
          bg-clip-text text-transparent">
          Create Community
        </h2>
        {submissionError && (
          <div className="text-red-400 text-center mb-4">{submissionError}</div>
        )}
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(handleCreateCommunity)} className="space-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyan-300">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the community name"
                      {...field}
                      className="w-full bg-gray-800 border-2 border-cyan-400/30 text-cyan-300 
                        placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-0"
                    />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyan-300">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the community description"
                      {...field}
                      className="w-full bg-gray-800 border-2 border-cyan-400/30 text-cyan-300 
                        placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-0"
                    />
                  </FormControl>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="photo"
              render={() => (
                <FormItem>
                  <FormLabel className="text-cyan-300">Upload Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className=" file:text-white file:border-none file:rounded-lg 
                        file:px-4 file:py-2 file:mr-4 text-cyan-300"
                    />
                  </FormControl>
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="mt-2 h-24 w-24 object-cover rounded-lg border-2 border-cyan-400/30"
                    />
                  )}
                  <FormMessage>{errors.photo?.message?.toString()}</FormMessage>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 
                text-white font-semibold p-3 rounded-lg transition-all duration-300 
                shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(244,114,182,0.3)]"
              disabled={formMethods.formState.isSubmitting}
            >
              {formMethods.formState.isSubmitting ? "Creating..." : "Create Community"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}