"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "../types/workout";

export default function LibraryClient({ workouts }: { workouts: Workout[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkouts = workouts.filter((workout) => {
    const query = searchQuery.toLowerCase();
    return (
      workout.name.toLowerCase().includes(query) ||
      workout.muscleGroups.some((m) => m.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[36px] font-black uppercase leading-none tracking-[-0.03em] text-white sm:text-[44px] lg:text-[48px]">
            THE LIBRARY
          </h2>
          <p className="mt-2 text-[14px] text-[#969aa4] sm:text-[15px]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-[280px]">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#858994]"
          />
          <input
            type="text"
            placeholder="Search workouts or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#24272d] bg-[#15171c] py-2.5 pl-10 pr-4 text-[13px] text-white outline-none placeholder:text-[#6a6d75] transition focus:border-[#c8ff00]"
          />
        </div>
      </div>

      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#25282f] bg-[#0f1115] px-5 text-center">
          <p className="text-[14px] text-[#858994]">
            No workouts found matching {searchQuery}.
          </p>
        </div>
      )}
    </>
  );
}