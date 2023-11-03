import { ComponentPropsWithoutRef } from "react";
import { AppleSigninButton, BaseButton, ButtonSpinner, GoogleSigninButton } from "./button.styles";
import { ReactComponent as GoogleIcon } from "../../assets/google-icon.svg";
import { ReactComponent as AppleIcon } from "../../assets/apple-icon.svg";
// import { ReactComponent as SpinnerCircleIcon } from "../../assets/spinner-circle-icon.svg";

export enum BUTTON_TYPES {
  base = "base",
  google = "google",
  apple = "apple",
};

interface Props extends ComponentPropsWithoutRef<"button"> {
  isLoading?: boolean;
  buttonType?: BUTTON_TYPES;
}

const getButton = (type = BUTTON_TYPES.base): typeof BaseButton =>
({
  [BUTTON_TYPES.base]: BaseButton,
  [BUTTON_TYPES.google]: GoogleSigninButton,
  [BUTTON_TYPES.apple]: AppleSigninButton,
}[type]);

const Button = ({ isLoading, buttonType, children, ...otherProps }: Props) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton isLoading={isLoading}  {...otherProps}>
      {!isLoading && buttonType === BUTTON_TYPES.google && <GoogleIcon />}
      {!isLoading && buttonType === BUTTON_TYPES.apple && <AppleIcon />}
      {isLoading
        ? <ButtonSpinner />
        : children
      }
    </CustomButton>
  )
}

export default Button;