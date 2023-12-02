import { makeAutoObservable } from "mobx";
import i18n from "../../i18n";

interface Language {
  languageLabel: string;
  code: string;
}

interface localizationAttribute {
  value: string;
  label: string;
}

export default class LocalizationsStore {

  availableCountries: localizationAttribute[] = [
    {value: 'US', label: 'USA'},
    {value: 'CA', label: 'Canada'},
    {value: 'UK', label: 'Ukraine'}];

  availableLocalizations: Language[] = [
  {code: "en", languageLabel: "English"},
  {code: "uk", languageLabel: "Ukrainian"},
  {code: "ru", languageLabel: "Russian"}];

  availableCurrencies: localizationAttribute[] = [
    {value: "USD", label: "USD"},
    {value: "CAD", label: "CAD"},
    {value: "UAH", label: "UAH"}];

  selectedLocalizationIndex: number = 0;

  get selectedLocalization() {
    return this.availableLocalizations[this.selectedLocalizationIndex];
  }

  getAvailableCountries() {
    return this.availableCountries;
  }

  getAvailableLocalizations() {
    return this.availableLocalizations;
  }

  getAvailableCurrencies() {
    return this.availableCurrencies;
  }

  constructor() {
    makeAutoObservable(this);
  }

  selectLocalization = async (index: number) => {
    this.selectedLocalizationIndex = index;
    await i18n.changeLanguage(this.availableLocalizations[index].code);
  }
}
