"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, X, ChevronDown, Check, Star } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { PlanContext } from "../context/PlanContext";
import type { Workout } from "../types/workout";
import { toast } from "react-toastify";

export default function MyPlanPage() {
  const { plan, setPlan, saved, setSaved } = useContext(PlanContext);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [isMounted, setIsMounted] = useState(false);

  // Load state asynchronously to bypass synchronous setState warning
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
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
      toast.success(`Awesome! ${name} marked as done. 💪`);
    }
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
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-[32px] font-black uppercase tracking-tight text-white sm:text-[36px]">
            MY PLAN
          </h1>
          <p className="mt-1 text-[14px] text-[#858994]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
        
      
        <div className="rounded-2xl border border-[#24272e] bg-[#121419] px-6 py-7 sm:px-8">
          <div className="grid grid-cols-1 gap-6 divide-y divide-[#24272e] sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-y-0">
            <div className="pb-2 sm:px-5 sm:pb-0 sm:pl-0">
              <p className="text-[13px] text-[#858994]">Exercises</p>
              <p className="mt-2 text-[40px] font-black leading-none text-[#c8ff00]">
                {cleanPlan.length}
              </p>
            </div>
            <div className="py-4 sm:px-8 sm:py-0">
              <p className="text-[13px] text-[#858994]">Minutes</p>
              <p className="mt-2 text-[40px] font-black leading-none text-white">
                {minutes}
              </p>
            </div>
            <div className="pt-4 sm:px-8 sm:pt-0">
              <p className="text-[13px] text-[#858994]">Calories</p>
              <p className="mt-2 text-[40px] font-black leading-none text-white">
                {calories}
              </p>
            </div>
          </div>
        </div>
        
       
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit rounded-xl border border-[#24272e] bg-[#121419] p-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`rounded-lg px-6 py-2.5 text-[13px] font-medium transition ${
                activeTab === "plan"
                  ? "bg-[#1f2229] text-white"
                  : "text-[#7e828c] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-6 py-2.5 text-[13px] font-medium transition ${
                activeTab === "saved"
                  ? "bg-[#1f2229] text-white"
                  : "text-[#7e828c] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#858994]">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-[#24272e] bg-[#121419] py-2.5 pl-4 pr-10 text-[13px] text-white outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#858994]"
              />
            </div>
          </div>
        </div>
        
        
        {currentList.length === 0 ? (
          <div className="mt-6 flex min-h-[275px] flex-col items-center justify-center rounded-2xl border border-[#24272e] bg-[#121419] px-5 text-center">
            <h2 className="text-[19px] font-black uppercase text-white">
              NOTHING HERE YET
            </h2>
            <p className="mt-2 text-[13px] text-[#858994]">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/#library"
              className="mt-6 rounded-full bg-[#c8ff00] px-6 py-3 text-[12px] font-bold text-[#0d0e10]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {currentList.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#24272e] bg-[#121419] p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                  <div className="relative h-[85px] w-full shrink-0 overflow-hidden rounded-xl sm:w-[150px]">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      unoptimized
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[18px] font-black uppercase tracking-tight text-white">
                      {workout.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-[#858994]">
                      {workout.equipment}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-[12px] font-medium text-[#a5a6ad]">
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} className="text-[#c8ff00]" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame size={14} className="text-[#c8ff00]" />
                        {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star size={14} className="text-yellow-400" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>
                
               
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-full border border-[#343740] px-5 py-2.5 text-[12px] font-medium text-white transition hover:bg-[#1f2229]"
                  >
                    View Details
                  </Link>
                  
                  {activeTab === "plan" && (
                    <button
                      type="button"
                      title="Mark as Done"
                      onClick={() => markAsDone(workout.id, workout.name)}
                      className="flex items-center gap-2 rounded-full bg-[#c8ff00] px-5 py-2.5 text-[12px] font-bold text-[#0d0e10] transition hover:bg-[#b7ed00]"
                    >
                      <Check size={16} strokeWidth={3} /> Mark as Done
                    </button>
                  )}
                  
                  <button
                    type="button"
                    title="Remove"
                    onClick={() => removeWorkout(workout.id, workout.name)}
                    className="p-2 text-[#777b85] transition hover:text-red-400"
                  >
                    <X size={20} />
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