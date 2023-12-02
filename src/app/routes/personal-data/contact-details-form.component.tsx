import { Formik, FormikHelpers } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { useStore } from "../../stores/store";
import FormFieldText from "../../common/form-field-text/form-field-text.component";
import Button, { BUTTON_TYPES } from "../../common/button/button.component";
import { EditFormProps } from "../../features/services/services-subsection/services-subsection.component";
import { ContactDetailsValues } from "../../models/contactDetailsValues";
import FormFieldPhone from "../../common/form-field-phone/form-field-phone.component";
import { useCallback, useState } from "react";

const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[+0-9]{6,15}$/, 'Invalid phone number!')
    .required('This field cannot be empty!'),

  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Wrong email format!')
    .required('This field cannot be empty!'),
})

const ContactDetailsEditForm = ({onCancel}: EditFormProps) => {

  const { userStore: {user, isLoadingUser, updateContactInfo } } = useStore();
  const [selectedCountryCode, setSelectedCountryCode] = useState(user?.phone?.country_code);

  const onSelectedCountryCodeChangedHandler = useCallback((cc: string) => setSelectedCountryCode(cc), []);

  const handleFormSubmit = async (formValues: { phone: string, email: string }, formikHelpers: FormikHelpers<any>) => {
    await updateContactInfo({...formValues, phone_country_code: selectedCountryCode! } as ContactDetailsValues);
    onCancel();
    formikHelpers.resetForm();
  }

  const initialValues: { phone: string, email: string } = {
    phone: user?.phone?.phone_number ?? "",
    email: user?.email ?? "",
  }

  return (
    <Formik
    enableReinitialize
    validationSchema={validationSchema}
    initialValues={initialValues}
    onSubmit={(values, helpers) => handleFormSubmit(values, helpers)}>
    {
      ({ handleSubmit, isValid, isSubmitting, dirty }) => (
        <form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="inputs">
            <FormFieldText name='email'
              placeholder=''
              label="Email"
              tabIndex={1} />

            <FormFieldPhone name='phone'
              placeholder='(555) 000 - 0000'
              label="Phone Number"
              userCountryCode={selectedCountryCode}
              onCountryCodeChanged={onSelectedCountryCodeChangedHandler}
              tabIndex={2} />
          </div>

          <div className="buttons">
            <Button buttonType={BUTTON_TYPES.inverted} disabled={isSubmitting} tabIndex={3} onClick={() => onCancel()}>Cancel</Button>
            <Button isLoading={isLoadingUser} 
              disabled={isSubmitting || 
                (!dirty && selectedCountryCode === user?.phone?.country_code) ||
                !isValid } 
                type="submit"
                tabIndex={4}>Save changes</Button>
          </div>
        </form>
      )
    }
    </Formik>
  )
}

export default observer(ContactDetailsEditForm);