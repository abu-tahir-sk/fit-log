import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#24272d] bg-[#0c0d10]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 px-5 py-7 sm:px-8 md:flex-row lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="text-[15px] font-bold tracking-[0.08em] text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-[14px] leading-5 text-[#777b85] md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}