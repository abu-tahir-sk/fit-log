import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-[#0d0e10] px-4 text-center text-white">
      <h1 className="text-7xl font-bold text-[#ccff00]">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/workouts"
        className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#b8e600]"
      >
        Back to Workouts
      </Link>
    </main>
  );
}