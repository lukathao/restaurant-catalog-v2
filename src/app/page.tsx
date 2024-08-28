import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Restaurants</h1>
        <Link href="/static/chubbys">Chubby&apos;s Asian Fusion Cuisine</Link>
      </div>
    </main>
  );
}
