export type Plan = {
  id: string
  name: string
  description: []
  price: number
  personalId: string
}

export type IPersonalDTO = {
  id: string
  description: string
  plan: Plan[]
  rating: number
  name: string
  avatarUrl: string
  student: []
}
