import { LeftSide, LogoContainer, NavContent, NavigationContainer, RightSide, ServicesContainer } from "./navigation.styles";
import { ReactComponent as MeestLogo } from "../../assets/meest-logo.svg";
import { observer } from "mobx-react-lite";
import Services from "./nav-services/services.component";
import NavHelp from "./nav-help/nav-help.component";
import NavLangPopup from "./nav-lang-popup/nav-lang.component";
import NavSignin from "./nav-signin-btn/nav-signin.component";
import { useLocation } from "react-router-dom";
import NavNotifications from "./nav-notifications/nav-notifications.components";
import { useStore } from "../../stores/store";
import NavUser from "./nav-user/nav-user.component";

const Navigation = () => {

  const location = useLocation();
  const { userStore: {user}} = useStore();

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
          <NavLangPopup />
          {currentPath !== '/auth' && user && <NavUser />}
          {currentPath !== '/auth' && !user && <NavSignin />}
        </RightSide>
      </NavContent>
    </NavigationContainer>)
}

export default observer(Navigation);