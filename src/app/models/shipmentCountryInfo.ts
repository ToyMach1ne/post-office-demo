export interface ShipmentCountryInfo {
  countryCode: string
  creationSteps?: any
  destinationCountries?: ShipmentCountryInfo[]
  zipCode?: string
  city?: string
  maxWeight?: number
  maxVolWeight?: number
  maxSizeX?: number
  maxSizeY?: number
  maxSizeZ?: number
}

// export interface DestinationCountry {
//   countryCode: string
//   creationSteps?: any
//   maxWeight: number
//   maxVolWeight: number
//   maxSizeX: number
//   maxSizeY: number
//   maxSizeZ: number
// }

export interface ParcelDimenstions {
  weight: number,
  size_x: number,
  size_y: number,
  size_z: number
}
