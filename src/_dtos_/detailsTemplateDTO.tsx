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
  name?: string
  avatarUrl?: string
}

export type Plan = {
  id: string
  name: string
  description: string[]
  price: number
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
  planId?: string // ID do plano necessário para acessar este treino
  plan?: Plan // Informações do plano, se aplicável
  isExclusive?: boolean // Se o treino é exclusivo para assinantes
  level?: 'INICIANTE' | 'INTERMEDIARIO' | 'AVANCADO'
}

export type IDetailsTemplate = {
  data: Data
}
