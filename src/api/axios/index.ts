import axios, { AxiosResponse, AxiosError } from 'axios';


const baseURL = /*'http://localhost:8081/api'*/'https://backend-fyl-production.up.railway.app/api';

export const api = axios.create({ baseURL });
export const AxiosInterceptor = () => {
  
const  updateHeader = (request: any) => {
    //@ts-ignore
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const token = localStorage.getItem('token');

    const newHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    };
    request.headers = newHeaders;
    return request;
  };
  api.interceptors.request.use((request) => {
    console.log(request.url);
    if (request.url?.includes('login') || request.url?.includes('auth'))
      return request;
    return updateHeader(request);
  });
};
export async function get(url: string, config = {}) {
  return await api
    .get(url, { ...config })
    .then((response) => response.data)
    .catch((error) => {console.log(error)});
}

export  async function post<T = any>(
  url: string,
  
postData: any,
  config?: object,
) {
  try {
    const response: AxiosResponse = await api.post<T>(url, postData, config);
    const { data, status } = response;
    if (status >= 400) {
      throw new Error(`Error: ${status}`);
    }
    return { ...data, statusCode: status } as T;
  
}  catch (error: any) {
    
const  axiosError: AxiosError<unknown, any> = error;
    
if  (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as T;
    }
    console.log(error)
    throw new Error('Error desconocido');
  }
}

export  async function put<T = any>(url: string, putData: any, config?: object) {
  try {
    const response: AxiosResponse = await api.put<T>(url, putData, config);
    const { data, status } = response;
    return { ...data, statusCode: status } as T;
  } catch (error: any) {

const  axiosError: AxiosError<unknown, any> = error;

if  (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as T;
    }
    return null;
  }
}
export async function patch<T = any>(
  url: string,
  patchData: any,
  config?: object,
) {
  try {
    const response: AxiosResponse = await api.patch<T>(url, patchData, config);
    const { data, status } = response;
    return { ...data, statusCode: status } as T;
  } catch (error: any) {
    const axiosError: AxiosError<unknown, any> = error;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as T;
    }
    return null;
  }
}

export async function del<T = any>(url: string, config?: object) {
  try {
    const response: AxiosResponse = await api.delete<T>(url, config);
    const { data, status } = response;
    return { ...data, statusCode: status } as T;
  } catch (error: any) {
    const axiosError: AxiosError<unknown, any> = error;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as T;
    }
    return null;
  }
}
// export async function put(url: string, data: any, config = {}) {
//   return await api
//     .put(url, {...data}, {...config})
//     .then(response => response.data)
//     .catch(error => error.response.data);
// }
// export async function del(url: string, config = {}) {
//   return await api
//     .delete(url, {...config})
//     .then(response => response.data)
//     .catch(error => error.response.data);
// }
