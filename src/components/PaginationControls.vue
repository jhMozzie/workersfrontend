<template>
  <div class="flex items-center justify-between mt-6">
    <div class="text-sm text-gray-600">
      Mostrando <span class="font-semibold">{{ startItem }}</span> a <span class="font-semibold">{{ endItem }}</span> de <span class="font-semibold">{{ totalItems }}</span> registros
    </div>

    <div class="flex items-center space-x-2">
      <!-- Botón anterior -->
      <button
        @click="$emit('change-page', currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Números de página -->
      <button
        v-for="page in displayPages"
        :key="page"
        @click="typeof page === 'number' && $emit('change-page', page)"
        :class="[
          'min-w-[2.5rem] h-10 rounded-lg font-medium text-sm transition-colors',
          page === currentPage
            ? 'bg-blue-600 text-white'
            : page === '...'
            ? 'cursor-default text-gray-400'
            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
        ]"
        :disabled="page === '...'"
      >
        {{ page }}
      </button>

      <!-- Botón siguiente -->
      <button
        @click="$emit('change-page', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}>();

defineEmits<{
  'change-page': [page: number];
}>();

const startItem = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1;
});

const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems);
});

const displayPages = computed(() => {
  const pages: (number | string)[] = [];
  const maxVisible = 5;

  if (props.totalPages <= maxVisible) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (props.currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(props.totalPages);
    } else if (props.currentPage >= props.totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = props.totalPages - 3; i <= props.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(props.currentPage - 1);
      pages.push(props.currentPage);
      pages.push(props.currentPage + 1);
      pages.push('...');
      pages.push(props.totalPages);
    }
  }

  return pages;
});
</script>
