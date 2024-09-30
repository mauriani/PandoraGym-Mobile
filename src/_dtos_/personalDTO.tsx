export type Plan = {
  id: string
  name: string
  description: string
  price: number
  personalId: string
}

export type User = {
  name: string
  avatarUrl: string
}

export type IPersonalDTO = {
  description: string
  plan: Plan[]
  rating: number
  user: User
  student: []
}
