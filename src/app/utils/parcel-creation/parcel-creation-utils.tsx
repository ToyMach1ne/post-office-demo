import { getCountryName } from "../../common/form-field-phone/form-field-phone.component";
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { ShipmentCountryInfo } from "../../models/shipmentCountryInfo";
import { store } from "../../stores/store";


export function getShipmentCountryName(country: ShipmentCountryInfo | null) {
  return country 
    ? getUnicodeFlagIcon(country.countryCode) + " " + getCountryName(country.countryCode)
    : '';
}

const moveUserCountryToBeginning = (arr: ShipmentCountryInfo[], countryCode: string): ShipmentCountryInfo[] => {
  const found = arr.find(obj => obj.countryCode === countryCode);
  if (found) {
    const filteredArray = arr.filter(obj => obj.countryCode !== countryCode);
    return [found, ...filteredArray];
  }
  return arr;
};

export function getShipmentCountriesByFilter(countries: ShipmentCountryInfo[], filter?: string) {

  const userCountry = store.userStore.user?.country;

  const filteredCountries = filter
    ? countries.filter(country => getCountryName(country.countryCode)?.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) )
    : countries;

  return userCountry 
    ? moveUserCountryToBeginning(filteredCountries, userCountry)
    : filteredCountries;
}

export function getZipCodeDisplayValue (country: ShipmentCountryInfo | null) {
  const infos = [country?.zipCode, country?.city];
  return infos.filter(i => i !== undefined).join(', ');
}