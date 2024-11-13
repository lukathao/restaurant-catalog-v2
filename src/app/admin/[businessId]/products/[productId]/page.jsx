"use client";
import React, { useState, useEffect, use } from "react";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const EditProduct = ({ params }) => {
  const { productId } = use(params);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "No product loaded",
    image: null,
    price: 0,
    productType: "",
    _id: "",
    featured: false,
  });


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post('/api/product/edit', { productId });
        const fetchedProduct = res.data;
        setProduct(fetchedProduct);
        setImageUrl(fetchedProduct.image);
      } catch (error) {
        console.log(error);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFeatured = (e) => {
    const { checked } = e.target;
    if (checked) {
      product.featured = true;
    } else {
      product.featured = false;
    }
  }

  const handleUpload = (result) => {
    if (result.event === "success") {
      const newUrl = result.info.secure_url;
      setImageUrl(newUrl);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImageUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...product,
        image: imageUrl,
      };
      console.log(productData);
      const productRes = await axios.put(
        `/api/product/${productId}`,
        productData
      );
      if (productRes.status === 200) {
        console.log("success returned");
        console.log(productRes);
        router.push(`/admin/${productRes.data.business}/products/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/product/${productId}`);
      if (res.status === 200) {
        router.push(`/admin/${res.data.business}/products/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-foodOrange py-6">
          <h1 className="text-center text-white text-3xl font-extrabold">
            Edit {product.name}
          </h1>
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
                placeholder="Enter name"
                className="w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <CldUploadButton
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  options={{ multiple: true }}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                  onSuccess={handleUpload}
                >
                </CldUploadButton>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {imageUrl &&
                <div className="relative group">
                  <Image
                    height={500}
                    width={500}
                    className="h-24 w-full object-cover rounded-md"
                    src={imageUrl}
                    alt={`Uploaded image`}
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md"
                    onClick={(e) => handleRemoveImage(e)}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="productType"
              id="productType"
              value={product.productType}
              onChange={handleChange}
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select a type</option>
              <option value="entree">Entree</option>
              <option value="appetizer">Appetizer</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
              <option value="party">Party</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured
            </label>
            <input
              type="checkbox"
              defaultChecked={product.featured}
              onChange={handleFeatured}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
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

          <div className="flex justify-between">
            <Button
              variant="foodiecat"
              type="submit"
              className="px-8 py-3 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
