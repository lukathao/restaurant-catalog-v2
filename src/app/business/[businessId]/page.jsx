"use client";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import LoadingErrorComponent from "@/components/loader/LoadingErrorComponent";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";

const ProductDialog = ({ product, open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="text-l font-semibold text-gray-800 mb-1 pl-1 float-left">
              {product.name} - ${product.price}
            </div>
          </DialogTitle>
          <DialogDescription>
            <Image
              src={product.image}
              alt={product.name}
              width={700}
              height={700}
              className="w-screen"
            />
            <div>
              {product.description}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const transformImages = (resProducts) => {
  resProducts.map((p) => {
    const splitUri = p.image.split('/upload/');
    const imageTransformationParams = '/upload/c_auto,g_center,w_500,h_300/';
    p.image = splitUri[0] + imageTransformationParams + splitUri[1];
  });
  return resProducts;
}

const BusinessProducts = ({ params }) => {
  const dialogProductInitial = {
    name: "",
    image: "",
    description: "",
    price: 0
  }

  const { businessId } = use(params);
  const [business, setBusiness] = useState("");
  const [dialogProduct, setDialogProduct] = useState(dialogProductInitial);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);



  const handleSubmit = async () => {
    if (isSearching) {
      return;
    }
    setIsSearching(true);
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
              <>
                <div
                  key={product._id}
                  onClick={() => { setOpen(true); setDialogProduct(product) }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl relative"
                >
                  <Image
                    width={500}
                    height={200}
                    alt={product.name}
                    src={product.image || "https://cdn.pixabay.com/photo/2015/09/13/21/13/dishes-938747_1280.jpg"}
                  ></Image>
                  <div className="p-0">
                    <h3 className="text-l font-semibold text-gray-800 mb-1 pl-5 float-left">
                      {product.name}
                    </h3>
                    <h3 className="text-l font-semibold text-gray-800 mb-1 pr-5 float-right">
                      {product.price}
                    </h3>
                  </div>
                </div >
                <ProductDialog product={dialogProduct} open={open} setOpen={setOpen} />

              </>
            ))}
          </div>
        )}
      </div>
    </div >
  );
};

export default BusinessProducts;