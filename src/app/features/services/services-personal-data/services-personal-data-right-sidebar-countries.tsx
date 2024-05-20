import { useState } from "react";
import { CountryListElement } from "./services-personal-data-component-styles";
import InputSearch from "../../../common/input-search/input-search.component";
import { countryInfoList } from "../../../assets/data/countryInfo";
import { CountryItem } from "./services-personal-data-right-sidebar-country-item";

interface CountryListProps {
  handleClickCountry?: (
    code: string,
    flag: string,
    countryCode: string
  ) => void;
}

//Sidebar Countries List
export const CountryList = ({ handleClickCountry }: CountryListProps) => {
  const [query, setQuery] = useState<string>("");

  //Filter Country List
  const filteredCounties = countryInfoList.filter(({ countryName }) =>
    countryName.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  return (
    <>
      <InputSearch
        name="country-search"
        placeholder="Start typing country name"
        inputValue={query}
        onChange={(value: string) => setQuery(value)}
      />
      <CountryListElement>
        {filteredCounties.map(
          ({ countryName, callingCode, flagEmoji, countryCode }) => (
            <CountryItem
              key={countryName}
              countryName={countryName}
              callingCode={callingCode}
              flagEmoji={flagEmoji}
              countryCode={countryCode}
              handleClickCountry={handleClickCountry}
            />
          )
        )}
      </CountryListElement>
    </>
  );
};
