import React, { Component } from 'react';
import Image from 'next/image';

export default function Overlay() {
  return (
    <Image src="/background.svg"
      width={0}
      height={0}
      alt="background image"
      sizes='100vw'
      className="d-none d-md-block w-full h-screen" />
  );
}

//position absolute, zindex 0,