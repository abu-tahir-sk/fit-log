"use client";

import { toast } from "react-toastify";

type Props = {
  workoutName: string;
};

export default function AddToPlanButton({
  workoutName,
}: Props) {
  const handleAddToPlan = () => {
    toast.success(`${workoutName} added to today's plan!`);
  };

  return (
    <button
      type="button"
      onClick={handleAddToPlan}
      className="rounded-md bg-[#c8ff00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#b7ed00]"
    >
       Add to todays plan
    </button>
  );
}
