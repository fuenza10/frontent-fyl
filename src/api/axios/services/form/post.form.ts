import {
  CreateFormField,
  FormCreateData,
  FormFieldsResponse,
  FormsResponse,
} from '@/src/Interfaces/api/form';

import { post } from '@/src/api/axios/index';

export const createForm = (data: FormCreateData): Promise<FormsResponse> =>
  post('/forms', data).then((response) => {
    if (response === null) {
      throw new Error('Response is null');
    }
    return response;
  });

export const createFormFields = (
  data: CreateFormField[],
): Promise<FormFieldsResponse> =>
  post('form-fields/many', data).then((response) => {
    if (response === null) {
      throw new Error('Response is null');
    }
    return response;
  });

export const formResponse = (data: any): Promise<any> =>
  post('/form-responses', data).then((response) => {
    if (response === null) {
      throw new Error('Response is null');
    }
    return response;
  });

