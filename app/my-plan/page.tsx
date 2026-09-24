"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, X, ChevronDown, Check, Search } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { PlanContext } from "../context/PlanContext";
import type { Workout } from "../types/workout";
import { toast } from "react-toastify";

export default function MyPlanPage() {
  const { plan, setPlan, saved, setSaved } = useContext(PlanContext);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cleanPlan = plan.filter(
    (item): item is Workout =>
      item !== undefined && item !== null && typeof item.duration === "number"
  );
  
  const cleanSaved = saved.filter(
    (item): item is Workout => item !== undefined && item !== null
  );

  const minutes = cleanPlan.reduce(
    (total, workout) => total + workout.duration,
    0
  );
  const calories = cleanPlan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const removeWorkout = (id: number, name: string) => {
    if (activeTab === "plan") {
      setPlan(cleanPlan.filter((workout) => workout.id !== id));
    } else {
      setSaved(cleanSaved.filter((workout) => workout.id !== id));
    }
    toast.info(`${name} removed.`);
  };

  const markAsDone = (id: number, name: string) => {
    if (activeTab === "plan") {
      setPlan(cleanPlan.filter((workout) => workout.id !== id));
    } else {
      setSaved(cleanSaved.filter((workout) => workout.id !== id));
    }
    toast.success(`Awesome! ${name} marked as done. 💪`);
  };

  const currentList = (activeTab === "plan" ? cleanPlan : cleanSaved).sort(
    (a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }
      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    }
  );

  // Search filter logic
  const filteredList = currentList.filter((workout) => {
    const query = searchQuery.toLowerCase();
    return (
      workout.name.toLowerCase().includes(query) ||
      workout.muscleGroups.some((m) => m.toLowerCase().includes(query))
    );
  });

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-[#0d0e10] flex items-center justify-center">
        <p className="text-[#858994] text-sm uppercase tracking-widest font-bold">
          Loading workouts...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0e10] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6">
          <h1 className="text-[30px] font-black uppercase tracking-[-0.03em] text-white sm:text-[32px]">
            MY PLAN
          </h1>
          <p className="mt-2 text-[13px] text-[#8d919b]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
        
        <div className="rounded-2xl border border-[#24272e] bg-[#121419] px-6 py-7 sm:px-8">
          <div className="grid grid-cols-1 divide-y divide-[#24272e] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="pb-5 sm:px-5 sm:pb-0 sm:pl-0">
              <p className="text-[11px] text-[#858994]">Exercises</p>
              <p className="mt-1 text-[36px] font-black leading-none text-[#c8ff00]">
                {cleanPlan.length}
              </p>
            </div>
            <div className="py-5 sm:px-7 sm:py-0">
              <p className="text-[11px] text-[#858994]">Minutes</p>
              <p className="mt-1 text-[36px] font-black leading-none text-white">
                {minutes}
              </p>
            </div>
            <div className="pt-5 sm:px-7 sm:pt-0">
              <p className="text-[11px] text-[#858994]">Calories</p>
              <p className="mt-1 text-[36px] font-black leading-none text-white">
                {calories}
              </p>
            </div>
          </div>
        </div>
        
        {/* Actions Row: Tabs, Search, Sort */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex w-fit rounded-xl border border-[#24272e] bg-[#15171c] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`rounded-lg px-5 py-2 text-[12px] font-medium transition ${
                activeTab === "plan"
                  ? "bg-[#20242c] text-white"
                  : "text-[#7e828c] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-5 py-2 text-[12px] font-medium transition ${
                activeTab === "saved"
                  ? "bg-[#20242c] text-white"
                  : "text-[#7e828c] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search Bar */}
            <div className="relative">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#858994]"
              />
              <input
                type="text"
                placeholder="Search by name or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#30333b] bg-[#15171c] py-2 pl-9 pr-4 text-[12px] text-white outline-none placeholder:text-[#6a6d75] focus:border-[#c8ff00] sm:w-[250px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#858994]">Sort By</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-xl border border-[#30333b] bg-[#15171c] py-2 pl-4 pr-9 text-[12px] text-white outline-none"
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#858994]"
                />
              </div>
            </div>
          </div>
        </div>
        
        {filteredList.length === 0 ? (
          <div className="mt-5 flex min-h-[275px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#25282f] bg-[#0f1115] px-5 text-center">
            <h2 className="text-[19px] font-black uppercase text-white">
              NOTHING HERE YET
            </h2>
            <p className="mt-2 text-[12px] text-[#858994]">
              {searchQuery ? "No workouts found matching your search." : "Browse the library and add a lift to get today moving."}
            </p>
            {!searchQuery && (
              <Link
                href="/#library"
                className="mt-5 rounded-full bg-[#c8ff00] px-6 py-3 text-[11px] font-bold text-[#0d0e10]"
              >
                Go to workouts
              </Link>
            )}
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {filteredList.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#24272e] bg-[#15171c] p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl sm:w-36">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    unoptimized
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full bg-[#c8ff00] px-2.5 py-1 text-[9px] font-bold uppercase text-[#0d0e10]"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 text-[16px] font-black uppercase text-white">
                    {workout.name}
                  </h3>
                  <p className="mt-1 text-[12px] text-[#777b85]">
                    {workout.equipment}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-[#8e929c]">
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={13} />
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame size={13} />
                      {workout.caloriesBurned} kcal
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-lg border border-[#343740] px-4 py-2.5 text-[10px] font-bold uppercase text-white transition hover:border-[#c8ff00] hover:text-[#c8ff00]"
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    title="Mark as Done"
                    onClick={() => markAsDone(workout.id, workout.name)}
                    className="rounded-lg border border-[#343740] p-2.5 text-[#777b85] transition hover:border-[#c8ff00] hover:text-[#c8ff00]"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    type="button"
                    title="Remove"
                    onClick={() => removeWorkout(workout.id, workout.name)}
                    className="rounded-lg border border-[#343740] p-2.5 text-[#777b85] transition hover:border-red-400 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}