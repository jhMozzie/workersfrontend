<template>
  <div v-if="open" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="emitClose"></div>

    <div class="absolute inset-0 flex items-center justify-center px-4 py-6">
      <div class="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div class="px-8 py-6">
          <div class="flex items-start gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86l-7.08 12.25A2 2 0 005 19h14a2 2 0 001.79-2.89L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Confirmacion</h2>
              <p class="text-gray-600 mt-1">Esta seguro de eliminar el registro?</p>
              <p class="text-sm text-gray-400 mt-1">Esta accion no se puede deshacer.</p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 px-8 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 font-medium shadow-sm hover:bg-gray-50"
            @click="emitClose"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium shadow-sm hover:bg-red-700"
            @click="emitConfirm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  workerName: string;
}>();

const emit = defineEmits<{
  close: [];
  confirm: [];
}>();

const emitClose = () => emit('close');
const emitConfirm = () => emit('confirm');
</script>
