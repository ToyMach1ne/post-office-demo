import styled from "styled-components";
import { Colors } from "../../../common/typography/typography.styles";
import { NavPopup } from "../nav-popup/nav-popup.styles";

export const UserNavContainer = styled.span`
  position: relative;

  ${NavPopup} {
    left: 0;
    top: 3.5rem;
  }
`

export const UserNavBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`

export const UserAvatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: ${Colors.blue4};

  color: ${Colors.white};
  font-family: Roboto;
  font-size: 9px;
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.5px;
`