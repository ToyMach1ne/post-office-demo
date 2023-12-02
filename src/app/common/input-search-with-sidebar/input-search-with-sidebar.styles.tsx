import styled, { css } from "styled-components";
import { FieldSearchContainer } from "../form-field-places-search/form-field-places-search.styles";
import { Colors } from "../typography/typography.styles";

interface Props {
  isDisabeld?: boolean;
}

export const InputSearchContainer = styled(FieldSearchContainer)<Props>`
  ${({isDisabeld}) => isDisabeld && css`input:disabled {
      background-color: ${Colors.grayLight6};
    }`
  }
`