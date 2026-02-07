export interface WorkerResponse {
  id: number;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  birthDate: string;
  photo: string | null;
  address: string | null;
}

export interface CreateWorkerRequest {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  birthDate: string;
  photo?: string | null;
  address?: string | null;
}

export interface UpdateWorkerRequest {
  id: number;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  birthDate: string;
  photo?: string | null;
  address?: string | null;
}

export interface WorkerFilters {
  searchTerm: string;
  sexo: string;
}

export interface PaginationData {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
