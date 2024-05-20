import { useState } from "react";
import {
  CountryCodeHolder,
  CountryCodeFlag,
  CountryCodeInput,
} from "./services-personal-data-component-styles";
import { ReactComponent as ArrowDownIcon } from "../../../assets/arrow-down-icon.svg";
import { RightSidebarComponent } from "./services-personal-data-right-sidebar";

interface InputCountryProps {
  name: string;
  type: string;
  code?: string;
  setCode?: (code: string) => void;
  countryCode?: string;
  setCountryCode?: (countryCode: string) => void;
}

//Form Component Country Code
export const FormFieldCCode = ({
  name,
  type,
  code,
  setCode,
  countryCode,
  setCountryCode,
}: InputCountryProps) => {
  const [flag, setFlag] = useState<string>("🇺🇦");

  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  return (
    <>
      <CountryCodeHolder onClick={() => setIsOpenSidebar(true)}>
        <CountryCodeFlag>{flag}</CountryCodeFlag>
        <CountryCodeInput type={type} value={code} name={name} readOnly />
        <ArrowDownIcon />
      </CountryCodeHolder>
      {isOpenSidebar && (
        <RightSidebarComponent
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
          setFlag={setFlag}
          setCode={setCode}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
      )}
    </>
  );
};
