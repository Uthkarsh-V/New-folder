import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 w-full">
      <h1 className="text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">Local Treasures</h1>
      <p className="text-xl text-neutral-600 mb-12 text-center max-w-2xl">
        The ultimate marketplace connecting buyers directly to sellers of globally renowned, locally famous traditional products. Get authentic goods directly from the source.
      </p>

      <div className="flex gap-4">
        <Link href="/discover" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-600/20">
          I'm a Buyer
        </Link>
        <Link href="/seller" className="px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 font-bold rounded-xl transition shadow-sm">
          I'm a Seller
        </Link>
      </div>
    </main>
  );
}