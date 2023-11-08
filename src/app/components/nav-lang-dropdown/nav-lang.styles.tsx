import styled, { css } from "styled-components";
import { Colors, FontSizes } from "../../common/typography/typography.styles";

export const NavLangContainer = styled.div`
  position: relative;
`

export const NavLangButton  = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

interface MenuProps {
  isOpened?: boolean;
}

export const NavLangMenu = styled.div<MenuProps>`
  ${({isOpened}) => isOpened ? css`display: block;` : css`display: none;`}
  position: absolute;
  top: 3rem;
  left: -5.5rem;
  font-size: ${FontSizes.small};
  font-style: normal;
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.5px;

  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  z-index: 1000;
`

interface OptionProps {
  isSelected?: boolean;
}

export const NavLangOption = styled.div<OptionProps>`
  white-space: nowrap;
  box-sizing: border-box;

  ${({isSelected}) => 
    isSelected ? css`color: ${Colors.blue2};` : css`color: ${Colors.grayDark2};`
  }

  cursor: pointer;
  display: block;
  padding: 8px 16px;

  &:hover {
    background-color: ${Colors.grayLight6};
    border-radius: 6px;
  }
`