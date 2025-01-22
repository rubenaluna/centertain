import type { GeocodingResponse } from '@/models/geo'
import axios from 'axios'

export const getGeocodingSearch = async (input: string) =>
  await axios.get<GeocodingResponse[]>('https://nominatim.openstreetmap.org/search', {
    params: {
      q: input,
      format: 'json',
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
