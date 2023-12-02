import { TextLabel } from "../../../common/typography/typography.styles";
import { ParcelCreationStep } from "../../../stores/parcelCreationFlowStore";
import { ParcelStepNumber, ParcelStepSeparator, ParcelStepTitleBody, ParcelStepTitleContainer } from "./parcel-step-title.styles";

interface Props {
  parcelCreationStep: ParcelCreationStep
  isActive: boolean
  isLastStep: boolean
}

const ParcelStepTitle = ({parcelCreationStep, isActive, isLastStep}: Props) => {
  
  return (
    <>
      <ParcelStepTitleContainer isActive={isActive}>
        <ParcelStepTitleBody>
          <ParcelStepNumber>{parcelCreationStep.stepNumber}</ParcelStepNumber>
          <TextLabel>{parcelCreationStep.stepTitle}</TextLabel>
        </ParcelStepTitleBody>
        {!isLastStep && <ParcelStepSeparator />}
      </ParcelStepTitleContainer>
    </>
  )
}

export default ParcelStepTitle;