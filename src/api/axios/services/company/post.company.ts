import { CompanyCreate, CompanyResponse } from '@/src/Interfaces/api/company';
import { post } from '@/src/api/axios/index';
import { CREATE_COMPANY } from '@/src/api/constants/company.constant';

export const createCompany = (data: CompanyCreate): Promise<CompanyResponse> =>
  post(CREATE_COMPANY, data).then((response) => {
    if (response === null) {
      throw new Error('Response is null');
    }

    return response;
  });
