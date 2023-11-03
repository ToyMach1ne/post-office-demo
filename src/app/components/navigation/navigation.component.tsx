import { LinkContainer, LogoContainer, NavigationContainer } from "./navigation.styles";
import { ReactComponent as MeestLogo } from "../../assets/meest-logo.svg";
import { ReactComponent as GlobusIcon } from "../../assets/globus-icon.svg";
import MenuButton from "../../common/menu-button/menu-button.component";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

const Navigation = () => {

  const { navStore: { toggleSidebar, isSidebarOpened } } = useStore();

  return (
    <NavigationContainer>
      <LogoContainer to="/">
        <MeestLogo />
      </LogoContainer>
      <LinkContainer>
        <GlobusIcon />
        <MenuButton onClick={() => toggleSidebar()} isOpened={isSidebarOpened} />
      </LinkContainer>
    </NavigationContainer>)
}

export default observer(Navigation);