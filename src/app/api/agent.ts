import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../stores/store";
import { AuthRequest } from "../models/authRequest";
import { ApiResponse } from "../models/apiResponse";
import { PersonalDataValues } from "../models/personalDataValues";
import { ContactDetailsValues } from "../models/contactDetailsValues";
import {PreferencesDataValues} from "../models/preferencesDataValues";
import { AddressDataValues } from "../models/addressDataValues";
import { FirebaseMeta } from "../models/firebaseMeta";
import { router } from "../../Router";

export const sleep = (delayMs: number) => new Promise(resolve => setTimeout(resolve, delayMs));

axios.defaults.baseURL = process.env.API_URL ?? 'https://dev-ic2c.meest.com/api/v1';

axios.interceptors.request.use(config => {
  const token = store.commonStore.meestToken;
  if (token && config) config.headers.Authorization = `Bearer ${token}`;

  return config;
})

axios.interceptors.response.use(async response => {
  // await sleep(3500);
  return response;
}, (error: AxiosError) => {
  console.error(error);

  // Error interception logic may be injected here in future.

  const { status } = error.response as AxiosResponse;
  // console.error(error.response);  
  // store.commonStore.toastError(data.message);

  switch (status) {
    case 400:
      // alert('bad request: ' + data.message);
      // store.commonStore.toastError(data.message);
      break;
    case 401:
      // alert('unauthorised: ' + data.message);
      break;
    case 403:
      // alert('forbidden: ' + data.message);
      break;
    case 404:
      // router.navigate('/not-found');
      // alert('not found: ' + data.message)
      break;
    case 422:
      // alert('validation error: ' + data.message);
      break;
    case 500:
      router.navigate('/server-error');
      // alert('server error: ' + data.message)
      break;
  }

  return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Auth = {
  login: (firebase_uid: string, firebase_token: string, device_uuid: string) => requests.post<ApiResponse>('/login', {firebase_uid, firebase_token, device_uuid} as AuthRequest)
    .then(authResponse => authResponse.data?.token),
  socialLogin: (firebase_uid: string, firebase_token: string, device_uuid: string) => requests.post<ApiResponse>('/social-login', {firebase_uid, firebase_token, device_uuid} as AuthRequest)
    .then(authResponse => authResponse.data?.token),
  register: (firebase_uid: string, device_uuid: string) => requests.post<ApiResponse>('/register', {firebase_uid, device_uuid} as AuthRequest),
  logout: () => requests.post<ApiResponse>('/logout',  {}),
}

const Profile = {
  profile: () => requests.get<ApiResponse>('/profile').then(authResponse => authResponse.data?.user),
  updatePreferences: (preferences: PreferencesDataValues) => requests.post<ApiResponse>('/profile/update-user-location', preferences)
    .then(authResponse => authResponse.data?.user),
  updatePersonalData: (personalData: PersonalDataValues) => requests.post<ApiResponse>('/profile/update-personal-data', personalData)
    .then(authResponse => authResponse.data?.user),
  updateContactInfo: (contactInfo: ContactDetailsValues) => requests.post<ApiResponse>('/profile/update-contact-info', contactInfo)
    .then(authResponse => authResponse.data?.user),
  updateAddress: (addressInfo: AddressDataValues) => requests.post<ApiResponse>('/profile/update-user-address', addressInfo)
    .then(authResponse => authResponse.data?.user),
  deleteAccount: (firebaseMeta: FirebaseMeta) => requests.post<ApiResponse>('/profile/delete-user', firebaseMeta)
}

const Shipment = {
  parcelDetails: () => requests.get<ApiResponse>('/shipment/create/parcel-details').then(response => response.data?.countries),
}

const agent = {
  Auth,
  Profile,
  Shipment
}

export default agent;
