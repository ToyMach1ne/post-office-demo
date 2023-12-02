import { TextFormError, TextLabel, TextSearchOption } from "../typography/typography.styles";
import { InputContainer } from "../form-field-text/form-field-text.styles";
import { ReactComponent as SearchIcon } from "../../assets/magnifying-glass-icon.svg";
import { FieldSearchContainer, IconContainer } from "./form-field-places-search.styles";
import { useField } from "formik";
import { useState } from "react";
import { useStore } from "../../stores/store";
import InputSearch from "../input-search/input-search.component";
import Sidebar from "../sidebar-right/sidebar.component";
import { DropdownOption, DropdownPopup } from "../form-field-phone/phone-code-dropdown/phone-code-dropdown.styles";

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  tabIndex?: number;
  onSearchFinished?: () => void;
}
const PlacesFormFieldSearch = ({ name, placeholder, label, type, tabIndex, onSearchFinished }: Props) => {

  const [field, meta] = useField(name);

  const { navStore: { isSidebarOpened, toggleSidebar},
          placesSearchStore: { getAutocompletePredictions, getPlaceDetails} 
  } = useStore();

  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);

  const handleInputChange = async (value: string) => {
    if (value) {
      setPredictions(await getAutocompletePredictions(value));
    } else {
      setPredictions([]);
    }
  };

  return (
    <FieldSearchContainer mb={"2.4rem"}>
      <TextLabel htmlFor={name}>{label}</TextLabel>
      <InputContainer error={false}>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <input
          onClick={() => toggleSidebar()}
          {...field}
          tabIndex={tabIndex ?? -1}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required
          formNoValidate={true}
        />
      </InputContainer>

      <Sidebar withBlurredBackground header="Search address">
        <InputSearch name="search_address" 
          placeholder="Start typing your address"
          focusOnOpen={true}
          onChange={(targetValue) => handleInputChange(targetValue)}
          />
          <DropdownPopup isOpened={isSidebarOpened}>
            {predictions.map((prediction) => 
              (<DropdownOption key={prediction.place_id} 
                               onClick={() => {
                                  onSearchFinished && onSearchFinished(); 
                                  getPlaceDetails(prediction); 
                                  toggleSidebar();
                                }}>
                <TextSearchOption>{prediction.description}</TextSearchOption>
              </DropdownOption>)
            )}
        </DropdownPopup>
    </Sidebar>

      {meta.touched && !!meta.error &&
        (<TextFormError>{meta.error}</TextFormError>)}
    </FieldSearchContainer>
  )
}

export default PlacesFormFieldSearch;
