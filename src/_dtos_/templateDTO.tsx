export type ItrainingTemplate = {
  id: string
  title: string
  level: string
  tumbnail: string
}

export type ItemplateDTO = {
  id: string
  title: string
  training: ItrainingTemplate[]
}
