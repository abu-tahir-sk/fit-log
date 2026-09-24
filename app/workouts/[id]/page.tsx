import { notFound } from "next/navigation";
import Link from "next/link";
import WorkoutActions from "@/app/components/WorkoutActions";

type Workout = {
  id: string | number;
  name: string;
  description: string;
  image?: string;
  category?: string;
  categories?: string[];
  equipment?: string;
  difficulty?: string;
  sets?: number;
  reps?: string | number;
  duration?: number;
  calories?: number;
  rating?: number;
  instructions?: string[];
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const response = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.data ?? data;
  } catch {
    return null;
  }
}

export default async function WorkoutDetailsPage({ params }: Props) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const categories = workout.categories ?? (workout.category ? [workout.category] : []);
  
  // Mapping for WorkoutActions component
  const contextWorkout = {
    id: Number(workout.id),
    name: workout.name,
    image: workout.image || "",
    muscleGroups: categories,
    equipment: workout.equipment || "None",
    duration: workout.duration || 0,
    caloriesBurned: workout.calories || 0,
    rating: workout.rating || 0,
  };

  return (
    <main className="min-h-screen bg-[#0d0f12] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <Link
          href="/#library"
          className="mb-5 inline-flex text-sm text-gray-400 transition hover:text-[#c8ff00]"
        >
          ← Back to workouts
        </Link>
        
        {/* Main Details */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_1fr]">
          {/* LEFT IMAGE */}
          <div className="overflow-hidden rounded-xl border border-[#272a2f] bg-[#15181e]">
            {workout.image ? (
              <img
                src={workout.image}
                alt={workout.name}
                className="h-full min-h-[420px] w-full object-cover"
              />
            ) : (
              <div className="flex min-h-[420px] items-center justify-center text-gray-500">
                No image available
              </div>
            )}
          </div>
          
          {/* RIGHT CONTENT */}
          <div className="flex flex-col">
            <h1 className="font-sans text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              {workout.description}
            </p>
            
            {/* Categories */}
            {categories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-[#c8ff00] px-3 py-1 text-[10px] font-bold text-black uppercase"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
            
            {/* INFO BOX */}
            <div className="mt-4 overflow-hidden rounded-xl border border-[#252931] bg-[#15181e]">
              <InfoRow label="EQUIPMENT" value={workout.equipment ?? "-"} />
              <InfoRow label="DIFFICULTY" value={workout.difficulty ?? "-"} />
              <InfoRow label="SETS" value={workout.sets?.toString() ?? "-"} />
              <InfoRow label="REPS" value={workout.reps?.toString() ?? "-"} />
              <InfoRow
                label="DURATION"
                value={workout.duration ? `${workout.duration} min` : "-"}
              />
              <InfoRow
                label="CALORIES"
                value={workout.calories ? `${workout.calories} kcal` : "-"}
              />
              <InfoRow
                label="RATING"
                value={workout.rating?.toString() ?? "-"}
                last
              />
            </div>
            
            {/* INSTRUCTIONS */}
            {workout.instructions && workout.instructions.length > 0 && (
              <div className="mt-5">
                <h2 className="text-sm font-bold uppercase">Instructions</h2>
                <ol className="mt-3 space-y-3">
                  {workout.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-xs leading-5 text-gray-400"
                    >
                      <span className="shrink-0">{index + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            
            {/* BUTTONS */}
            <div className="mt-5">
              <WorkoutActions workout={contextWorkout} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* INFO ROW */
function InfoRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        !last ? "border-b border-[#252931]" : ""
      }`}
    >
      <span className="text-[9px] font-medium tracking-wider text-gray-500">
        {label}
      </span>
      <span className="text-xs text-gray-300">{value}</span>
    </div>
  );
}