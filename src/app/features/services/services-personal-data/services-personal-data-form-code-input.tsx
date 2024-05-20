import { useState } from "react";
import { useStore } from "../../../stores/store";
import {
  CountryCodeHolder,
  CountryCodeFlag,
  CountryCodeInput,
} from "./services-personal-data-component-styles";
import { ReactComponent as ArrowDownIcon } from "../../../assets/arrow-down-icon.svg";
import { RightSidebarComponent } from "./services-personal-data-right-sidebar";
import { countryInfoList } from "../../../assets/data/countryInfo";

interface InputCountryProps {
  name: string;
  type: string;
  code?: string;
  setCode?: (code: string) => void;
  countryCode?: string;
  setCountryCode?: (countryCode: string) => void;
}

function getCountryFlag(phone: string, countryCode: string) {
  let flagItem;
  for (let i = 0; i <= countryInfoList.length; i++) {
    const item = countryInfoList[i];
    if (item.countryCode === countryCode) {
      flagItem = item.flagEmoji;
      break;
    }
  }

  return flagItem;
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
  const {
    userStore: { user },
  } = useStore();
  const [flag, setFlag] = useState<string>(
    () =>
      getCountryFlag(
        user?.phone?.phone_number ?? "",
        user?.phone?.country_code ?? ""
      ) ?? "ua"
  );

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
