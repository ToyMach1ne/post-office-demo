import { ReactComponent as HelpIcon } from "../../assets/questionmark-icon.svg";
import { HelpNavButton } from "./nav-help.styles";

const NavHelp = () => {
  return (
    <HelpNavButton>
      <HelpIcon />
    </HelpNavButton>
  );
}

export default NavHelp;