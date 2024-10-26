import React, { use } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';

// TODO edit business page
// generate QR code button here
// link to products page
const AdminBusiness = ({ params }) => {
  const { businessId } = use(params);
  console.log(businessId);
  return (
    <>
      <div>Individual Business Admin for {businessId}</div>

      <div
        className="bg-foodOrange w-fit px-2 py-2 text-white text-xl font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <Link
          href={`/admin/${businessId}/products`}
        >
          Edit Products
        </Link>
      </div>


    </>

  )
}

export default AdminBusiness