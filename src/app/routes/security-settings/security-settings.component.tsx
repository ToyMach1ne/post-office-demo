import { useEffect, useMemo, useState } from "react";
import { useStore } from "../../stores/store";
import ServicesSubsection, { SubSectionData } from "../../features/services/services-subsection/services-subsection.component";
import { observer } from "mobx-react-lite";
import { SecuritySettingsContainer } from "./security-settings.styles";
import SecuritySettingsEditForm from "./security-settings-form.component";
import { isPasswordProviderAvailableForUser } from "../../utils/firebase/firebase.utils";
import DeleteAccount from "../delete-account/delete-account.component";

const SecuritySettings = () => {

  const { userStore: { user }, commonStore: {firebaseUser}} = useStore();
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    if (user) {
      setShowPasswordChange(isPasswordProviderAvailableForUser(firebaseUser));
    }
  }, [user, firebaseUser])

  const securitySettingsSectionData = useMemo(() => ([
    {
      label: "Your password",
      value: "●●●●●●●●●●●"
    }
  ] as SubSectionData[]), []);

  if (!user || !firebaseUser) return null;

  return (
    <SecuritySettingsContainer>
      { showPasswordChange &&
      <ServicesSubsection title={"Security settings"} data={securitySettingsSectionData} EditForm={SecuritySettingsEditForm} /> }
      <DeleteAccount/>
    </SecuritySettingsContainer>
  )
}

export default observer(SecuritySettings);
