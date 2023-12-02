import styled from "styled-components";
import { FieldContainer } from "../form-field-text/form-field-text.styles";

export const FieldSearchContainer = styled(FieldContainer)`
  position: relative;

  input {
    padding: 1rem 1.6rem 1rem 3.4rem;
  }
`

export const IconContainer = styled.span`
  display: flex;
  position: absolute;
  left: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
`