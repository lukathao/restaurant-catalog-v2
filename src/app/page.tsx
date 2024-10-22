import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen justify-center items-center">
      <div>
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-semibold">Foodie Cat</h1>
        <p>Welcome to Foodie Cat, short for foodie catalog</p>
        <Link href="/static/chubbys">Click here to see our digital menus</Link>
      </div>
    </main>
  );
}
