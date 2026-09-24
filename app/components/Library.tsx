import type { Workout } from "../types/workout";
import LibraryClient from "./LibraryClient";

async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return response.json();
}

export default async function Library() {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="px-3 py-10 sm:px-4 sm:py-14 lg:px-6 lg:py-16"
    >
      <div className="mx-auto max-w-[1400px]">
       
        <LibraryClient workouts={workouts} />
      </div>
    </section>
  );
}