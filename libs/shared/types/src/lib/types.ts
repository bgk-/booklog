export interface Book {
  _id: string | object
  author: string
  title: string
  date: Date
  isComplete: boolean
  rating: number
  notes: string
}
