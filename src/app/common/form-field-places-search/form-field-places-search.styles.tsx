import styled from "styled-components";
import { FieldContainer } from "../form-field-text/form-field-text.styles";
import { TextLabel } from "../typography/typography.styles";

export const FieldSearchContainer = styled(FieldContainer)`
  position: relative;

  input {
    padding: 1rem 1.6rem 1rem 3.4rem;
  }

  ${TextLabel} {
    position: relative;
    display: inline-block;
    margin-bottom: 6px;
  }
`

export const IconContainer = styled.span`
  display: flex;
  position: absolute;
  left: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
`