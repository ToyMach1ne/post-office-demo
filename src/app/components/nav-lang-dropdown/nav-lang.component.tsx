import { NavLangButton, NavLangContainer, NavLangMenu, NavLangOption } from "./nav-lang.styles";
import { useEffect, useRef, useState } from "react";
import { TextNavMenu } from "../../common/typography/typography.styles";
import { ReactComponent as GlobusIcon } from "../../assets/globus-icon.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/arrow-down-icon.svg";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const NavLangDropdown = () => {

  const { localizationsStore: { availableLocalizations, selectedLocalization, selectLocalization }} = useStore();
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <NavLangContainer ref={dropdownRef}>
      <NavLangButton onClick={() => setIsOpened(!isOpened)}>
        <GlobusIcon />
        <TextNavMenu>{selectedLocalization.code.toLocaleUpperCase()}</TextNavMenu>
        <ArrowDownIcon />
      </NavLangButton>
      <NavLangMenu isOpened={isOpened}>
        {availableLocalizations.map((l, i) => 
          <NavLangOption 
            onClick={() => selectLocalization(i)}
            key={l.code} 
            isSelected={selectedLocalization.code === l.code}>
              {l.code.toLocaleUpperCase()} - {l.languageLabel}
          </NavLangOption>)}
      </NavLangMenu>
    </NavLangContainer>
  );
}

export default observer(NavLangDropdown);