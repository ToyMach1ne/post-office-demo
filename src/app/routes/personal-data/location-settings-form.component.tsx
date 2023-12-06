import React, {useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Button, { BUTTON_TYPES } from "../../common/button/button.component";
import { EditFormProps } from "../../features/services/services-subsection/services-subsection.component";
import { PreferencesDataValues } from "../../models/preferencesDataValues";
import { Form, Radio, Select } from 'antd';
import InputSearchWithSidebar from "../../common/input-search-with-sidebar/input-search-with-sidebar.component";
import {countryInfoList} from "../../assets/data/countryInfo";
import {CountryListItem} from "../../models/countryListItem";
const { Option } = Select;

const LocationSettingsForm = ({ onCancel }: EditFormProps) => {
  const [form] = Form.useForm();
  const { userStore: { user, isLoadingUser, updatePreferences }, localizationsStore } = useStore();

  const initialCountry = localizationsStore.availableCountries.find((i) => i.countryCode === user?.country);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry ?? null);


  const initialValues = {
    country: user?.country,
    lang: user?.lang || "en",
    currency: user?.currency || "USD",
    measures: user?.measures || 1,
  };

  const languages = localizationsStore.getAvailableLocalizations().map(({ code, languageLabel }) => ({
    value: code,
    label: languageLabel,
  }));
  const currencies = localizationsStore.getAvailableCurrencies();

  const handleFormSubmit = async (values: PreferencesDataValues) => {
    try {
      await updatePreferences(values);
      onCancel();
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      form.setFieldValue('country', selectedCountry.countryCode);
    }
  }, [selectedCountry, form]);

  return (
      <Form initialValues={initialValues} layout="vertical" form={form} onFinish={(values) => handleFormSubmit(values)}>
        <div className="location-inputs">
          <Form.Item label="Country" name="country">
            <InputSearchWithSidebar<CountryListItem>
                name="country"
                inputValue={(selectedCountry?.flagEmoji || '') + (' ' + selectedCountry?.countryName || '')}
                placeholder=""
                sidebarTitle="Country"
                displayAllOptionsWithEmptyFilter
                onSearchOptionSelected={(selectedCountry: CountryListItem) => setSelectedCountry(selectedCountry)}
                sidebarInputPlaceholder="Start typing country"
                getSearchOptions={(filter) => filter 
                  ? Promise.resolve(countryInfoList.filter((i) => i.countryName.toLowerCase().includes(filter.toLocaleLowerCase()))) 
                  : Promise.resolve(countryInfoList)}
                getKeyForSearchOption={(country: CountryListItem) => country.countryCode}
                getDisplayValueForSearchOption={(country) => `${country.flagEmoji} ${country.countryName}`}
            />
          </Form.Item>

          <Form.Item label="Language" name="lang">
            <Select
                size="large"
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
                size="large"
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

export default observer(LocationSettingsForm);
