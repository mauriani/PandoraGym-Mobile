export type User = {
  name: string
  avatarUrl: string
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
}

// export type IPersonalList = {
//   data: Datum[]
// }
