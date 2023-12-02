import { ShipmentCountryInfo } from "./shipmentCountryInfo";
import { User } from "./user";

export interface Data {
  token?: string;
  user?: User;
  countries?: ShipmentCountryInfo[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Data;
}