export type Plan = {
  id: string
}

export type User = {
  name: string
  avatarUrl: string
}

export type Student = {
  id: string
  plan: Plan
}

// eslint-disable-next-line import/export
export type IPersonalList = {
  id: string
  rating: number
  description: string
  experience: string
  specialization: string
  qualifications: string
  user: User
  student: Student[]
}
