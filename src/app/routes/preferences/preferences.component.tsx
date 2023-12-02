import { useMemo } from "react";
import { useStore } from "../../stores/store";
import ServicesSubsection, { SubSectionData } from "../../features/services/services-subsection/services-subsection.component";
import {PreferencesContainer} from "./preferences.styles";
import { observer } from "mobx-react-lite";
import PreferencesDataForm from "./preferences-data-form.component";

const Preferences = () => {

  const { userStore: { user }, localizationsStore: { availableCountries, availableLocalizations } } = useStore();

  const preferencesDataSectionData = useMemo(() => ([
    {
      label: "Country",
      value: user?.country ? availableCountries.find((i) => i.value === user.country)?.label : user?.country
    },
    {
      label: "Language",
      value: user?.lang ? availableLocalizations.find((i) => i.code === user.lang)?.languageLabel : user?.lang
    },
    {
      label: "Currency",
      value: user?.currency
    },
    {
      label: "Measures",
      value: user?.measures == 1 ? 'kg/cm' : 'lb/ft'
    }
  ] as SubSectionData[]), [user]);

  if (!user) return null;

  return (
    <PreferencesContainer>

      <ServicesSubsection title={"Preferences"} data={preferencesDataSectionData} EditForm={PreferencesDataForm} />
    </PreferencesContainer>
  )
}

export default observer(Preferences);
