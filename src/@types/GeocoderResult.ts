export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface GeocoderGeometry {
  location: LatLngLiteral;
}

export interface GeocoderResult {
  formatted_address: string;
  geometry: GeocoderGeometry;
}