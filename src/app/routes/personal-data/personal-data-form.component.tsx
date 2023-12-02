import { Formik, FormikHelpers } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { useStore } from "../../stores/store";
import FormFieldText from "../../common/form-field-text/form-field-text.component";
import Button, { BUTTON_TYPES } from "../../common/button/button.component";
import { EditFormProps } from "../../features/services/services-subsection/services-subsection.component";
import { PersonalDataValues } from "../../models/personalDataValues";

// Regex for only latin and cyrrilic letter (case-insensitive) along 
// with space, period, apostrophe, and hyphen, with a minimum length of 2 characters.
const nameRegex = /^[\u0041-\u005a\u0061-\u007a\u0400-\u04FF\s.'’‘-]{2,}$/u;

const validationSchema = Yup.object({
  first_name: Yup.string()
    .matches(nameRegex, 'Please enter your First Name')
    .required('Please enter your First Name'),

  middle_name: Yup.string()
    .matches(nameRegex, 'Please enter your Middle Name')
    .notRequired(),

  last_name: Yup.string()
    .matches(nameRegex, 'Please enter your Last Name')
    .required('Please enter your Last Name'),
})

const PersonalDataEditForm = ({onCancel}: EditFormProps) => {

  const { userStore: {user, isLoadingUser, updatePersonalData} } = useStore();


  const handleFormSubmit = async (formValues: PersonalDataValues, formikHelpers: FormikHelpers<any>) => {
    await updatePersonalData(formValues);
    onCancel();
    formikHelpers.resetForm();
  }

  const initialValues: PersonalDataValues = {
    first_name: user?.first_name ?? "",
    middle_name: user?.middle_name ?? "",
    last_name: user?.last_name ?? "",
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
            <FormFieldText name='first_name'
              placeholder=''
              label="First Name*"
              tabIndex={1} />

            <FormFieldText name='middle_name'
              placeholder=''
              label="Middle Name"
              tabIndex={2} />

            <FormFieldText name='last_name'
              placeholder=''
              label="Last Name*"
              tabIndex={3} />
          </div>

          <div className="buttons">
            <Button buttonType={BUTTON_TYPES.inverted} disabled={isSubmitting} tabIndex={4} onClick={() => onCancel()}>Cancel</Button>
            <Button isLoading={isLoadingUser} disabled={isSubmitting || !dirty || !isValid} type="submit" tabIndex={5}>Save changes</Button>
          </div>
        </form>
      )
    }
    </Formik>
  )
}

export default observer(PersonalDataEditForm);