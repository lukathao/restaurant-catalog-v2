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
    try {
      const splitUri = p.image.split('/upload/');
      const imageTransformationParams = '/upload/c_auto,g_center,w_500,h_300/';
      p.image = splitUri[0] + imageTransformationParams + splitUri[1];
    } catch (error) {
      console.log(error);
    }
  });
  return resProducts;
}

const EditProductButton = ({ businessId, productId }) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`products/${productId}`);
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleSubmit = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };
    handleSubmit();
  }, [businessId]);

  if (loading) {
    return <LoadingErrorComponent loading={true} />;
  }

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
                className="rounded-xl shadow-lg border-2 border-black overflow-hidden transition duration-300 hover:shadow-xl relative"
              >
                <div className="p-0">
                  <h3 className="text-l font-semibold text-gray-800 mb-1 pl-5">
                    {product.name} - {product.price}
                  </h3>
                </div>
                {
                  product.image ?
                    <Image
                      width={500}
                      height={200}
                      alt={product.name}
                      src={product.image}
                    />
                    :
                    <div className="p-2 m-2">
                      {product.description}
                    </div>
                }
                <EditProductButton productId={product._id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAdminHome;