import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Button, { BUTTON_TYPES } from "../../common/button/button.component";
import { EditFormProps } from "../../features/services/services-subsection/services-subsection.component";
import { PreferencesDataValues } from "../../models/preferencesDataValues";
import { Form, Radio, Select } from 'antd';
const { Option } = Select;

const PreferencesDataForm = ({ onCancel }: EditFormProps) => {
  const [form] = Form.useForm();
  const { userStore: { user, isLoadingUser, updatePreferences }, localizationsStore } = useStore();

  const handleToggle = (unit: string) => {
    return unit;
  };

  const initialValues = {
    country: user?.country ?? "US",
    lang: user?.lang ?? "en",
    currency: user?.currency.toUpperCase() ?? "USD",
    measures: user?.measures ?? 1,
  };

  const languages = localizationsStore.getAvailableLocalizations().map(({ code, languageLabel }) => ({
    value: code,
    label: languageLabel,
  }));
  const currencies = localizationsStore.getAvailableCurrencies();

  const countries = localizationsStore.getAvailableCountries();

  const handleFormSubmit = async (values: PreferencesDataValues) => {
    try {
      await updatePreferences(values);
      onCancel();
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <Form initialValues={initialValues} layout="vertical" form={form} onFinish={(values) => handleFormSubmit(values)}>
        <div className="inputs">
          <Form.Item label="Country" name="country">
            <Select
                dropdownStyle={{fontFamily: 'Montserrat'}}
                placeholder="Select country"
            >
              {countries.map((country) => (
                  <Option key={country.value} value={country.value}>
                    {country.label}
                  </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Language" name="lang">
            <Select
                dropdownStyle={{fontFamily: 'Montserrat'}}
                placeholder="Select language"
            >
              {languages.map((language) => (
                  <Option key={language.value} value={language.value}>
                    {language.label}
                  </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Currency" name="currency">
            <Select
                dropdownStyle={{fontFamily: 'Montserrat'}}
                placeholder="Select currency">
              {currencies.map((currency) => (
                  <Option key={currency.value} value={currency.value}>
                    {currency.label}
                  </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

          <Form.Item label="Measures" name="measures">
            <Radio.Group value={initialValues.measures}>
              <Radio value={1}>kg / cm</Radio>
              <Radio value={2}>lb / ft</Radio>
            </Radio.Group>
          </Form.Item>

        <div className="buttons">
          <Button buttonType={BUTTON_TYPES.inverted} tabIndex={4} onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button isLoading={isLoadingUser} type="submit" tabIndex={5}>
            Save changes
          </Button>
        </div>
      </Form>
  );
};

export default observer(PreferencesDataForm);
