import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import Image from "next/image";
import { Outfit } from "next/font/google";

const ProductFont = Outfit({
  weight: ['400'],
  subsets: ["latin"],
  style: "normal",
});


const ProductSections = ({ product, isMounted, productId }) => {
  const [dialogProduct, setDialogProduct] = useState(null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const dialogProductInitial = {
      name: "",
      image: "",
      description: "",
      price: 0
    }
    setDialogProduct(dialogProductInitial);
  }, []);

  if (!product) {
    return null;
  }

  return (
    <>
      <div
        key={productId}
        onClick={() => { setOpen(true); setDialogProduct(product) }}
        className="rounded-xl shadow-lg border-2 border-black overflow-hidden transition duration-300 hover:shadow-xl relative my-2"
      >
        <div className={`p-0 text-xl font-bold text-gray-800 ${ProductFont.className}`}>
          <h3 className="pl-5">
            {product.name} - {product.price}
          </h3>
        </div>
        {product.image ?
          <Image
            width={500}
            height={200}
            alt={product.name}
            src={product.image}
          />
          :
          <div className='p-2 m-2'>
            {product.description}
          </div>
        }
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
      <DialogContent className='bg-slate-200 p-0 m-0'>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 mb-1 pl-1">
            {product.name} - ${product.price}
          </DialogTitle>
          <DialogDescription>
            {
              product.image &&
              <Image
                src={product.image}
                alt={product.name}
                width={700}
                height={700}
                className="w-screen"
              />
            }
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