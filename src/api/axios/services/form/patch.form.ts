import { patch } from "../..";

export const updateFormResponse = (data: any, companyId: string, formId: string) => patch(`/form-responses?companyId=${companyId}&formId=${formId}`, data).then((response) => {
    if (response === null) {
        throw new Error('Response is null');
    }
    return response;
})