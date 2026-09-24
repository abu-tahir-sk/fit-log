"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "../types/workout";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#282b31] bg-[#15171c] transition duration-300 hover:-translate-y-1 hover:border-[#3a3e46]"
    >
      <div className="relative h-[230px] w-full overflow-hidden bg-[#101216] sm:h-[220px] lg:h-[190px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#c8ff00] px-3 py-1 text-[11px] font-bold uppercase text-[#0d0e10]"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-[19px] font-black uppercase leading-tight text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-[13px] text-[#8e929c]">
          {workout.equipment}
        </p>

        <div className="my-4 h-px bg-[#24272d]" />

        <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#969aa4]">
          <span className="flex items-center gap-1.5">
            <Clock3 size={15} strokeWidth={1.7} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <Flame size={15} strokeWidth={1.7} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <Star size={15} strokeWidth={1.7} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}