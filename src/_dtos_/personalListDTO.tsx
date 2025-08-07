export type Plan = {
  id: string
}

export type Student = {
  id: string
  plan: Plan
}

// DTO original (mantido para compatibilidade)
export type IPersonalList = {
  id: string
  rating: number
  description: string
  experience: string
  specialization: string
  qualifications: string
  name: string
  avatarUrl: string
  student?: Student[] // Tornando opcional para evitar erros
}

// Novo DTO que reflete a estrutura da API
export type IPersonalTrainer = {
  id: string
  name: string
  email: string
  phone: string
  avatar_url: string
  description: string
  experience: string
  specialization: string
  qualifications: string
  rating: number
  review_count: number
  video_url: string
}
