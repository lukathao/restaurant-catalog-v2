import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import Image from "next/image";
import { Outfit } from "next/font/google";

const ProductFont = Outfit({
  weight: ['400'],
  subsets: ["latin"],
  style: "normal",
});


const ProductSections = ({ product, isMounted, key }) => {
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

  if (!product) {
    return null;
  }

  return (
    <>
      <div
        key={key}
        onClick={() => { setOpen(true); setDialogProduct(product) }}
        className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl relative"
      >
        <Image
          width={500}
          height={200}
          alt={product.name}
          src={product.image || "https://cdn.pixabay.com/photo/2015/09/13/21/13/dishes-938747_1280.jpg"}
        />
        <div className={`p-0 text-xl font-bold text-gray-800 ${ProductFont.className}`}>
          <h3 className="pl-5 float-left">
            {product.name}
          </h3>
          <h3 className="pr-5 float-right">
            {product.price}
          </h3>
        </div>
      </div >
      <ProductDialog product={dialogProduct} open={open} setOpen={setOpen} isMounted={isMounted} />
    </>
  )
}

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

export default ProductSections