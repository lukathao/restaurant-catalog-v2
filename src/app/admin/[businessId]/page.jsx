import React from 'react'

const AdminBusiness = ({ params }) => {
  const { businessId } = params;
  console.log(businessId);
  return (
    <div>Individual Business Admin for {businessId}</div>
  )
}

export default AdminBusiness