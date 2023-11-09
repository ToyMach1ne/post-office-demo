import styled from "styled-components";
import { NavBtn } from "../../../common/nav-btn/nav-btn.styles";

export const ServicesNavButton = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  ${NavBtn}:nth-child(2) {
    display: none;
  }
`