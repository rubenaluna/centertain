export interface Point {
  latitude: number
  longitude: number
}

export interface GeocodingResponse {
  osm_id: string
  name: string
  display_name: string
  lat: string
  lon: string
}
