import { ReactComponent as BellIcon } from "../../assets/notifications-bell-icon.svg";
import { ReactComponent as BellIconAlert } from "../../assets/notifications-bell-icon-alert.svg";
import { NavNotificationsBtn } from "./nav-notifications.styles";
import { useStore } from "../../stores/store";

const NavNotifications = () => {
  const { notificationsStore: { countNotifications } } = useStore();

  return (
    <NavNotificationsBtn>
      { countNotifications > 0 ? <BellIconAlert /> : <BellIcon /> }
    </NavNotificationsBtn>
  )
}

export default NavNotifications;