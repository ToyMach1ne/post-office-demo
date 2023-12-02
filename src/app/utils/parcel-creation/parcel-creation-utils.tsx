import { getCountryName } from "../../common/form-field-phone/form-field-phone.component";
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { ShipmentCountryInfo } from "../../models/shipmentCountryInfo";


export function getShipmentCountryName(country: ShipmentCountryInfo | null) {
  return country 
    ? getUnicodeFlagIcon(country.countryCode) + " " + getCountryName(country.countryCode)
    : '';
}

export function getShipmentCountriesByFilter(countries: ShipmentCountryInfo[], filter?: string) {
  return filter 
    ? countries.filter(country => getCountryName(country.countryCode)?.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) )
    : countries
}

export function getZipCodeDisplayValue (country: ShipmentCountryInfo | null) {
  const infos = [country?.zipCode, country?.city];
  return infos.filter(i => i !== undefined).join(', ');
}