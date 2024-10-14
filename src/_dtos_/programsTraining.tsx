export enum Level {
  Avancado = 'AVANCADO',
  Iniciante = 'INICIANTE',
  Intermediario = 'INTERMEDIARIO',
}

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

export type ProgramsTrainingDTO = {
  id: string
  name: string
  description: string
  thumbnail: string
  personalId: null
  level: Level
  exerciseConfig: ExerciseConfig[]
}
