import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { Colors, HeaderSecondary, TextBody } from "../../../common/typography/typography.styles";
import { ParcelCreationMobileHeader, ParcelCreationProgressMobileContainer } from "./parcel-creation-progress.styles";
import { SidebarButtonClose } from "../../../common/sidebar-right/sidebar.styles";
import { ReactComponent as XCrossIcon } from "../../../assets/xcross-icon.svg";
import { useNavigate } from "react-router-dom";

const ParcelCreationProgressMobile = () => {

  const { parcelCreationStore: { currentStepNumber, parcelCreationSteps, maxStep }} = useStore();

  const navigate = useNavigate();

  return (
    <ParcelCreationProgressMobileContainer id="parcelProgressMobile">
      <ParcelCreationMobileHeader>
        <HeaderSecondary>{'Create new shipment'}</HeaderSecondary>
        <SidebarButtonClose onClick={() => navigate(-1)}>
          <XCrossIcon />
        </SidebarButtonClose>
      </ParcelCreationMobileHeader>
      <TextBody style={{color: `${Colors.grayDark2}`}}>{`Step 1 of ${maxStep}. ${parcelCreationSteps[currentStepNumber - 1].stepTitle}`}</TextBody>
    </ParcelCreationProgressMobileContainer>
  )
}

export default observer(ParcelCreationProgressMobile);