import { useState } from "react";
import { useStore } from "../../../stores/store";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  PersonalFormRow,
  PersonalFormButtonsContainer,
} from "./services-personal-data-component-styles";
import FormFieldText from "../../../common/form-field-text/form-field-text.component";
import Button, { BUTTON_TYPES } from "../../../common/button/button.component";
import { FormFieldPhone } from "./services-personal-data-form-phone-component";
import { FormFieldCCode } from "./services-personal-data-form-code-input";
import { FormFieldCountryCode } from "./services-personal-data-form-countryCode-component";
import { countryInfoList } from "../../../assets/data/countryInfo";

interface PersonalDataFormValues {
  email: string;
  phone: string;
  countryCode: string;
}

interface UserInfoProps {
  isOpen?: boolean;
  setIsOpen?: any;
}

function removeCodeFromPhone(phone: string, countryCode: string) {
  let modifiedPhone = phone;
  for (let i = 0; i <= countryInfoList.length; i++) {
    const item = countryInfoList[i];
    if (item.countryCode === countryCode) {
      modifiedPhone = modifiedPhone.replace(item.callingCode, "");
      break;
    }
  }

  return modifiedPhone;
}

function getCallingCode(phone: string, countryCode: string) {
  let callingCode;
  for (let i = 0; i <= countryInfoList.length; i++) {
    const item = countryInfoList[i];
    if (item.countryCode === countryCode) {
      callingCode = item.callingCode;
      break;
    }
  }

  return `+${callingCode}`;
}

//Form Component of Personal Data
export const PersonalDataForm = ({ setIsOpen }: UserInfoProps) => {
  const {
    userStore: { user, isLoadingUser, updateUserInfo },
  } = useStore();
  const [code, setCode] = useState<string>(
    () =>
      getCallingCode(
        user?.phone?.phone_number ?? "",
        user?.phone?.country_code ?? ""
      ) ?? "+380"
  );
  const [countryCode, setCountryCode] = useState<string>(
    user?.phone?.country_code ?? "UA"
  );

  let minInputValue = 10 - code.replace(/[+-]/g, "").length;
  let maxInputValue = 12 - code.replace(/[+-]/g, "").length;

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is incorrect"
      )
      .required("Email is required."),

    phone: Yup.string()
      .required("Phone is required.")
      .min(minInputValue, "Phone must be at least 10 characters")
      .max(maxInputValue, "Phone must be at most 12 characters"),

    countryCode: Yup.string().required("Code is required."),
  });

  let formInputs: PersonalDataFormValues = {
    email: user?.email ?? "",
    phone: removeCodeFromPhone(
      user?.phone?.phone_number ?? "",
      user?.phone?.country_code ?? ""
    ),
    countryCode: user?.phone?.country_code ?? "",
  };

  function handleSubmit({ email, phone }: PersonalDataFormValues) {
    minInputValue = 10;
    maxInputValue = 12;
    updateUserInfo(email, code.replace(/[+-]/g, "") + phone, countryCode);
    setIsOpen(false);
  }

  return (
    <>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={formInputs}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <PersonalFormRow>
              <FormFieldText
                name="email"
                placeholder="example@email.com"
                label="Email"
              />

              <FormFieldPhone
                name="phone"
                placeholder="Your Phone Number"
                label="Phone Number"
                code={code}
                setCode={setCode}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
              >
                <FormFieldCCode
                  type="text"
                  name="code_input"
                  code={code}
                  setCode={setCode}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                />
              </FormFieldPhone>

              <FormFieldCountryCode
                name="countryCode"
                countryCode={countryCode}
              />
            </PersonalFormRow>

            <PersonalFormButtonsContainer>
              <Button
                isLoading={isLoadingUser}
                type="base"
                buttonType={BUTTON_TYPES.inverted}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoadingUser}
                disabled={isSubmitting || !dirty || !isValid}
                type="submit"
                ml="15px"
              >
                Save Changes
              </Button>
            </PersonalFormButtonsContainer>
          </form>
        )}
      </Formik>
    </>
  );
};
