import { useField } from "formik";
import {
  FieldContainerStyled,
  PhoneInputsContainer,
} from "./services-personal-data-component-styles";
import { TextFormError } from "../../../common/typography/typography.styles";
import { InputContainer } from "../../../common/form-field-text/form-field-text.styles";
import { v4 } from "uuid";

interface InputProps {
  name: string;
  className?: string;
  countryCode?: string;
}

//Form Component Phone
export const FormFieldCountryCode = ({
  name,
  className,
  countryCode,
}: InputProps) => {
  const [field, meta] = useField(name);

  const uuid = v4();

  return (
    <FieldContainerStyled className="hidden">
      <InputContainer error={meta.touched && !!meta.error}>
        <PhoneInputsContainer>
          <input id={name + uuid} value={countryCode} />
        </PhoneInputsContainer>
      </InputContainer>

      {meta.touched && !!meta.error && (
        <TextFormError>{meta.error}</TextFormError>
      )}
    </FieldContainerStyled>
  );
};
