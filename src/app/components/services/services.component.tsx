import { ServicesNavButton } from "./services.styles"
import { ReactComponent as PackageIcon } from "../../assets/package-icon.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/arrow-down-icon.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu-hamburger-icon.svg";
import { TextNavMenu } from "../../common/typography/typography.styles";
// import { t } from "i18next";
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react-lite";

const Services = () => {

  const { t } = useTranslation();

  return (
    <ServicesNavButton>
      <PackageIcon />
      <MenuIcon />
      <TextNavMenu color='nav'>{t("Services")}</TextNavMenu>
      <ArrowDownIcon />
    </ServicesNavButton>
  );
}

export default observer(Services);