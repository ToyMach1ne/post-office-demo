import { TextFormError, TextLabel } from "../typography/typography.styles";
import { InputContainer } from "../form-field-text/form-field-text.styles";
import { ReactComponent as SearchIcon } from "../../assets/magnifying-glass-icon.svg";
import { FieldSearchContainer, IconContainer } from "./form-field-search.styles";
import { useField } from "formik";

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  tabIndex?: number;
  onChange?: (value: string) => void;
}

const FormFieldSearch = ({ name, placeholder, label, type, tabIndex, onChange }: Props) => {

  const [field, meta] = useField(name);

  return (
    <FieldSearchContainer mb={"2.4rem"}>
      <TextLabel htmlFor={name}>{label}</TextLabel>
      <InputContainer error={false}>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <input
          {...field}
          tabIndex={tabIndex ?? -1}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required
          formNoValidate={true}
        />
      </InputContainer>

      {meta.touched && !!meta.error &&
        (<TextFormError>{meta.error}</TextFormError>)}
    </FieldSearchContainer>
  )
}

export default FormFieldSearch;
