import { Formik, FormikHelpers } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { useStore } from "../../stores/store";
import FormFieldText from "../../common/form-field-text/form-field-text.component";
import Button, { BUTTON_TYPES } from "../../common/button/button.component";
import { EditFormProps } from "../../features/services/services-subsection/services-subsection.component";
import PlacesFormFieldSearch from "../../common/form-field-places-search/form-field-places-search.component";
import { AddressDataValues } from "../../models/addressDataValues";
import { useEffect } from "react";

const validationSchema = Yup.object({
  address: Yup.string().required('This field cannot be empty!'),
  region: Yup.string().required('This field cannot be empty!'),
  city: Yup.string().required('This field cannot be empty!'),
  post_code: Yup.string().required('This field cannot be empty!'),
  street: Yup.string().required('This field cannot be empty!'),
  building: Yup.string().required('This field cannot be empty!'),
  section: Yup.string().notRequired(),
  apartment: Yup.string().notRequired(),
})

const MyAddressEditForm = ({onCancel}: EditFormProps) => {

  const { 
    userStore: { isLoadingUser, updateAddress },
    placesSearchStore: { address, city, zipCode, region, street, building, apartment, section, setUserPlaceDetails, setPlaceDetails }
  } = useStore();

  useEffect(() => {
    // On the first run init place values in PlacesSearchStore based on current user. 
    // Then they will be updated based on response from Places API
    setUserPlaceDetails();

    // Clear PlacesSearchStore when form is closed
    return () => { setPlaceDetails(null); }
  }, [setPlaceDetails, setUserPlaceDetails])

  const handleFormSubmit = async (formValues: AddressDataValues, formikHelpers: FormikHelpers<any>) => {
    await updateAddress(formValues);
    onCancel();
    formikHelpers.resetForm();
  }

  const initialValues: AddressDataValues & { address: string } = {
    address: address,
    region: region,
    city: city,
    post_code: zipCode,
    street: street,
    building: building,
    section:  section,
    apartment: apartment,
  }

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values, helpers) => handleFormSubmit(values, helpers)}>
    {
      ({ handleSubmit, isValid, isSubmitting, resetForm }) => (
        <form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="inputs">
            <PlacesFormFieldSearch name='address'
              placeholder=''
              label="Address"
              onSearchFinished={() => { resetForm(); }}
              tabIndex={1} />
            
            <FormFieldText name='region'
              placeholder=''
              label="Province/State/Region"
              tabIndex={2} />

            <FormFieldText name='city'
              placeholder=''
              label="City"
              tabIndex={3} />

            <FormFieldText name='post_code'
              placeholder=''
              label="ZIP-code"
              tabIndex={4} />

            <FormFieldText name='street'
              placeholder=''
              label="Street"
              tabIndex={5} />

            <FormFieldText name='building'
              placeholder=''
              label="Building"
              tabIndex={6} />

            <FormFieldText name='section'
              placeholder=''
              label="Section"
              tabIndex={7} />

            <FormFieldText name='apartment'
              placeholder=''
              label="Apartment"
              tabIndex={8} />
          </div>

          <div className="buttons">
            <Button buttonType={BUTTON_TYPES.inverted} disabled={isSubmitting} tabIndex={9} onClick={() => onCancel()}>Cancel</Button>
            <Button isLoading={isLoadingUser} disabled={isSubmitting || !isValid} type="submit" tabIndex={10}>Save changes</Button>
          </div>
        </form>
      )
    }
    </Formik>
  )
}

export default observer(MyAddressEditForm);