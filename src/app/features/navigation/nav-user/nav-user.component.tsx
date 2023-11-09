import { useStore } from "../../../stores/store";
import { NavBtn } from "../../../common/nav-btn/nav-btn.styles";
import { UserNavContainer, UserAvatar, UserNavBtn } from "./nav-user.styles";
import { TextNavMenu } from "../../../common/typography/typography.styles";
import { ReactComponent as ArrowDownIcon } from "../../../assets/arrow-down-icon.svg";
import { NavPopup, NavPopupItem } from "../nav-popup/nav-popup.styles";
import withCloseOnOutsideClick, { WithCloseOnOutsideClickProps } from "../../../HOCs/withCloseOnOutsideClick.hoc";
import { observer } from "mobx-react-lite";
import { forwardRef } from "react";

const NavUser = ({isOpened, setIsOpened}: WithCloseOnOutsideClickProps, ref: any) => {

  const { userStore: { user } } = useStore();

  return (
    <UserNavContainer ref={ref}>
      <UserNavBtn onClick={() => setIsOpened(!isOpened)}>
        <NavBtn>
          <UserAvatar>EW</UserAvatar>
        </NavBtn>
        <TextNavMenu color='nav'>Emily Wilson</TextNavMenu>
        <ArrowDownIcon />
      </UserNavBtn>
      <NavPopup isOpened={isOpened}>
          <NavPopupItem key={1}>Shipments</NavPopupItem>
          <NavPopupItem key={2}>Account Settings</NavPopupItem>
      </NavPopup>
    </UserNavContainer>
  );
}

export default observer(withCloseOnOutsideClick(forwardRef(NavUser)));