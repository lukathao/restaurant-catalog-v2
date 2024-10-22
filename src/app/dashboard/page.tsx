"use client";
import React from 'react';
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div className='min-h-screen py-20 '>
      <div className='w-full max-w-2xl grid place-item mx-auto py-40 gap-6 bg-scale-50'>
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="mx-auto mb-4"
        />
        {session && (<span className='text-2xl tracking-normal py-10 font-semibold'>{session.user?.name}</span>)}
        <Button variant="destructive" className="bg-foodOrange text-white rounded-lg px-3 py-3 uppercase">
          Logout
        </Button>
      </div>

    </div>
  )
}

export default Dashboard