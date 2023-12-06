import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { HeaderSecondary } from "../../../common/typography/typography.styles";
import Button from "../../../common/button/button.component";
import { ParcelCreationProgressContainer } from "./parcel-creation-progress.styles";
import ParcelStepTitle from "../parcel-step-title/parcel-step-title.component";

const ParcelCreationProgress = () => {

  const { parcelCreationStore: { currentStepNumber, parcelCreationSteps, maxStep, countryDeparture, countryDestination, validateCurrentStep }} = useStore();

  return (
    <ParcelCreationProgressContainer id="parcelProgressDesktop">
      <HeaderSecondary>{'Create new shipment'}</HeaderSecondary>
      {parcelCreationSteps.map((step) => (
        <ParcelStepTitle key={step.stepNumber} 
          parcelCreationStep={step} 
          isActive={step.stepNumber === currentStepNumber}
          isLastStep={step.stepNumber === maxStep} /> 
      ))}
      <Button mt={"4rem"}
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
    </ParcelCreationProgressContainer>
  )
}

export default observer(ParcelCreationProgress);