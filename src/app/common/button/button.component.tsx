import { AppleSigninButton, BaseButton, ButtonSpinner, GoogleSigninButton } from "./button.styles";
import { ReactComponent as GoogleIcon } from "../../assets/google-icon.svg";
import { ReactComponent as AppleIcon } from "../../assets/apple-icon.svg";

export enum BUTTON_TYPES {
  base = "base",
  google = "google",
  apple = "apple",
};

interface Props {
  isLoading?: boolean;
  buttonType?: BUTTON_TYPES;
  children?: any;
  tabIndex?: number;
  disabled?: boolean;
  type?: any;
  onClick?: any;
}

const getButton = (type = BUTTON_TYPES.base): typeof BaseButton =>
({
  [BUTTON_TYPES.base]: BaseButton,
  [BUTTON_TYPES.google]: GoogleSigninButton,
  [BUTTON_TYPES.apple]: AppleSigninButton,
}[type]);

// const Button = ({ isLoading, buttonType, children, ...otherProps }: Props) => {
const Button = ({ isLoading, buttonType, children, type, tabIndex, disabled, onClick }: Props) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton isLoading={isLoading} type={type} tabIndex={tabIndex} disabled={disabled}>
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