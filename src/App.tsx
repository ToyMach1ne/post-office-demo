import { Outlet } from "react-router-dom";
import { GlobalStyles } from "./global.styles";
import Navigation from "./app/components/navigation/navigation.component";
import Sidebar from "./app/common/sidebar/sidebar.component";
import { observer } from "mobx-react-lite";
import { useStore } from "./app/stores/store";
import { useEffect } from "react";
import Spinner from "./app/common/spinner/spinner.component";
import { v4 } from "uuid";

function App() {

  const { navStore: { isSidebarOpened, isSidebarClosing }, commonStore, userStore } = useStore();

  useEffect(() => {
    if (!commonStore.deviceUuid) {
      commonStore.setDeviceUuid(v4());
    }

    if (commonStore.meestToken) {
      userStore.getCurrentUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [userStore, commonStore])

  if (!commonStore.appLoaded) return <Spinner />

  return (
    <>
      <GlobalStyles />
      <Navigation />
      {(isSidebarOpened || isSidebarClosing) && <Sidebar />}
      <Outlet />
    </>
  );
}

export default observer(App);
