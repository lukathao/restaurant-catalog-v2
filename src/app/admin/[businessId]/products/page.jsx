"use client";
import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import LoadingErrorComponent from "@/components/loader/LoadingErrorComponent";
import Image from "next/image";


const transformImages = (resProducts) => {
  resProducts.map((p) => {
    const splitUri = p.image.split('/upload/');
    const imageTransformationParams = '/upload/c_auto,g_center,w_500,h_300/';
    p.image = splitUri[0] + imageTransformationParams + splitUri[1];
  });
  return resProducts;
}

const EditProductButton = ({ productId }) => {
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

const ProductAdminHome = ({ params }) => {
  const { businessId } = use(params);
  const [business, setBusiness] = useState("");
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (isSearching) {
      return;
    }
    setIsSearching(true);
    setLoading(true);
    // setError(null);
    try {
      const res = await axios.post('/api/product/products', { businessId });
      if (res.status === 200 || res.status === 201) {
        const data = transformImages(res.data);
        setProducts(res.data);
        setBusiness(res.data[0].business.name)
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
    return <LoadingErrorComponent loading={true} />;
  }
  // if (error) {
  //   return <LoadingErrorComponent error={error} />;
  // }

  return (
    <div className="min-h-screen p-8 z-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-black z-10">
          {business}
        </h1>
        {(!products || products.length === 0) ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl relative"
              >
                <Image
                  width={500}
                  height={200}
                  alt={product.name}
                  src={product.image || "https://cdn.pixabay.com/photo/2015/09/13/21/13/dishes-938747_1280.jpg"}
                ></Image>
                <EditProductButton productId={product._id} />
                <div className="p-0">
                  <h3 className="text-l font-semibold text-gray-800 mb-1 pl-5 float-left">
                    {product.name}
                  </h3>
                  <h3 className="text-l font-semibold text-gray-800 mb-1 pr-5 float-right">
                    {product.price}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAdminHome;