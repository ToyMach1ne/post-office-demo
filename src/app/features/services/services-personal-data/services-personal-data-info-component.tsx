import {
  PersonalDataRow,
  PersonalDataLabelOpt,
  PersonalDataOpt,
} from "./services-personal-data-component-styles";
import { useStore } from "../../../stores/store";

// Info Component of Personal Data
export const PersonalDataInfo = () => {
  const {
    userStore: { user },
  } = useStore();
  return (
    <>
      <PersonalDataRow>
        <PersonalDataLabelOpt>Email</PersonalDataLabelOpt>
        <PersonalDataOpt>{user?.email ?? ""}</PersonalDataOpt>
      </PersonalDataRow>
      <PersonalDataRow>
        <PersonalDataLabelOpt>Phone Number</PersonalDataLabelOpt>
        <PersonalDataOpt>+{user?.phone?.phone_number ?? ""}</PersonalDataOpt>
      </PersonalDataRow>
    </>
  );
};
