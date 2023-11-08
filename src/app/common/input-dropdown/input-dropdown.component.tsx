import { useState } from "react";
import { InputDropdownContainer } from "./input-dropdown.styles";
import { ReactComponent as ArrowDownIcon } from "../../assets/arrow-down-mini-icon.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/arrow-up-mini-icon.svg";
import Dropdown, { Option } from 'react-dropdown';
import { TextLabel } from "../typography/typography.styles";

interface Props {
  items: Option[];
  label: string;
  selectedIndexDefault?: number;
  onSelected?: () => {};
}

const InputDropdown = ({items, label, selectedIndexDefault = 0, onSelected = undefined}: Props) => {

  const [selectedIndex, setSelectedIndex] = useState(selectedIndexDefault);

  const onSelect = (arg: Option) => {
    console.log(arg);
  }

  return (
    <InputDropdownContainer>
      <TextLabel>{label}</TextLabel>
      <Dropdown options={items} 
        onChange={onSelect}  
        value={items[selectedIndex]} 
        placeholder="Select country"
        arrowClosed={<ArrowDownIcon />}
        arrowOpen={<ArrowUpIcon />} 
      />
    </InputDropdownContainer>
  )
}

export default InputDropdown;




