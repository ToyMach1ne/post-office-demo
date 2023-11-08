import { LeftSide, LogoContainer, NavContent, NavigationContainer, RightSide, ServicesContainer } from "./navigation.styles";
import { ReactComponent as MeestLogo } from "../../assets/meest-logo.svg";
import { observer } from "mobx-react-lite";
import Services from "../services/services.component";
import NavHelp from "../nav-help/nav-help.component";
import NavLangDropdown from "../nav-lang-dropdown/nav-lang.component";
import NavSignin from "../nav-signin-btn/nav-signin.component";
import { useLocation } from "react-router-dom";
import NavNotifications from "../nav-notifications/nav-notifications.components";

const Navigation = () => {

  const location = useLocation();

  // Access the current path from the location object
  const currentPath = location.pathname;

  return (
    <NavigationContainer>
      <NavContent>
        <LeftSide>
          <LogoContainer to="/">
            <MeestLogo />
          </LogoContainer>
          <ServicesContainer>
            <Services />
          </ServicesContainer>
        </LeftSide>
        <RightSide>
          <NavHelp />
          <NavNotifications />
          <NavLangDropdown />
          {currentPath !== '/auth' && <NavSignin />}
        </RightSide>
      </NavContent>
    </NavigationContainer>)
}

export default observer(Navigation);