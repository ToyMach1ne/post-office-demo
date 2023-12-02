import { observer } from "mobx-react-lite";
import InputSearchWithSidebar from "../../../common/input-search-with-sidebar/input-search-with-sidebar.component";
import { HeaderSecondary } from "../../../common/typography/typography.styles";
import { ServicesSubSectionContainer } from "../../../features/services/services-subsection/services-subsection.styles";
import { ParcelDetailsSeachInputsContainer } from "../../../routes/parcel-details/parcel-details.styles";
import { useStore } from "../../../stores/store";
import { ShipmentCountryInfo } from "../../../models/shipmentCountryInfo";
import { getCityFromPlaceDetails, getZipCodeFromPlaceDetails } from "../../../utils/google-places/google-places.utils";
import { getShipmentCountriesByFilter, getShipmentCountryName, getZipCodeDisplayValue } from "../../../utils/parcel-creation/parcel-creation-utils";

const ParcelDetailsDeparture = () => {

  const { parcelCreationStore: { shipmentCountries, countryDeparture, setDepartureShipmentCountry, setDestinationShipmentCountry },
          placesSearchStore: { getAutocompletePredictions, getPlaceDetails } 
} = useStore();

  return (
    <ServicesSubSectionContainer>
      <HeaderSecondary>{"From"}</HeaderSecondary>
      <ParcelDetailsSeachInputsContainer>
        <InputSearchWithSidebar<ShipmentCountryInfo>
          name="Country search" 
          inputValue={getShipmentCountryName(countryDeparture)}
          placeholder="Choose country"
          label="Country"
          sidebarTitle="Country"
          sidebarInputPlaceholder="Start typing country name"
          tabIndex={1}
          displayAllOptionsWithEmptyFilter
          getSearchOptions={(filter) => Promise.resolve(getShipmentCountriesByFilter(shipmentCountries, filter))}
          onSearchOptionSelected={(country) => { setDepartureShipmentCountry(country); setDestinationShipmentCountry(null); }}
          getKeyForSearchOption={(country) => country.countryCode}
          getDisplayValueForSearchOption={(country) => getShipmentCountryName(country)}
          errorMessage="This field is required"
          mainInputValidationPredicate={(inputValue) => inputValue ? true : false}
        />

        <InputSearchWithSidebar<google.maps.places.AutocompletePrediction>
          disabled={countryDeparture ? false : true}
          inputValue={getZipCodeDisplayValue(countryDeparture)}
          name="Zip search"  
          placeholder=""
          label="Zip-code"
          sidebarTitle="Zip-code"
          sidebarInputPlaceholder="Start typing zip-code"
          tabIndex={2}
          getSearchOptions={(filter) => getAutocompletePredictions(filter ?? "", ["postal_code"], countryDeparture?.countryCode.toLocaleLowerCase())}
          getKeyForSearchOption={(place) => place.place_id}
          getDisplayValueForSearchOption={(place) => place.description}
          onSearchOptionSelected={async (place) => {
            const placeDetails = await getPlaceDetails(place);
            if (placeDetails && countryDeparture) {
              const zipCode = getZipCodeFromPlaceDetails(placeDetails);
              const city = getCityFromPlaceDetails(placeDetails);
              setDepartureShipmentCountry({...countryDeparture, zipCode, city });
            } 
          }}
          onMainInputClick={() => countryDeparture && setDepartureShipmentCountry({...countryDeparture, city: undefined })}
          canModifyInput
          onInputChange={(inputValue) => {
            if (countryDeparture) {
              const zipCode = inputValue;
              setDepartureShipmentCountry({...countryDeparture, zipCode, city: undefined });
            }
          }}
          errorMessage="This field is required"
          mainInputValidationPredicate={(inputValue) => inputValue ? true : false}
        />
        
      </ParcelDetailsSeachInputsContainer>
    </ServicesSubSectionContainer>
  )
}

export default observer(ParcelDetailsDeparture);