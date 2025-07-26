export interface ISchedulingDTO {
  id: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled'
  personalId: string
  studentId: string
  createdAt: string
}

export interface ICreateSchedulingDTO {
  personalId: string
  date: string
  time: string
}