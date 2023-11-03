import { Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { HeaderMain } from "../../common/typography/typography.styles";
import Button from "../../common/button/button.component";
import FormFieldPassword from "../../common/form-field-password/form-field-password.component";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContainer } from "../authorization/authorization.styles";
import { CloudPassRestoreContainer } from "./password-cloud-restore.styles";

const CloudPasswordRestore = () => {

  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') ?? "";
  const oobCode = searchParams.get('oobCode') ?? "";
  const lang = searchParams.get('lang') ?? "";
  console.log('mode: ', mode);
  console.log('oobCode: ', oobCode);
  console.log('lang: ', lang);

  const { userStore: { passwordResetProgress, resetPasswordFinish, changePassword } } = useStore();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?!.*\s).{8,30}$/, 'Password is incorrect')
      .required('Password is required'),

    confirmPassword: Yup.string().test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    }),
  })

  const handleFormSubmit = async (formValues: any, formikHelpers: FormikHelpers<any>) => {
    switch (mode) {
      case 'resetPassword':
        try {
          await resetPasswordFinish(oobCode, formValues.password);
        } catch (error) {
          alert(error);
          console.error(error);
        }
        break;

      default:
        await changePassword(formValues.password)
        break;
    }
    formikHelpers.resetForm();
    navigate("/auth/pswd/success");
  }

  let initialValues = {
    password: "",
    confirmPassword: "",
  }

  return (
    <AuthContainer>
      <CloudPassRestoreContainer>
        <HeaderMain>Restore Password</HeaderMain>

        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, helpers) => handleFormSubmit(values, helpers)}>
          {
            ({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

                <FormFieldPassword
                  shouldValidatePassword
                  name='password'
                  placeholder='Enter your new passsord'
                  label="New password"
                  tabIndex={1} />

                <FormFieldPassword
                  name='confirmPassword'
                  placeholder='Repeat new password'
                  label="Repeat new password"
                  tabIndex={2} />

                <Button isLoading={passwordResetProgress} disabled={isSubmitting || !dirty || !isValid} type="submit" tabIndex={3}>Save</Button>
              </form>
            )
          }
        </Formik>
      </CloudPassRestoreContainer>
    </AuthContainer>
  )
}

export default observer(CloudPasswordRestore);