import process from 'process';
import { type Ref, ref, watchEffect, onMounted } from 'vue';

export interface GeoCity {
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  regionWdId: string;
  type: string;
  wikiDataId: string;
}
interface GeoMetadata {
  currentOffset: number;
  totalCount: number;
}

interface GeoCityResponse {
  data: Array<GeoCity>;
  metadata: GeoMetadata;
}

const getGeoDbPlacesUrl = (offset = 0) =>
  `${import.meta.env.VITE_GEO_DB_URL}/v1/geo/places?hateoasMode=false&limit=1&offset=${offset}`;

export function useRandomCityGeoDb() {
  const city: Ref<Nullable<GeoCity>> = ref(null);
  const error: Ref<Nullable<string>> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const total: Ref<number> = ref(0);

  const getTotalCount = async () => {
    try {
      const metadataResponse = await fetch(getGeoDbPlacesUrl());
      const metadataResult: GeoCityResponse = await metadataResponse.json();
      const { totalCount } = metadataResult.metadata;
      total.value = totalCount;
    } catch (err_) {
      const message = (err_ as Error).message;
      console.error(message);
      error.value = message;
    }
  };
  const getCity = async () => {
    try {
      const randomIndex = Math.floor(Math.random() * total.value);
      const cityResponse = await fetch(getGeoDbPlacesUrl(randomIndex));
      const cityResult = await cityResponse.json();
      const [currentCity] = cityResult.data;
      city.value = currentCity;
    } catch (err_) {
      const message = (err_ as Error).message;
      console.error(message);
      error.value = message;
    }
  };

  onMounted(() => {
    getTotalCount();
  });

  watchEffect(() => {
    if (city.value === null) {
      loading.value = true;
      getCity();
    } else {
      loading.value = false;
    }
  });

  return { city, error, loading };
}
