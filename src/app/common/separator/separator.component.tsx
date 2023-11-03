import { SeparatorContainer, SeparatorLine } from "./separator.styles";

interface Props {
  content?: string;
}

const Separator = ({ content }: Props) => {
  return (
    <SeparatorContainer>
      <SeparatorLine />
      {content && (<>{content}<SeparatorLine /></>)}
    </SeparatorContainer>
  )
}

export default Separator;