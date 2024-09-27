export enum Level {
  Avancado = 'AVANCADO',
  Iniciante = 'INICIANTE',
  Intermediario = 'INTERMEDIARIO',
}

export type User = {
  name: string
  avatarUrl: string
}

export type Personal = {
  user: User
}

export type Workout = {
  id: string
  name: string
  description: string
  thumbnail: string
  personalId: null | string
  level: Level
  personal?: Personal
}

export type ItemplateDTO = {
  workoutAdm: Workout[]
  workoutsByPersonal: { [key: string]: Workout[] }
}
