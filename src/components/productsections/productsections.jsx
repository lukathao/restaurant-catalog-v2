import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import Image from "next/image";

const ProductDialog = ({ product, open, setOpen, isMounted }) => {
  if (!isMounted || !product) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 mb-1 pl-1 float-left">
            {product.name} - ${product.price}
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


const ProductSections = ({ product, isMounted }) => {
  if (!product) {
    return null;
  }
  const [dialogProduct, setDialogProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const dialogProductInitial = {
    name: "",
    image: "",
    description: "",
    price: 0
  }

  useEffect(() => {
    setDialogProduct(dialogProductInitial);
  }, []);

  return (
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
        />
        <div className="p-0">
          <h3 className="text-l font-semibold text-gray-800 mb-1 pl-5 float-left">
            {product.name}
          </h3>
          <h3 className="text-l font-semibold text-gray-800 mb-1 pr-5 float-right">
            {product.price}
          </h3>
        </div>
      </div >
      <ProductDialog product={dialogProduct} open={open} setOpen={setOpen} isMounted={isMounted} />
    </>
  )
}

export default ProductSections