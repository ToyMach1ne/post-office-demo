import { useField } from "formik";
import { Link, TextFormError, TextLabel } from "../typography/typography.styles";
import { InputContainer, IconsContainer, PassVisibilityIcon } from "../form-field-text/form-field-text.styles";
import { useState } from "react";
import PasswordValidator from "../password-validator/password-validator.component";
import { FieldPasswordContainer } from "./form-field-password.styles";
import { v4 } from "uuid";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  shouldValidatePassword?: boolean;
  tabIndex?: number;
  forgotPassword?: boolean;
}

const ValidatePassword = (password: string) => {
  const validationErrorIndexes: number[] = [];

  if (password.length < 8) validationErrorIndexes.push(0);
  if (!password.match(/(?=.*\d)/)) validationErrorIndexes.push(1);
  if (!password.match(/(?=.*[a-z])/)) validationErrorIndexes.push(2);
  if (!password.match(/(?=.*[A-Z])/)) validationErrorIndexes.push(3);
  if (!password.match(/(?=.*[@$!%*#?&])/)) validationErrorIndexes.push(4);
  if (!password.match(/^\S*$/)) validationErrorIndexes.push(5);

  return validationErrorIndexes;
}

const FormFieldPassword = ({ name, placeholder, label, tabIndex, shouldValidatePassword, forgotPassword }: Props) => {
  const [field, meta] = useField(name);
  const [isPassShown, setPassShown] = useState(false);
  const { navStore: { togglePasswordResetFormShown } } = useStore();

  // to switch between show/hide password
  let inputTypeToDisplay = 'password';

  if (isPassShown) {
    inputTypeToDisplay = 'text';
  }

  let validationErrorIndexes: number[] = [];

  if (shouldValidatePassword) {
    validationErrorIndexes = ValidatePassword(field.value);
  }

  const uuid = v4();

  function handlePassResetClick(e: any): void {
    e.preventDefault();

    togglePasswordResetFormShown();
  }

  return (
    <FieldPasswordContainer>
      <InputContainer error={meta.touched && !!meta.error}>
        <TextLabel htmlFor={name + uuid}>{label}</TextLabel>
        {forgotPassword && <Link onClick={(e) => handlePassResetClick(e)} href={""}>Forgot your password?</Link>}
        <input
          tabIndex={tabIndex ?? -1}
          type={inputTypeToDisplay}
          id={name + uuid}
          placeholder={placeholder}
          required
          {...field}
          formNoValidate={true}
        />
        <IconsContainer>
          {<PassVisibilityIcon onClick={() => setPassShown(!isPassShown)} type={isPassShown ? 'hide' : 'show'} />}
        </IconsContainer>
      </InputContainer>
      {(field.value.length === 0 || !shouldValidatePassword) && meta.touched && !!meta.error &&
        (<TextFormError>{meta.error}</TextFormError>)}


      {shouldValidatePassword && field.value.length > 0 && validationErrorIndexes.length > 0 &&
        <PasswordValidator validationErrorIndexes={validationErrorIndexes} />}
    </FieldPasswordContainer>
  )
}

export default observer(FormFieldPassword)