import { useField } from "formik";
import {
  FieldContainerStyled,
  PhoneInputsContainer,
} from "./services-personal-data-component-styles";
import {
  TextLabel,
  TextFormError,
} from "../../../common/typography/typography.styles";
import { InputContainer } from "../../../common/form-field-text/form-field-text.styles";
import { v4 } from "uuid";

interface InputProps {
  name: string;
  placeholder: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  code?: string;
  setCode?: (code: string) => void;
  countryCode?: string;
  setCountryCode?: (code: string) => void;
}

//Form Component Phone
export const FormFieldPhone = ({
  name,
  placeholder,
  label,
  children,
  className,
  code,
  setCode,
  countryCode,
  setCountryCode,
}: InputProps) => {
  const [field, meta] = useField(name);
  const fullInputVal = code + field.value;
  console.log(fullInputVal);

  const uuid = v4();

  return (
    <FieldContainerStyled>
      <InputContainer error={meta.touched && !!meta.error}>
        <TextLabel htmlFor={name + uuid}>{label}</TextLabel>
        <PhoneInputsContainer>
          {children}
          <input
            id={name + uuid}
            placeholder={placeholder}
            required
            {...field}
            formNoValidate={true}
          />
          <input
            id={name + uuid + 1}
            placeholder={placeholder}
            formNoValidate={true}
            value={fullInputVal}
            className="hidden"
          />
        </PhoneInputsContainer>
      </InputContainer>

      {meta.touched && !!meta.error && (
        <TextFormError>{meta.error}</TextFormError>
      )}
    </FieldContainerStyled>
  );
};
