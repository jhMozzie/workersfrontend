import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  WorkerResponse,
  CreateWorkerRequest,
  UpdateWorkerRequest,
  WorkerFilters,
  PaginationData,
} from '@/types/worker';
import workerService from '@/services/workerService';

export const useWorkerStore = defineStore('workers', () => {
  // State
  const workers = ref<WorkerResponse[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  const filters = ref<WorkerFilters>({
    searchTerm: '',
    sexo: 'Todos',
  });

  const pagination = ref<PaginationData>({
    currentPage: 1,
    itemsPerPage: 4,
    totalItems: 0,
    totalPages: 0,
  });

  // Getters
  const filteredWorkers = computed(() => {
    let filtered = workers.value;

    // Filtro por búsqueda
    if (filters.value.searchTerm) {
      const search = filters.value.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.firstName.toLowerCase().includes(search) ||
          w.lastName.toLowerCase().includes(search) ||
          w.documentNumber.toLowerCase().includes(search)
      );
    }

    // Filtro por sexo (si implementas este campo en tu API)
    if (filters.value.sexo && filters.value.sexo !== 'Todos') {
      // filtered = filtered.filter(w => w.sexo === filters.value.sexo);
    }

    pagination.value.totalItems = filtered.length;
    pagination.value.totalPages = Math.ceil(
      filtered.length / pagination.value.itemsPerPage
    );

    return filtered;
  });

  const paginatedWorkers = computed(() => {
    const start = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage;
    const end = start + pagination.value.itemsPerPage;
    return filteredWorkers.value.slice(start, end);
  });

  // Actions
  async function fetchWorkers() {
    loading.value = true;
    error.value = null;
    try {
      workers.value = await workerService.getAll();
    } catch (e: any) {
      error.value = e.message || 'Error al cargar trabajadores';
      console.error('Error fetching workers:', e);
    } finally {
      loading.value = false;
    }
  }

  async function createWorker(worker: CreateWorkerRequest) {
    loading.value = true;
    error.value = null;
    try {
      const newWorker = await workerService.create(worker);
      workers.value.push(newWorker);
      return newWorker;
    } catch (e: any) {
      error.value = e.message || 'Error al crear trabajador';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function updateWorker(id: number, worker: UpdateWorkerRequest) {
    loading.value = true;
    error.value = null;
    try {
      const updatedWorker = await workerService.update(id, worker);
      const index = workers.value.findIndex((w) => w.id === id);
      if (index !== -1) {
        workers.value[index] = updatedWorker;
      }
      return updatedWorker;
    } catch (e: any) {
      error.value = e.message || 'Error al actualizar trabajador';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function deleteWorker(id: number) {
    loading.value = true;
    error.value = null;
    try {
      await workerService.delete(id);
      workers.value = workers.value.filter((w) => w.id !== id);
    } catch (e: any) {
      error.value = e.message || 'Error al eliminar trabajador';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function setSearchTerm(term: string) {
    filters.value.searchTerm = term;
    pagination.value.currentPage = 1;
  }

  function setSexoFilter(sexo: string) {
    filters.value.sexo = sexo;
    pagination.value.currentPage = 1;
  }

  function setPage(page: number) {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.currentPage = page;
    }
  }

  return {
    // State
    workers,
    loading,
    error,
    filters,
    pagination,
    
    // Getters
    filteredWorkers,
    paginatedWorkers,
    
    // Actions
    fetchWorkers,
    createWorker,
    updateWorker,
    deleteWorker,
    setSearchTerm,
    setSexoFilter,
    setPage,
  };
});
