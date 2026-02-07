<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-7xl mx-auto px-6 py-8">
      <AppBreadcrumb />

      <!-- Título y botón -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Listado de Trabajadores Simplificado
          </h1>
          <p class="text-gray-600">
            Administra los registros de empleados y actualiza detalles.
          </p>
        </div>
        <button
          @click="openCreateModal"
          class="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-3 rounded-lg transition-colors shadow-lg shadow-gray-900/20"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Nuevo Trabajador</span>
        </button>
      </div>

      <!-- Filtros -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Búsqueda -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div class="relative">
              <input
                v-model="searchTerm"
                @input="handleSearch"
                type="text"
                placeholder="Buscar por nombre o documento..."
                class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Filtro por sexo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por
            </label>
            <div class="relative">
              <select
                v-model="sexoFilter"
                @change="handleSexoFilter"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10"
              >
                <option value="Todos">Sexo: Todos</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="workerStore.loading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
        <p class="text-gray-600">Cargando trabajadores...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="workerStore.error" class="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
        <div class="flex items-center">
          <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-red-800 font-medium">{{ workerStore.error }}</p>
        </div>
      </div>

      <!-- Tabla -->
      <div v-else>
        <WorkerTable
          :workers="workerStore.paginatedWorkers"
          @edit="openEditModal"
          @delete="confirmDelete"
        />

        <!-- Paginación -->
        <PaginationControls
          v-if="workerStore.pagination.totalPages > 0"
          :current-page="workerStore.pagination.currentPage"
          :total-pages="workerStore.pagination.totalPages"
          :total-items="workerStore.pagination.totalItems"
          :items-per-page="workerStore.pagination.itemsPerPage"
          @change-page="handlePageChange"
        />
      </div>
    </main>

    <WorkerFormModal
      :open="showWorkerModal"
      :mode="workerModalMode"
      :worker="selectedWorker"
      @close="showWorkerModal = false"
      @submit="handleWorkerSubmit"
    />

    <DeleteConfirmModal
      :open="showDeleteModal"
      :worker-name="selectedWorker ? `${selectedWorker.firstName} ${selectedWorker.lastName}` : ''"
      @close="showDeleteModal = false"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWorkerStore } from '@/stores/workerStore';
import AppHeader from '@/components/AppHeader.vue';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import WorkerTable from '@/components/WorkerTable.vue';
import WorkerFormModal from '@/components/WorkerFormModal.vue';
import DeleteConfirmModal from '@/components/DeleteConfirmModal.vue';
import PaginationControls from '@/components/PaginationControls.vue';
import type { WorkerResponse, CreateWorkerRequest, UpdateWorkerRequest } from '@/types/worker';

const workerStore = useWorkerStore();

const searchTerm = ref('');
const sexoFilter = ref('Todos');
const showWorkerModal = ref(false);
const workerModalMode = ref<'create' | 'edit'>('create');
const selectedWorker = ref<WorkerResponse | null>(null);
const showDeleteModal = ref(false);

onMounted(() => {
  workerStore.fetchWorkers();
});

const handleSearch = () => {
  workerStore.setSearchTerm(searchTerm.value);
};

const handleSexoFilter = () => {
  workerStore.setSexoFilter(sexoFilter.value);
};

const handlePageChange = (page: number) => {
  workerStore.setPage(page);
};

const openCreateModal = () => {
  workerModalMode.value = 'create';
  selectedWorker.value = null;
  showWorkerModal.value = true;
};

const openEditModal = (worker: WorkerResponse) => {
  workerModalMode.value = 'edit';
  selectedWorker.value = worker;
  showWorkerModal.value = true;
};

const confirmDelete = (worker: WorkerResponse) => {
  selectedWorker.value = worker;
  showDeleteModal.value = true;
};

const handleWorkerSubmit = async (payload: CreateWorkerRequest | UpdateWorkerRequest) => {
  if (workerModalMode.value === 'edit' && 'id' in payload) {
    await workerStore.updateWorker(payload.id, payload);
  } else {
    await workerStore.createWorker(payload as CreateWorkerRequest);
  }
  showWorkerModal.value = false;
};

const handleDeleteConfirm = async () => {
  if (!selectedWorker.value?.id) return;
  await workerStore.deleteWorker(selectedWorker.value.id);
  showDeleteModal.value = false;
};
</script>
