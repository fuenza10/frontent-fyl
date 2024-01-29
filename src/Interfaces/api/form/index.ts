export type forms = {
  id: string;
  name: string;
  state: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};
export interface FormsResponse {
  ok: boolean;
  status: number;
  form?: forms;
  forms?: forms[];
  msg?: string;
  error?: string;
  meta?: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
export interface FormFieldsResponse {
  ok: boolean;
  status: number;
  formFields?: Question[];
  msg?: string;
  error?: string;

}

export interface FormCreateData {
  name: string;
  userId?: string;

  companyId?: string;
}

export interface CreateFormField {
  label: string;

  type: string;

  state?: boolean;

  formId: string;

  optionsData?: string[];

  options?: string[];
}

export interface QuestionsArray {
  questions: CreateFormField[];
}