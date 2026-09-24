# FitLog

- live link site - https://fit-log-two-alpha.vercel.app/

FitLog is a dark, no-nonsense gym companion app. It allows users to browse a library of intense workouts, view detailed instructions, and log their daily routines into a personalized plan.

## Technologies Used
- Next.js 15 (App Router)
- React (Hooks, Context API)
- Tailwind CSS
- Lucide React (Icons)
- React Toastify (Notifications)

## 5 Key Features
1. **Dynamic Workout Library:** Fetches and displays a responsive grid of exercises from an external API.
2. **Personalized Planning:** Users can add up to 5 lifts to their "Today's Plan" or save them in the "Saved" tab.
3. **Local Storage Persistence:** Plan and saved items survive page reloads utilizing React Context and Local Storage.
4. **Interactive Dashboard:** Live calculation of total minutes, calories burned, and total exercises in the plan.
5. **Advanced Sorting:** Sort planned or saved workouts seamlessly by Duration, Calories Burned, or Rating.