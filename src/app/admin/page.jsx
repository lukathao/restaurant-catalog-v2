"use client";
import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import LoadingErrorComponent from "@/components/loader/LoadingErrorComponent";
import Image from "next/image";
import Link from "next/link"


const transformImages = (resProducts) => {
  resProducts.map((p) => {
    const splitUri = p.image.split('/upload/');
    const imageTransformationParams = '/upload/c_auto,g_center,w_500,h_300/';
    p.image = splitUri[0] + imageTransformationParams + splitUri[1];
  });
  return resProducts;
}

const EditProductButton = (productId) => {
  const router = useRouter();
  // TODO handle this
  const handleEdit = () => {
    // router.push(`/editProduct/${productId}`);
  };
  return (
    <Button
      onClick={handleEdit}
      variant="outline"
      size="icon"
      className="absolute top-2 right-2 bg-white hover:bg-gray-100"
    >
      <Edit className="h-4 w-4" />
    </Button>
  );
};

const AdminBusinessHome = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSubmit = async () => {
    if (isSearching) {
      return;
    }
    setIsSearching(true);
    setLoading(true);
    try {
      // TODO fix api call here to get all businesses
      const res = await axios.get('/api/business');
      if (res.status === 200 || res.status === 201) {
        setBusinesses(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);


  if (loading) {
    return <LoadingErrorComponent loading={true} error={null} />;
  }

  return (
    <div className="min-h-screen p-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          <Image
            width={100}
            height={100}
            alt="foodiecat logo"
            src="/logo.png"
          />
        </div>
        {(!businesses || businesses.length === 0) ? (
          <p className="text-center text-gray-600">No businesses found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {businesses.map((business) => (

              <div
                key={business._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl relative"
              >
                <Link href={`/admin/${business._id}`}>
                  <Image
                    width={500}
                    height={200}
                    alt={business.name}
                    src={business.logo || "/business_default.jpg"}
                  ></Image>
                  <div className="p-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1 pl-5 float-left">
                      {business.name}
                    </h3>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1 pr-5 float-right">
                      {business.owner}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBusinessHome;