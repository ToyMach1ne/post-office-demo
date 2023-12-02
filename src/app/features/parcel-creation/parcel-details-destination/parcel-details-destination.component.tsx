import { observer } from "mobx-react-lite";
import InputSearchWithSidebar from "../../../common/input-search-with-sidebar/input-search-with-sidebar.component";
import { HeaderSecondary } from "../../../common/typography/typography.styles";
import { ServicesSubSectionContainer } from "../../../features/services/services-subsection/services-subsection.styles";
import { ParcelDetailsSeachInputsContainer } from "../../../routes/parcel-details/parcel-details.styles";
import { useStore } from "../../../stores/store";
import { ShipmentCountryInfo } from "../../../models/shipmentCountryInfo";
import { getCityFromPlaceDetails, getZipCodeFromPlaceDetails } from "../../../utils/google-places/google-places.utils";
import { getShipmentCountriesByFilter, getShipmentCountryName, getZipCodeDisplayValue } from "../../../utils/parcel-creation/parcel-creation-utils";

const ParcelDetailsDestination = () => {

  const { parcelCreationStore: { countryDeparture, countryDestination, setDestinationShipmentCountry },
          placesSearchStore: { getAutocompletePredictions, getPlaceDetails } 
} = useStore();

  return (
    <ServicesSubSectionContainer>
      <HeaderSecondary>{"To"}</HeaderSecondary>
      <ParcelDetailsSeachInputsContainer>
        <InputSearchWithSidebar<ShipmentCountryInfo>
          disabled={ countryDeparture ? false : true }
          name="Destination Country search" 
          inputValue={getShipmentCountryName(countryDestination)}
          placeholder="Choose country"
          label="Country"
          sidebarTitle="Country"
          sidebarInputPlaceholder="Start typing country name"
          tabIndex={1}
          displayAllOptionsWithEmptyFilter
          getSearchOptions={(filter) => Promise.resolve(getShipmentCountriesByFilter(countryDeparture?.destinationCountries ?? [], filter))}
          getKeyForSearchOption={(country) => country.countryCode}
          getDisplayValueForSearchOption={(country) => getShipmentCountryName(country)}
          onSearchOptionSelected={(country) => setDestinationShipmentCountry(country)}
          errorMessage="This field is required"
          mainInputValidationPredicate={(inputValue) => inputValue ? true : false}
        />

        <InputSearchWithSidebar<google.maps.places.AutocompletePrediction>
          disabled={countryDestination ? false : true}
          inputValue={getZipCodeDisplayValue(countryDestination)}
          name="Destination Zip search"  
          placeholder=""
          label="Zip-code"
          sidebarTitle="Zip-code"
          sidebarInputPlaceholder="Start typing zip-code"
          tabIndex={2}
          getSearchOptions={(filter) => getAutocompletePredictions(filter ?? "", ["postal_code"], countryDestination?.countryCode.toLocaleLowerCase())}
          getKeyForSearchOption={(place) => place.place_id}
          getDisplayValueForSearchOption={(place) => place.description}
          onSearchOptionSelected={async (place) => {
            const placeDetails = await getPlaceDetails(place);
            if (placeDetails && countryDestination) {
              const zipCode = getZipCodeFromPlaceDetails(placeDetails);
              const city = getCityFromPlaceDetails(placeDetails);
              setDestinationShipmentCountry({...countryDestination, zipCode, city });
            } 
          }}
          canModifyInput
          onMainInputClick={() => countryDestination && setDestinationShipmentCountry({...countryDestination, city: undefined })}
          onInputChange={(inputValue) => {
            const zipCode = inputValue;
            countryDestination && setDestinationShipmentCountry({...countryDestination, zipCode, city: undefined });
          }}
          errorMessage="This field is required"
          mainInputValidationPredicate={(inputValue) => inputValue ? true : false}
        />
        
      </ParcelDetailsSeachInputsContainer>
    </ServicesSubSectionContainer>
  )
}

export default observer(ParcelDetailsDestination);