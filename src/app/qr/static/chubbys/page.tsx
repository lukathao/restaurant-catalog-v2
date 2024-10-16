"use client";

import React, { useState } from 'react';
import QRCode from 'qrcode';
import { useFormStatus } from 'react-dom';



const ChubbysQR = async () => {
  const host_url = process.env.HOST_URL
  const { pending } = useFormStatus();
  const [src, setSrc] = useState<string>('');
  const generateOne = async () => {
    const qrCodeDataUrl = await generate();
    setSrc(qrCodeDataUrl);
  }

  const generate = async () => {
    // const host_url = process.env.HOST_URL;
    const url = `${host_url}/static/chubbys`
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      width: 500,
    });
    return qrCodeDataUrl;
  }

  return (
    <>
      <div className='className=flex flex-row min-h-screen justify-center items-center'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black disabled:opacity-50 disabled:cursor-not-allowed"
          aria-disabled={pending}
          onClick={generateOne}
        >
          Generate One
        </button>
        <img src={src} />
      </div>
    </>
  )
}

export default ChubbysQR