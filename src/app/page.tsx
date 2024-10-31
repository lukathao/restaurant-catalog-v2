import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="absolute top-10">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto"
        />
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-semibold">Foodie Cat</h1>
        </div>
        <p>Welcome to Foodie Cat, short for foodie catalog</p>
        <div className="flex items-center justify-center">
          <Link href="/business"
            className="underline text-blue-400 uppercase"
          >digital menus</Link>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/privacy-policy"
            className="underline text-blue-400 uppercase"
          >Privacy Policy</Link>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/about"
            className="underline text-blue-400 uppercase"
          >about</Link>
        </div>
      </div>
    </div>
  );
}
