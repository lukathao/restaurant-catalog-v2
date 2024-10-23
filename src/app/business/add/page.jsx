"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const CreateBusiness = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.pixabay.com/photo/2022/02/10/05/45/lantern-7004643_1280.jpg"
  );

  const [business, setBusiness] = useState({
    name: "Business Name",
    owner: "Business Owner",
    logo: "https://cdn.pixabay.com/photo/2022/02/10/05/45/lantern-7004643_1280.jpg",
    email: "test@gmail.com",
    phone: "715-222-8888"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusiness((prevState) => ({
      ...prevState, [name]: value
    }));
  };

  const handleImageUpload = (result) => {
    if (result.event === "success") {
      const newUrl = result.info.secure_url;
      setImageUrl(newUrl);
    }
  }

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImageUrl((prevUrl) => prevUrl.filter((url) => url !== urlToRemove));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const businessData = {
        ...business, logo: imageUrl
      };
      const businessRes = await axios.post("/api/business", businessData);
      if (businessRes.status === 200 || businessRes.status === 201) {
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-foodOrange py-6">
          <span>
            <h1 className="text-center text-white text-3xl font-extrabold">
              NEW BUSINESS
            </h1>
          </span>

        </div>
        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                value={business.name}
                onChange={handleChange}
                placeholder="Enter business name"
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner
              </label>
              <Input
                type="text"
                name="owner"
                id="owner"
                value={business.owner}
                onChange={handleChange}
                placeholder="Enter owner"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="text"
                name="email"
                id="email"
                value={business.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={business.phone}
                onChange={handleChange}
                placeholder="Enter phone"
                className="w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <CldUploadButton
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  options={{ multiple: false }}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                  onSuccessAction={handleImageUpload}
                >
                </CldUploadButton>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {
                <div className="relative group">
                  <Image
                    height={500}
                    width={500}
                    className="h-24 w-full object-cover rounded-md"
                    src={imageUrl}
                    alt={"Uploaded image"}
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md"
                    onClick={(e) => handleRemoveImage(e, url)}
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="foodiecat"
              type="submit"
              className="px-8 py-3 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create
            </Button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default CreateBusiness;
