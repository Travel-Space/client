export interface LatLng {
  equals(other: LatLng): boolean;
  lat(): number;
  lng(): number;
}

export interface GeocoderGeometry {
  location: LatLng;
}

export interface GeocoderResult {
  formatted_address: string;
  geometry: GeocoderGeometry;
}
