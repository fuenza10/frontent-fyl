import { FormsResponse } from '@/src/Interfaces/api/form';
import { get } from '../..';

export const findPaginatedForms = (
  page: number,
  perPage: number,
  search?: string,
  userId?: string,
  companyId?: string,
): Promise<FormsResponse> =>
  get(
    `/forms/get/paginated?page=${page}&perPage=${perPage}&search=${search}&userId=${userId}&companyId=${companyId}`,
  ).then((response) => {
    if (response === null) {
      throw new Error('Response is null');
    }
    return response;
  });


export const findFormResponses = (companyIds: string[] = []) => get(`/forms/get/form-response?companyId=${companyIds.join(',')}`).then((response) => {
  if (response === null) {
    throw new Error('Response is null');
  }
  return response;
}
)