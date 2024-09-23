export type ITrainingHistory = {
  id: string
  studentId: string
  workoutId: string
  executionDate: string
  executionTime: string
  weight: string
  sets: string
  reps: string
  restTime: string
  thumbnail: string
  exerciseTitle: string
  timeTotalWorkout: String
  workout: {
    name: string
  }
}
