import axios, { AxiosError, AxiosResponse } from "axios";
// import { router } from "../../Router";
import { store } from "../stores/store";
import { AuthRequest } from "../models/authRequest";
import { AuthResponse } from "../models/authResponse";

export const sleep = (delayMs: number) => new Promise(resolve => setTimeout(resolve, delayMs));

axios.defaults.baseURL = process.env.REACT_APP_API_URL ?? 'https://dev-ic2c.meest.com/api/v1';

axios.interceptors.request.use(config => {
  const token = store.commonStore.meestToken;
  if (token && config) config.headers.Authorization = `Bearer ${token}`;

  return config;
})

axios.interceptors.response.use(async response => {
  // await sleep(500);
  return response;
}, (error: AxiosError) => {
  const { data, status } = error.response as AxiosResponse;
  console.error(error.response);

  switch (status) {
    case 400:
      alert('bad request: ' + data.message);
      break;
    case 401:
      alert('unauthorised: ' + data.message);
      break;
    case 403:
      alert('forbidden: ' + data.message);
      break;
    case 404:
      // router.navigate('/not-found');
      alert('not found: ' + data.message)
      break;
    case 422:
      alert('validation error: ' + data.message);
      break;
    case 500:
      //router.navigate('/server-error');
      alert('server error: ' + data.message)
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
  login: (firebase_uid: string, firebase_token: string, device_uuid: string) => requests.post<AuthResponse>('/login', {firebase_uid, firebase_token, device_uuid} as AuthRequest)
    .then(authResponse => authResponse.data?.token),
  socialLogin: (firebase_uid: string, firebase_token: string, device_uuid: string) => requests.post<AuthResponse>('/social-login', {firebase_uid, firebase_token, device_uuid} as AuthRequest)
    .then(authResponse => authResponse.data?.token),
  register: (firebase_uid: string, device_uuid: string) => requests.post<AuthResponse>('/register', {firebase_uid, device_uuid} as AuthRequest),
  logout: () => requests.post<AuthResponse>('/register',  {}),
}

const Profile = {
  profile: () => requests.get<AuthResponse>('/profile').then(authResponse => authResponse.data?.user)
}

const agent = {
  Auth,
  Profile
}

export default agent;