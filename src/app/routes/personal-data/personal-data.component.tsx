import { useMemo } from "react";
import { useStore } from "../../stores/store";
import ServicesSubsection, { SubSectionData } from "../../features/services/services-subsection/services-subsection.component";
import PersonalDataEditForm from "./personal-data-form.component";
import ContactDetailsEditForm from "./contact-details-form.component";
import MyAddressEditForm from "./my-address-form.component";
import { PersonalDataContainer } from "./personal-data.styles";
import { observer } from "mobx-react-lite";

const PersonalData = () => {

  const { userStore: { user, getAddress }} = useStore();

  const personalDataSectionData = useMemo(() => ([
    {
      label: "First name",
      value: user?.first_name
    },
    {
      label: "Last name",
      value: user?.last_name
    },
    {
      label: "Middle name",
      value: user?.middle_name
    }
  ] as SubSectionData[]), [user]);

  const contactDetailsSectionData = useMemo(() => ([
    {
      label: "Email",
      value: user?.email
    },
    {
      label: "Phone number",
      value: user?.phone?.phone_number ? "+" + user?.phone?.phone_number : ""
    },
  ] as SubSectionData[]), [user]);

  const myAddressSectionData = useMemo(() => ([
    {
      label: "Province / State",
      value: user?.address?.region ?? ""
    },
    {
      label: "City",
      value: user?.address?.city ?? ""
    },
    {
      label: "Zip-code",
      value: user?.address?.post_code ?? ""
    },
    {
      label: "Address",
      value: getAddress() ?? ""
    }
  ] as SubSectionData[]), [user, getAddress]);

  if (!user) return null;

  return (
    <PersonalDataContainer>
      <ServicesSubsection title={"Personal data"} data={personalDataSectionData} EditForm={PersonalDataEditForm} />
      <ServicesSubsection title={"Contact details"} data={contactDetailsSectionData} EditForm={ContactDetailsEditForm}/>
      <ServicesSubsection title={"My address"} data={myAddressSectionData} EditForm={MyAddressEditForm}/>
    </PersonalDataContainer>
  )
}

export default observer(PersonalData);