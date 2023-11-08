import { SignInNavButton } from "./nav-signin.styles";
import { ReactComponent as UserIcon } from "../../assets/user-icon.svg";
import { useStore } from "../../stores/store";
import { TextNavMenu } from "../../common/typography/typography.styles";
import { useTranslation } from "react-i18next";

const NavSignin = () => {

  const { navStore: { toggleSidebar } } = useStore();
  const { t } = useTranslation();

  return (
    <SignInNavButton onClick={() => toggleSidebar()}>
      <UserIcon />
      <TextNavMenu>{t("Sign In")}</TextNavMenu>
    </SignInNavButton>
  );
}

export default NavSignin;