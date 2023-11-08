import { css } from "styled-components";
import { Colors } from "../typography/typography.styles";

export const NavBtn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color .2s;

  &:hover {
    background-color: ${Colors.gray4};
  }

  &:active {
    background-color: ${Colors.gray3};
  }
`