import { HeaderSecondary } from "../../../common/typography/typography.styles";
import { ServicesSubSectionContainer } from "./services-subsection.styles";

interface Props {
  title: string;
}

const ServicesSubsection = ({title }: Props) => {

  return (
    <ServicesSubSectionContainer>
      <HeaderSecondary>{title}</HeaderSecondary>
    </ServicesSubSectionContainer>
  )
}

export default ServicesSubsection;
