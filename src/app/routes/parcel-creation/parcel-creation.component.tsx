import { Outlet } from "react-router-dom";
import ParcelCreationProgress from "../../features/parcel-creation/parcel-creation-progress/parcel-creation-progress.component";
import { ParcelStepLeftContainer } from "../../features/parcel-creation/parcel-step-left-container/parcel-step-left-container.styles";
import { ParcelStepRightContainer } from "../../features/parcel-creation/parcel-step-right-container/parcel-step-right-container.styles";

const ParcelCreation = () => {
  return (
    <>
      <ParcelStepLeftContainer>
        <Outlet />
      </ParcelStepLeftContainer>
      <ParcelStepRightContainer>
        <ParcelCreationProgress />
      </ParcelStepRightContainer>
    </>
  )
}

export default ParcelCreation;