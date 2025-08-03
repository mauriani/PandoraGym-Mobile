export type StartExerciseDTO = {
  id: string
  name: string
  thumbnail: string
  videoUrl: string
  sets: number
  reps: number
  restTimeBetweenSets: number
  load: number
  workoutId: string
  currentWorkoutNumber: number
}
