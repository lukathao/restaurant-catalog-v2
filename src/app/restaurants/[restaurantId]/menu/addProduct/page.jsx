"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const Create = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // TODO get business ID from URL parameter
  const businessId = 1;

  const [imageUrls, setImageUrls] = useState([

  ]);

  const [product, setProduct] = useState({
    // Get MenuItem fields
    name: "eggrolls",
    description: "nice and delicious",
    image: [],
    price: 4.99,
    restaurant: businessId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState, [name]: value
    }));
  };

  const handleUpload = (result) => {
    if (result.event === "success") {
      const newUrl = result.info.secure_url;
      setImageUrls((prevUrls) => [...prevUrls, newUrl]);
    }
  }


  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImageUrls((prevUrls) => prevUrls.filter((url) => url !== urlToRemove));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUrls.length > 0) {
      try {
        const productData = {
          ...product, images: imageUrls
        };
        const productRes = await axios.post("/api/products", productData);
        if (productRes.status === 200 || productRes.status === 201) {
          router.push("/")
        }
      } catch (error) {
        console.log(error);

      }
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-foodOrange py-6">
          <span>
            <h1 className="text-center text-white text-3xl font-extrabold">
              NEW ITEM
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
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <CldUploadButton
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  options={{ multiple: true }}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                  onSuccessAction={handleUpload}
                >
                  {imageUrls.length > 0 ? "Add More Images" : "Upload Images"}
                </CldUploadButton>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <Image
                    height={500}
                    width={500}
                    className="h-24 w-full object-cover rounded-md"
                    src={url}
                    alt={`Uploaded image ${index + 1}`}
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
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              name="description"
              id="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Detailed product description"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Price
              </label>
              <Input
                type="number"
                name="price"
                id="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter sale price"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="foodiecat"
              type="submit"
              className="px-8 py-3 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
