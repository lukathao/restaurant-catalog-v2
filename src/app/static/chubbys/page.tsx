import React from 'react'
import Image from 'next/image'

const Chubbys = () => {
  const imgWidth = "2400";
  const imgHeight = "5000";

  return (
    
    <>
      <div>
        <Image src="/menu1.jpg" alt="menu1" width={imgWidth}  height={imgHeight} />
        <Image src="/menu2.jpg" alt="menu2" width={imgWidth}  height={imgHeight} />
        <Image src="/menu3.jpg" alt="menu3" width={imgWidth}  height={imgHeight} />
        <Image src="/menu4.jpg" alt="menu4" width={imgWidth}  height={imgHeight} />
      </div>
    </>
    
  )
}

export default Chubbys