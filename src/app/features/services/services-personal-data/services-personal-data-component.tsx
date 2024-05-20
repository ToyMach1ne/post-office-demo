import { useStore } from "../../../stores/store";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  PersonalDataContainer,
  LinkEdit,
  PersonalDataTitles,
} from "./services-personal-data-component-styles";
import { HeaderSecondary } from "../../../common/typography/typography.styles";
import { PersonalDataInfo } from "./services-personal-data-info-component";
import { PersonalDataForm } from "./services-personal-data-form-component";

//Main Component of Personal Data
const PersonalData = () => {
  const {
    userStore: { user },
  } = useStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <PersonalDataContainer>
        <PersonalDataTitles>
          <HeaderSecondary>Contact Details</HeaderSecondary>
          {!isOpen && (
            <LinkEdit onClick={(e) => setIsOpen(!isOpen)}>Edit</LinkEdit>
          )}
        </PersonalDataTitles>
        {!isOpen ? (
          <PersonalDataInfo />
        ) : (
          <PersonalDataForm setIsOpen={setIsOpen} />
        )}
      </PersonalDataContainer>
    </>
  );
};

export default observer(PersonalData);
