import { makeAutoObservable } from "mobx";
import i18n from "../../i18n";

interface Language {
  languageLabel: string;
  code: string;
}

export default class LocalizationsStore {

  availableLocalizations: Language[] = [
  {code: "en", languageLabel: "English"},
  {code: "uk", languageLabel: "Ukrainian"},
  {code: "de", languageLabel: "German"}];

  selectedLocalizationIndex: number = 0;

  get selectedLocalization() {
    return this.availableLocalizations[this.selectedLocalizationIndex];
  }

  constructor() {
    makeAutoObservable(this);
  }

  selectLocalization = async (index: number) => {
    this.selectedLocalizationIndex = index;
    await i18n.changeLanguage(this.availableLocalizations[index].code);
  }
}