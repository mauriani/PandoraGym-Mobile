enum Day {
  Dom = 'Dom',
  Seg = 'Seg',
  Ter = 'Ter',
  Qua = 'Qua',
  Qui = 'Qui',
  Sex = 'Sex',
  Sab = 'Sab',
}

export type IExerciseConfig = {
  id: string
  workoutId: string
  exerciseTitle: string
  exerciseVideo: string
  exerciseThumb: string
  sets: number
  reps: number
  load: number
  restTimeBetweenSets: number
}

export type ITraining = {
  id: string
  name: string
  thumbnail: string
  description: string
  exerciseConfig: IExerciseConfig[]
  weekDays: Day[]
}
