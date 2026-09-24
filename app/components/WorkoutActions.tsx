"use client";

import { useContext } from "react";
import { PlanContext } from "../context/PlanContext";
import type { Workout } from "../types/workout";
import { toast } from "react-toastify";

export default function WorkoutActions({
  workout,
}: {
  workout: Workout;
}) {
  const { plan, setPlan, saved, setSaved } = useContext(PlanContext);

  const safePlan = Array.isArray(plan)
    ? plan.filter(
        (item): item is Workout =>
          !!item && typeof item === "object" && typeof item.id === "number"
      )
    : [];

  const safeSaved = Array.isArray(saved)
    ? saved.filter(
        (item): item is Workout =>
          !!item && typeof item === "object" && typeof item.id === "number"
      )
    : [];

  const isInPlan = safePlan.some((item) => item.id === workout.id);
  const isSaved = safeSaved.some((item) => item.id === workout.id);

  const addToPlan = () => {
    setPlan((currentPlan) => {
      const cleanPlan = Array.isArray(currentPlan)
        ? currentPlan.filter(
            (item): item is Workout =>
              !!item && typeof item === "object" && typeof item.id === "number"
          )
        : [];
      if (cleanPlan.some((item) => item.id === workout.id)) {
        return cleanPlan;
      }
      if (cleanPlan.length >= 5) {
        toast.error("Cap of five lifts reached for today!");
        return cleanPlan;
      }
      return [...cleanPlan, workout];
    });
    
    if (safePlan.length < 5) {
      toast.success(`${workout.name} added to today's plan!`);
    }
  };

  const saveForLater = () => {
    setSaved((currentSaved) => {
      const cleanSaved = Array.isArray(currentSaved)
        ? currentSaved.filter(
            (item): item is Workout =>
              !!item && typeof item === "object" && typeof item.id === "number"
          )
        : [];
      if (cleanSaved.some((item) => item.id === workout.id)) {
        return cleanSaved;
      }
      return [...cleanSaved, workout];
    });
    toast.success(`${workout.name} saved for later!`);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={addToPlan}
        disabled={isInPlan || plan.length >= 5}
        className="rounded-md bg-[#c8ff00] px-5 py-3 text-xs font-black uppercase text-[#0d0e10] transition hover:bg-[#b7ed00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isInPlan ? "Added to today's plan" : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={saveForLater}
        disabled={isSaved}
        className="rounded-md border border-[#383b42] px-5 py-3 text-xs font-black uppercase text-white transition hover:border-[#c8ff00] hover:text-[#c8ff00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}