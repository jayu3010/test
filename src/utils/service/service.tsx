import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import API_URL from '../apiUri';
import { getCookie } from '../functions/commonFunction';

interface APICallParams {
  methodName: string;
  apiUrl: string;
  body?: Record<string, any>; // You might want to specify a more specific type
  params?: Record<string, any>; // Parameters to be sent in the URL
  query?: Record<string, any>; // Parameters to be appended to the URL
  options?: Record<string, any>; // Axios request configuration options
}
const Methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

axios.interceptors.request.use(
  (config: any) => {
    const accessToken = getCookie('token');

    const updatedHeaders = {
      ...config.headers,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    if (accessToken) {
      updatedHeaders.Authorization = `Bearer ${accessToken}`;
    }

    return {
      ...config,
      headers: updatedHeaders,
    };
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 401) {
      localStorage.clear();
    }
    return response;
  },
  async (error) => {
    // Handle token refresh logic
    return Promise.reject(error);
  }
);
const makeHttpRequest = async (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  body: any = null,
  options: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  try {
    // Determine the content type
    const isFormData = body instanceof FormData;
    const headers = isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' };

    // Merge headers with any options.headers
    const mergedHeaders = { ...headers, ...options.headers };

    const response = await axios({
      method,
      url,
      data: body,
      headers: mergedHeaders,
      ...options,
    });

    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

const makeAPICall = async ({
  methodName,
  apiUrl,
  body,
  params,
  query,
  options,
}: APICallParams): Promise<AxiosResponse | undefined> => {
  let fullUrl = API_URL.base + apiUrl; // Use a new variable `fullUrl`

  if (params) {
    fullUrl += `/${params}`;
  }
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    if (queryString) {
      fullUrl += `?${queryString}`;
    }
  }

  switch (methodName) {
    case Methods.GET:
      return makeHttpRequest('get', fullUrl, null, options);
    case Methods.POST:
      return makeHttpRequest('post', fullUrl, body, options);
    case Methods.PUT:
      return makeHttpRequest('put', fullUrl, body, options);
    case Methods.DELETE:
      // For DELETE, axios expects the body to be in the config object
      return makeHttpRequest('delete', fullUrl, body, {
        ...options,
        data: body,
      });
    default:
      return Promise.reject(new Error('Invalid methodName'));
  }
};

const service = {
  Methods,
  API_URL,
  makeAPICall,
};

export default service;
