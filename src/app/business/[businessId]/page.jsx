"use client";
import React, { useState, useEffect, use, useReducer } from "react";
import axios from "axios";
import LoadingErrorComponent from "@/components/loader/LoadingErrorComponent";
import ProductSections from "@/components/productsections/productsections";
import { Pattaya, Lexend_Zetta } from "next/font/google";

const HeaderFont = Pattaya({
  weight: ['400'],
  subsets: ["latin"],
  style: "normal",
});

const BusinessFont = Lexend_Zetta({
  weight: ['400'],
  subsets: ["latin"],
  style: "normal",
});

const transformImages = (resProducts) => {
  resProducts.map((p) => {
    const splitUri = p.image.split('/upload/');
    const imageTransformationParams = '/upload/c_auto,g_center,w_500,h_300/';
    p.image = splitUri[0] + imageTransformationParams + splitUri[1];
  });
  return resProducts;
}

const BusinessProducts = ({ params }) => {
  const { businessId } = use(params);
  const [business, setBusiness] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  // TODO look into useReduce
  const [appetizers, setAppetizers] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [entrees, setEntrees] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [party, setParty] = useState([]);
  const [others, setOthers] = useState([]);

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
        setBusiness(res.data[0].business.name);
        sortProductsByType(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
      setLoading(false);
    }
  };

  const sortProductsByType = (products) => {
    let appetizers, entrees, desserts, drinks, party, others = [];
    appetizers = products.filter(product => product.productType === "appetizer");
    entrees = products.filter(product => product.productType === "entree");
    desserts = products.filter(product => product.productType === "dessert");
    drinks = products.filter(product => product.productType === "drink");
    party = products.filter(product => product.productType === "party");
    others = products.filter(product => product.productType === "other");
    setAppetizers(appetizers);
    setEntrees(entrees);
    setDesserts(desserts);
    setDrinks(drinks);
    setParty(party);
    setOthers(others);
  }

  useEffect(() => {
    handleSubmit();
    setIsMounted(true);
  }, []);

  if (loading) {
    return <LoadingErrorComponent loading={true} />;
  }

  return (
    <div className="min-h-screen p-8 z-10">
      <h1 className={`text-4xl font-bold mb-4 text-center text-black uppercase ${BusinessFont.className}`}>
        {business}
      </h1>
      <hr className="w-1/2 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      <div key={0} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {(appetizers && appetizers.length > 0) ? (
          <div key="appetizers">
            <div className={`text-4xl font-bold flex items-center justify-center ${HeaderFont.className}`}>Appetizers</div>
            {appetizers.map((product) => (<ProductSections key={product._id} product={product} isMounted={isMounted} />))}
          </div>
        ) : null}
        {(entrees && entrees.length > 0) ? (
          <div key="entrees">
            <div className={`text-4xl font-bold flex items-center justify-center ${HeaderFont.className}`}>Entrees</div>
            {entrees.map((product) => (<ProductSections key={product._id} product={product} isMounted={isMounted} />))}
          </div>
        ) : null}
        {(desserts && desserts.length > 0) ? (
          <div key="desserts">
            <div className={`text-4xl font-bold flex items-center justify-center ${HeaderFont.className}`}>Desserts</div>
            {desserts.map((product) => (<ProductSections key={product._id} product={product} isMounted={isMounted} />))}
          </div>
        ) : null}
        {(drinks && drinks.length > 0) ? (
          <div key="drinks">
            <div className={`text-4xl font-bold flex items-center justify-center ${HeaderFont.className}`}>Drinks</div>
            {drinks.map((product) => (<ProductSections key={product._id} product={product} isMounted={isMounted} />))}
          </div>
        ) : null}
        {(others && others.length > 0) ? (
          <div key="others">
            <div className={`text-4xl font-bold flex items-center justify-center ${HeaderFont.className}`}>Others</div>
            {others.map((product) => (<ProductSections key={product._id} product={product} isMounted={isMounted} />))}
          </div>
        ) : null}
        {(party && party.length > 0) ? (
          <div key="party">
            <div className={`text-4xl font-bold flex items-center justify-center ${HeaderFont.className}`}>Party Platters</div>
            {party.map((product) => (<ProductSections key={product._id} product={product} isMounted={isMounted} />))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BusinessProducts;