import { TextLabel } from "../typography/typography.styles";
import { InputContainer } from "../form-field-text/form-field-text.styles";
import { ReactComponent as SearchIcon } from "../../assets/magnifying-glass-icon.svg";
import { v4 } from 'uuid';
import { InputSearchContainer, IconContainer } from "./input-search.styles";
import { useEffect, useRef } from "react";

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  tabIndex?: number;
  focusOnOpen?: boolean;
  onChange?: (value: string) => void;
}

const InputSearch = ({ name, placeholder, label, type, tabIndex, focusOnOpen, onChange }: Props) => {  
  const uuid = v4();
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Set focus on the input element when the component mounts
    focusOnOpen && inputRef && inputRef.current && (inputRef.current as any).focus();
  }, [focusOnOpen]);
  
  const onChangeHandler = (e: any) => {
    onChange && onChange(e.target.value);
  }
  
  return (
    <InputSearchContainer>
      <InputContainer error={false}>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <TextLabel htmlFor={name + uuid}>{label}</TextLabel>
        <input
          ref={inputRef}
          onChange={onChangeHandler}
          tabIndex={tabIndex ?? -1}
          type={type}
          id={name + uuid}
          placeholder={placeholder}
          required
          formNoValidate={true}
        />
      </InputContainer>
    </InputSearchContainer>
  )
}

export default InputSearch;
