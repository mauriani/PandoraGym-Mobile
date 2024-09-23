export type StartExerciseDTO = {
  id: string
  exerciseTitle: string
  exerciseThumb: string
  exerciseVideo: string
  sets: number
  reps: number
  restTimeBetweenSets: number
  load: number
  workoutId: string
  number?: number
}
