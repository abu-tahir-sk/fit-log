import Link from "next/link";
import Image from "next/image";


export default function Hero() {
  return (
    <section className="px-3 py-3 sm:px-4 sm:py-5 lg:px-6">
      <div className="mx-auto flex max-w-[1400px] flex-col overflow-hidden rounded-2xl border border-[#24272d] bg-[#15171c] lg:min-h-[410px] lg:flex-row lg:items-center">

        {/* LEFT CONTENT */}
        <div className="w-full px-6 py-9 sm:px-10 sm:py-12 lg:w-[58%] lg:px-12 lg:py-10">

          {/* Logo */}
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2a2d33] bg-[#0d0e10] p-1.5 shadow-[0_0_0_1px_rgba(200,255,0,0.08)]">
              <Image
                src="/logo.png"
                alt="FitLog logo"
                width={32}
                height={32}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <span className="text-[11px] font-bold tracking-[0.16em] text-white sm:text-[12px]">
              FITLOG
            </span>
          </div>

         
          <p className="mb-4 text-[10px] font-bold tracking-[0.14em] text-[#c8ff00] sm:mb-5 sm:text-[11px]">
            WORKOUT LIBRARY
          </p>

          
          <h1 className="max-w-[650px] text-[40px] font-black uppercase leading-[0.94] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[60px]">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          {/* Description */}   <p className="mt-5 max-w-[570px] text-[14px] leading-6 text-[#969aa4] sm:text-[15px]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Browse Button */}
          <Link
            href="#library"
            className="mt-6 inline-flex items-center gap-3 rounded-md bg-[#c8ff00] px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-[#0d0e10] transition hover:bg-[#b7ed00] sm:text-[12px]"
          >
           

            Browse Workouts
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[250px] w-full sm:h-[320px] lg:h-[360px] lg:flex-1">
          <Image
            src="/banner.png"
            alt="Workout"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 42vw"
            className="object-contain object-center lg:object-right"
          />
        </div>
      </div>
    </section>
  );
}