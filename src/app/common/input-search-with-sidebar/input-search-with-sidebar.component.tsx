import { TextFormError, TextLabel, TextSearchOption } from "../typography/typography.styles";
import { InputContainer } from "../form-field-text/form-field-text.styles";
import { ReactComponent as SearchIcon } from "../../assets/magnifying-glass-icon.svg";
import { InputSearchContainer } from "./input-search-with-sidebar.styles";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useStore } from "../../stores/store";
import InputSearch from "../input-search/input-search.component";
import Sidebar from "../sidebar-right/sidebar.component";
import { DropdownOption, DropdownPopup } from "../form-field-phone/phone-code-dropdown/phone-code-dropdown.styles";
import { IconContainer } from "../input-search/input-search.styles";
import { observer } from "mobx-react-lite";

interface Props<T> {
  inputValue?: string;
  name: string;
  placeholder: string;
  sidebarTitle: string;
  sidebarInputPlaceholder: string;
  label?: string;
  tabIndex?: number;
  disabled?: boolean;
  onMainInputClick?: MouseEventHandler<HTMLInputElement>;

  // Allows user to modify selected option manually
  canModifyInput?: boolean;
  onInputChange?: (inputValue: string) => void;
  
  // where to get search options and how to filter them and how to display
  displayAllOptionsWithEmptyFilter?: boolean;
  getSearchOptions: (inputFilterValue?: string) => Promise<T[]>
  getKeyForSearchOption?: (option: T) => string
  getDisplayValueForSearchOption?: (option: T) => string
  onSearchOptionSelected?: (option: T) => void
  onSearchFinished?: () => void

  // selected input validation
  mainInputValidationPredicate?: (inputValue?: string) => boolean;
  errorMessage?: string;
}


// TODO: Improvements:
// 1) Should add possibility to modify selected value manually
// 2) Should run validation only after sidebar was closed

// Generic search input which opens sidebar with search (non-field version)
const InputSearchWithSidebar = <T, >({ name,
  inputValue, 
  placeholder, 
  label,
  sidebarTitle,
  sidebarInputPlaceholder,
  tabIndex, 
  mainInputValidationPredicate,
  errorMessage,
  disabled,
  canModifyInput,
  onInputChange,
  onMainInputClick,
  displayAllOptionsWithEmptyFilter, 
  getSearchOptions,
  getKeyForSearchOption,
  getDisplayValueForSearchOption,
  onSearchOptionSelected,
  onSearchFinished
 }: Props<T>) => {

  const { navStore: { isSidebarOpened, toggleSidebarByName } } = useStore();

  const [searchOptions, setSearchOptions] = useState<T[]>([]);
  const [touched, setTouched] = useState(false);
  const [isError, setIsError] = useState(false);

  const mainInputRef = useRef(null);

  const handleBlur = (e: any) => {
    canModifyInput && setTouched(true);
  };

  useEffect(() => {
    if (displayAllOptionsWithEmptyFilter) {
      getSearchOptions().then(p => setSearchOptions(p));
    }
    // eslint-disable-next-line
  }, [getSearchOptions])

  useEffect(() => {
    const validationFailed = touched && 
        errorMessage && 
        mainInputValidationPredicate && !mainInputValidationPredicate(inputValue);
    setIsError(validationFailed ? true : false);
  }, [touched, inputValue, errorMessage, mainInputValidationPredicate])


  const modifyListOfDisplayedOptions = async (value?: string) => {
    if (value || displayAllOptionsWithEmptyFilter) {
      setSearchOptions(await getSearchOptions(value));
    } else {
      setSearchOptions([]);
    }
  }

  const handleSearchOptionSelected = (option: T) => {
    onSearchOptionSelected && onSearchOptionSelected(option);
    onSearchFinished && onSearchFinished(); 
    toggleSidebarByName(name);
    modifyListOfDisplayedOptions();
  }

  const handleMainInputChange = (e: any) => {
    canModifyInput && onInputChange && 
    onInputChange(e.target.value);
  }

  return (
    <InputSearchContainer mb={"2.4rem"} isDisabeld={disabled}>
      <TextLabel htmlFor={name}>{label}</TextLabel>
      <InputContainer
        onClick={() => !canModifyInput && !disabled && toggleSidebarByName(name)} 
        error={isError}>
        <IconContainer onClick={() => canModifyInput && !disabled && toggleSidebarByName(name)}>
          <SearchIcon />
        </IconContainer>
        <input
          style={{cursor: canModifyInput ? 'text': 'pointer'}} 
          ref={mainInputRef}
          disabled={disabled}
          onBlur={handleBlur}
          onClick={onMainInputClick}
          tabIndex={tabIndex ?? -1}
          type='text'
          id={name}
          name={name}
          value={inputValue ?? ''}
          onChange={handleMainInputChange}
          readOnly={!canModifyInput}
          placeholder={placeholder}
          required
          formNoValidate={true}
          autoComplete="off"
        />
      </InputContainer>

      <Sidebar name={name} withBlurredBackground header={sidebarTitle} onClose={() => { modifyListOfDisplayedOptions(); setTouched(true); }}>
        <InputSearch name={"search_" + sidebarTitle}
          placeholder={sidebarInputPlaceholder}
          focusOnOpen={true}
          onChange={(targetValue) => modifyListOfDisplayedOptions(targetValue)}
        />
        <DropdownPopup isOpened={isSidebarOpened}>
          {searchOptions.length > 0 && searchOptions.map((option) => 
            (<DropdownOption key={getKeyForSearchOption ? getKeyForSearchOption(option) : (option as string)} 
                              onClick={() => handleSearchOptionSelected(option)}>
              <TextSearchOption>{getDisplayValueForSearchOption ? getDisplayValueForSearchOption(option) : (option as string)}</TextSearchOption>
            </DropdownOption>)
          )}
        </DropdownPopup>
      </Sidebar>

      { 
        isError && (<TextFormError>{errorMessage}</TextFormError>)
      }
    </InputSearchContainer>
  )
}

export default observer(InputSearchWithSidebar);
