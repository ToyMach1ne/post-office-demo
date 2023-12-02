import { Formik, FormikHelpers } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { useStore } from "../../stores/store";
import FormFieldPassword from "../../common/form-field-password/form-field-password.component";
import Button, { BUTTON_TYPES } from "../../common/button/button.component";
import { EditFormProps } from "../../features/services/services-subsection/services-subsection.component";

const validationSchema = Yup.object({

  oldPassword: Yup.string()
    .required('Current password is required'),

  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?!.*\s).{8,30}$/, 'Password is incorrect')
    .required('Password is required'),

  confirmPassword: Yup.string().test('passwords-match', 'Passwords must match', function (value) {
    return this.parent.password === value    
  }),

})

const SecuritySettingsEditForm = ({onCancel}: EditFormProps) => {

  const { userStore: { isLoadingUser, changePassword} } = useStore();


  const handleFormSubmit = async ({oldPassword, password}: any, formikHelpers: FormikHelpers<any>) => {
    await changePassword(oldPassword, password);
    onCancel();
    formikHelpers.resetForm();
  }

  const initialValues: any = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
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
          <FormFieldPassword
              name='oldPassword'
              placeholder='Enter your current password'
              label="Enter your current password"
              tabIndex={1} />

            <FormFieldPassword
              shouldValidatePassword
              name='password'
              placeholder='Enter your passsord'
              label="New password"
              tabIndex={2} />

            <FormFieldPassword
              name='confirmPassword'
              placeholder='Repeat your password'
              label="Repeat the password"
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

export default observer(SecuritySettingsEditForm);