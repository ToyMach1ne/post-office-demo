import { HeaderSecondary } from "../typography/typography.styles";
import { SidebarBody, SidebarButtonClose, SidebarContainer, SidebarHeader } from "./sidebar.styles";
import { ReactComponent as XCrossIcon } from "../../assets/xcross-icon.svg";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Authorization from "../../routes/authorization/authorization.component";

const Sidebar = () => {
  const { navStore: { isSidebarOpened, isSidebarClosing, toggleSidebar } } = useStore();

  return (
    <SidebarContainer isOpened={isSidebarOpened} isClosing={isSidebarClosing}>
      <SidebarHeader>
        <HeaderSecondary>Authorization</HeaderSecondary>
        <SidebarButtonClose onClick={() => toggleSidebar()}><XCrossIcon /></SidebarButtonClose>
      </SidebarHeader>
      <SidebarBody>
        <Authorization />
      </SidebarBody>
    </SidebarContainer>
  )
}

export default observer(Sidebar);