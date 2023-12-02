import { observer } from "mobx-react-lite";
import { useStore } from '../../stores/store';
import ServicesMenu from "../../features/services/services-menu/services-menu.component";
import LeftSidebar from '../../common/sidebar-left/left-sidebar.component';
import { ServicesRouteContainer, ServicesRouteMobile } from "./services.styles";
import { ServicesContainer } from "../../features/navigation/nav-services/nav-services.styles";
import { Outlet } from "react-router-dom";

const Services = () => {

  const { navStore: { setServicesOpened } } = useStore();

  return (
    <>
      <ServicesRouteContainer>
        <ServicesContainer isOpened={true}>
          <ServicesMenu />
        </ServicesContainer>
        <Outlet />
      </ServicesRouteContainer>
      <ServicesRouteMobile>
        <LeftSidebar 
            onClose={() => setServicesOpened(false)}
            withBlurredBackground={true}>
          <ServicesMenu />
        </LeftSidebar>
        <Outlet />
      </ServicesRouteMobile>
      
    </>
  )
}

export default observer(Services);