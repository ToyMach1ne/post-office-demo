import { Outlet } from "react-router-dom";
import ParcelCreationProgress from "../../features/parcel-creation/parcel-creation-progress/parcel-creation-progress.component";
import ParcelCreationProgressMobile from "../../features/parcel-creation/parcel-creation-progress/parcel-creation-progress-mobile.component";
import { ParcelStepLeftContainer } from "../../features/parcel-creation/parcel-step-left-container/parcel-step-left-container.styles";
import { ParcelStepRightContainer } from "../../features/parcel-creation/parcel-step-right-container/parcel-step-right-container.styles";
import Button from "../../common/button/button.component";
// import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import withRedirectToAuth from "../../HOCs/withRedirectToAuth.hoc";
import { observer } from "mobx-react-lite";

const ParcelCreation = () => {

  const { parcelCreationStore: { validateCurrentStep, countryDeparture, countryDestination }} = useStore();

  return (
    <>
      <ParcelStepLeftContainer>
        <ParcelCreationProgressMobile />
        <Outlet />
        <Button mt={"1.6rem"} id="parcelProgressMobile"
          disabled={!validateCurrentStep()}
          content='Next step' onClick={() => {
          console.log('dep', countryDeparture?.countryCode, countryDeparture?.zipCode);
          console.log('dest', countryDestination?.countryCode, countryDestination?.zipCode);
          console.log('dimen', countryDestination?.maxSizeX);
          console.log('dimen', countryDestination?.maxSizeY);
          console.log('dimen', countryDestination?.maxSizeZ);
          console.log('dimen', countryDestination?.maxWeight);
          console.log('dimen', countryDestination?.maxVolWeight);
      }}/>
      </ParcelStepLeftContainer>
      <ParcelStepRightContainer>
        <ParcelCreationProgress />
      </ParcelStepRightContainer>
    </>
  )
}

export default withRedirectToAuth(observer(ParcelCreation));