import { CompanyResponse } from '@/src/Interfaces/api/company';
import { get } from '../..';
import { FIND_COMPANY_PAGINATED } from '@/src/api/constants/company.constant';

export const findCompanyPaginated = (
  _page: number,
  _perPage: number,
  _search: string,
): Promise<CompanyResponse> =>
  get(
    `${FIND_COMPANY_PAGINATED}/active?page=${1}&perPage=${300}&search=${''}`,
  ).then((response) => {
    if (response === null) {
      throw new Error('Response is null');
    }

    return response;
  });
export const findAllCompanies = () =>
  get('/companies').then((response) => {
    if (response === null) {
      throw new Error('Response is null');
    }

    return response;
  });
