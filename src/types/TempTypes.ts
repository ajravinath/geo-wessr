import type { GeoCity } from '@/composables/useRandomCityGeoDb';
import { AnswerResult } from '@/types/enums';

export type City = {
  country: string;
  name: string;
  lat: string;
  lng: string;
};

export interface Answer {
  city: GeoCity;
  temp: string;
  correct: AnswerResult;
  correctAnswer?: string;
}
