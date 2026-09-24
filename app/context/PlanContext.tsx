"use client";

import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import type { Workout } from "../types/workout";

const sanitizeWorkoutList = (value: unknown): Workout[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (item): item is Workout =>
      !!item && typeof item === "object" && typeof item.id === "number"
  );
};

interface IPlanContext {
  plan: Workout[];
  setPlan: React.Dispatch<React.SetStateAction<Workout[]>>;
  saved: Workout[];
  setSaved: React.Dispatch<React.SetStateAction<Workout[]>>;
}

export const PlanContext = createContext<IPlanContext>({
  plan: [],
  setPlan: () => {},
  saved: [],
  setSaved: () => {},
});

const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    const loadData = () => {
      try {
        const storedPlan = localStorage.getItem("fitlog-plan");
        const storedSaved = localStorage.getItem("fitlog-saved");

        if (storedPlan) {
          setPlan(sanitizeWorkoutList(JSON.parse(storedPlan)));
        }
        if (storedSaved) {
          setSaved(sanitizeWorkoutList(JSON.parse(storedSaved)));
        }
      } catch {
        setPlan([]);
        setSaved([]);
      }
      setIsMounted(true);
    };

   
    const timeoutId = setTimeout(loadData, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, isMounted]);

  const sharedData = {
    plan,
    setPlan,
    saved,
    setSaved,
  };

  return (
    <PlanContext.Provider value={sharedData}>
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;