import styled, { css } from "styled-components";
import { Colors, TextButton } from "../typography/typography.styles";
import { SpinnerCircle } from "../spinner/spinner.styles";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  disabled?: boolean;
  isLoading?: boolean;
}

export const BaseButton = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  background-color: ${Colors.blue};
  color: white;
  ${TextButton};
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  transition: all .2s;
  gap: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${Colors.blueLight3};
  }

  &:hover {
    background-color: ${Colors.blue4};
  }

  &:active {
    background-color: ${Colors.blue};
  }

  ${({ disabled }) => disabled &&
    css`
      background-color: ${Colors.blueDisabled};
      pointer-events: none!important;
    `
  }

  ${({ isLoading }) => isLoading &&
    css`
      background-color: ${Colors.blue2};
      pointer-events: none!important;
    `
  }
`

export const SocialSiginButton = styled(BaseButton)`
  padding: 8px 0;  
  border: 1px solid ${Colors.blue2};
  background-color: transparent;
  color: ${Colors.grayDark2};
  font-weight: 500;

  &:hover {
    background-color: ${Colors.blue2};
    color: ${Colors.white};
  }

  &:active {
    background-color: ${Colors.blue};
    border-color: ${Colors.blue};
  }
`

export const GoogleSigninButton = styled(SocialSiginButton)`
`

export const AppleSigninButton = styled(SocialSiginButton)`
`

export const ButtonSpinner = styled(SpinnerCircle)`
  width: 2rem;
  height: 2rem;
`;