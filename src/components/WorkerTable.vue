<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200">
    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left table-header">Nombre</th>
            <th class="px-6 py-4 text-left table-header">Apellidos</th>
            <th class="px-6 py-4 text-left table-header">Documento</th>
            <th class="px-6 py-4 text-left table-header">Fecha de Nacimiento</th>
            <th class="px-6 py-4 text-left table-header">Dirección</th>
            <th class="px-6 py-4 text-left table-header">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="worker in workers"
            :key="worker.id"
            class="transition-colors"
            :class="getRowHoverClass(worker.gender)"
            :style="getRowStyle(worker.gender)"
          >
            <td class="px-6 py-4 text-sm text-gray-900 font-medium">
              {{ worker.firstName }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ worker.lastName }}
            </td>
            <td class="px-6 py-4 text-sm">
              <div class="flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {{ worker.documentType }}
                </span>
                <span class="text-gray-900">{{ worker.documentNumber }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ formatDate(worker.birthDate) }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ worker.address }}
              </div>
            </td>
            <td class="px-6 py-4 text-sm">
              <div class="flex items-center space-x-2">
                <button
                  @click="$emit('edit', worker)"
                  class="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Editar"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="$emit('delete', worker)"
                  class="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Eliminar"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Estado vacío -->
      <div v-if="workers.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-gray-500 text-lg font-medium">No se encontraron trabajadores</p>
        <p class="text-gray-400 text-sm mt-1">Intenta ajustar los filtros de búsqueda</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WorkerResponse } from '@/types/worker';

defineProps<{
  workers: WorkerResponse[];
}>();

defineEmits<{
  edit: [worker: WorkerResponse];
  delete: [worker: WorkerResponse];
}>();

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const normalizeGender = (gender: string): string => (gender || '').trim().toUpperCase();

const getRowStyle = (gender: string): { backgroundColor?: string } => {
  const value = normalizeGender(gender);
  if (value === 'M' || value === 'MASCULINO' || value === 'HOMBRE') {
    return { backgroundColor: '#dbeafe' };
  }
  if (value === 'F' || value === 'FEMENINO' || value === 'MUJER' || value === 'FEMALE') {
    return { backgroundColor: '#ffedd5' };
  }
  return {};
};

const getRowHoverClass = (gender: string): string => {
  const value = normalizeGender(gender);
  if (value === 'M' || value === 'MASCULINO' || value === 'HOMBRE') {
    return 'hover:bg-blue-200';
  }
  if (value === 'F' || value === 'FEMENINO' || value === 'MUJER' || value === 'FEMALE') {
    return 'hover:bg-orange-200';
  }
  return 'hover:bg-gray-50';
};
</script>
