export type ExerciseConfig = {
  id: string
  exerciseTitle: string
  exerciseThumb: string
  exerciseVideo: string
  sets: number
  reps: number
  restTimeBetweenSets: number
  load: number
  workoutId: string
  createdAt: Date
  updatedAt: Date
}

export type Personal = {
  id: string
  presentationVideo: string
}

export type Data = {
  exerciseConfig: ExerciseConfig[]
  personal: Personal
  totalDuration: number
  totalCalories: string
  averageDuration: number
  averageCalories: string
  description: string
  thumbnail: string
}

export type IDetailsTemplate = {
  data: Data
}
