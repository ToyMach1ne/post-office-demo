import {
  SidebarRightContainer,
  PersonalDataTitles,
} from "./services-personal-data-component-styles";
import { HeaderSecondary } from "../../../common/typography/typography.styles";
import { ReactComponent as XIcon } from "../../../assets/xcross-icon.svg";
import { BlurredBackground } from "../../../common/blurred-background/blurred-background.styles";
import { CountryList } from "./services-personal-data-right-sidebar-countries";

interface SidebarOpen {
  isOpenSidebar: boolean;
  setIsOpenSidebar: (isOpen: boolean) => void;
  withBlurredBackground?: boolean;
  code?: string;
  setFlag?: (flag: string) => void;
  setCode?: (code: string) => void;
  countryCode?: string;
  setCountryCode?: (countryCode: string) => void;
}

//Sidebar Countries Component
export const RightSidebarComponent = ({
  isOpenSidebar,
  setIsOpenSidebar,
  withBlurredBackground,
  setFlag,
  setCode,
  countryCode,
  setCountryCode,
}: SidebarOpen) => {
  function handleClickCountry(code: string, flag: string, countryCode: string) {
    setCode && setCode(`+${code}`);
    setFlag && setFlag(flag);
    setCountryCode && setCountryCode(countryCode);
    setIsOpenSidebar(false);
  }

  return (
    <>
      <SidebarRightContainer>
        <PersonalDataTitles>
          <HeaderSecondary>Select country code</HeaderSecondary>
          <XIcon onClick={() => setIsOpenSidebar(false)} />
        </PersonalDataTitles>

        <CountryList handleClickCountry={handleClickCountry} />
      </SidebarRightContainer>
      {isOpenSidebar && <BlurredBackground />}
    </>
  );
};
