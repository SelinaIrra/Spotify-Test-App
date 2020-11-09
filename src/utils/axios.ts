import axios, { AxiosResponse, AxiosError } from 'axios';
import { AUTH_URL, SOURCE_URL } from '../constants/urls';

interface SomeObject {
  [key: string]: any
}

interface Payload extends SomeObject {}
interface Headers extends SomeObject {}

const CancelAxiosToken = axios.CancelToken;
const source = CancelAxiosToken.source();

function Ajax(
  httpMethod: 'get', url: string, payload: Payload, headers: Headers,
) {
  const token = localStorage.getItem('medusa_token');
  const headersObj = { ...headers };
  if (token) headersObj.Authorization = `Bearer ${token}`;

  const service = axios.create({
    headers: headersObj,
    baseURL: SOURCE_URL,
  });

  const handleSuccess = (response: AxiosResponse) => response;

  const handleError = (error: AxiosError) => {
    const { response } = error;
    if (response && response.status === 401) {
      source.cancel();
      window.location.href = AUTH_URL;
    }
    return {
      data: {
        error: response ? `${response.status} ${response.statusText}` : 'oops',
      },
    };
  };

  service.interceptors.response.use(handleSuccess, handleError);

  switch (httpMethod) {
    case 'get':
      return service.get(url, {
        params: payload,
        cancelToken: source.token,
      });
    default:
      break;
  }
}

export default Ajax;
