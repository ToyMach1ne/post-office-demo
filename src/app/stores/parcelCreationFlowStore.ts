import { makeAutoObservable, runInAction } from "mobx";
import { handleError } from "./userStore";
import { ParcelDimenstions, ShipmentCountryInfo } from "../models/shipmentCountryInfo";
import agent from "../api/agent";

type StepNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface ParcelCreationStep {
  stepNumber: StepNumber;
  stepTitle: string;
}

export default class ParcelCreationFlowStore {
  
  currentStepNumber: StepNumber = 1;
  shipmentCountries: ShipmentCountryInfo[] = [];
  countryDeparture: ShipmentCountryInfo | null = null;
  countryDestination: ShipmentCountryInfo | null = null;
  parcelDimensions: ParcelDimenstions | null = null;

  parcelCreationSteps: ParcelCreationStep[] = [
    { stepNumber: 1, stepTitle: "Parcel details"},
    { stepNumber: 2, stepTitle: "Delivery"},
    { stepNumber: 3, stepTitle: "Sender"},
    { stepNumber: 4, stepTitle: "Reciever"},
    { stepNumber: 5, stepTitle: "Signature"},
    { stepNumber: 6, stepTitle: "Summary"},
  ]

  
  get maxStep() {
    return this.parcelCreationSteps.length;
  }

  constructor() {
    makeAutoObservable(this);
  }

  validateCurrentStep = () => {
    switch (this.currentStepNumber) {
      case 1:
        return this.countryDeparture && this.countryDestination && 
               this.countryDeparture.zipCode && this.countryDestination.zipCode &&
               this.countryDeparture.countryCode && this.countryDestination.countryCode ? true : false;
               // TODO: add validation for parcelDimensions
      default:
        return true;
    }
  }

  getParcelCreationStep(number: StepNumber) {
    return this.parcelCreationSteps[number];
  }

  loadShipmentCountries = async () => {
    try {
        const countries = await agent.Shipment.parcelDetails() ?? [];
        runInAction(() => {
          this.shipmentCountries = countries;
        })
    } catch (error) {
      handleError(error);
    }
  }

  setDepartureShipmentCountry = (country: ShipmentCountryInfo | null) => {
    this.countryDeparture = country;
  }

  setDestinationShipmentCountry = (country: ShipmentCountryInfo | null) => {
    this.countryDestination = country;
  }
}