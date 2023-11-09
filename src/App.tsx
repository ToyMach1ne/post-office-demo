import { Outlet } from "react-router-dom";
import { AppContainer, GlobalStyles } from "./global.styles";
import Navigation from "./app/features/navigation/navigation.component";
import Sidebar from "./app/common/sidebar/sidebar.component";
import { observer } from "mobx-react-lite";
import { useStore } from "./app/stores/store";
import { useEffect } from "react";
import Spinner from "./app/common/spinner/spinner.component";
import { v4 } from "uuid";
import Footer from "./app/features/footer/footer.component";

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
    <AppContainer>
      <GlobalStyles />
      <Navigation />
      {(isSidebarOpened || isSidebarClosing) && <Sidebar />}
      <Outlet />
      <Footer />
    </AppContainer>
  );
}

export default observer(App);
