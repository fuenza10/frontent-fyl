export interface CompanyCreate {
  name: string;
  email: string;

  rut: string;

  address: string;
}
export interface Company {
  id: string;
  name: string;
  email: string;

  rut: string;
  state: boolean;
  address: string;
  createAt: string;
  updateAt: string;
}

export interface CompanyResponse {
  ok: boolean;
  status: number;
  company?: Company;
  data?: Company[];
  msg?: string;
  error?: string;
  details?: string;
  meta?: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
