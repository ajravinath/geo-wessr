import { AnswerResult } from '@/types/enums'

export type City = {
  country: string
  name: string
  lat: string
  lng: string
}

export interface Answer {
  city: City
  temp: string
  correct: AnswerResult
  correctAnswer?: string
}
