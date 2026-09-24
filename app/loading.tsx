import { Dumbbell } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0e10]">
      <div className="flex flex-col items-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#25282e] border-t-[#c8ff00]" />

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#15171c]">
            <Dumbbell
              size={28}
              strokeWidth={2}
              className="text-[#c8ff00]"
            />
          </div>
        </div>

        <h2 className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-white">
          Loading FitLog
        </h2>

        <p className="mt-2 text-xs text-[#6f737d]">
          Preparing your workout library...
        </p>

        <div className="mt-5 flex gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c8ff00]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c8ff00] [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c8ff00] [animation-delay:300ms]" />
        </div>
      </div>
    </main>
  );
}