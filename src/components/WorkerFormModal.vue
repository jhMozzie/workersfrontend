<template>
  <div v-if="open" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="emitClose"></div>

    <div class="absolute inset-0 flex items-center justify-center px-4 py-6">
      <div class="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-200">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900">Formulario de Trabajador</h2>
          <button
            type="button"
            class="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            @click="emitClose"
            aria-label="Cerrar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form class="px-6 py-5" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
              <input
                v-model="form.firstName"
                type="text"
                placeholder="Ej. Juan Alberto"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
              <input
                v-model="form.lastName"
                type="text"
                placeholder="Ej. Perez Garcia"
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
              <select v-model="form.documentType" class="input-field">
                <option value="" disabled>Seleccionar</option>
                <option value="DNI">DNI</option>
                <option value="PAS">PAS</option>
                <option value="CE">CE</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Numero de Documento</label>
              <input
                v-model="form.documentNumber"
                type="text"
                placeholder="Ej. 12345678"
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
              <div class="flex items-center gap-6">
                <label class="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    v-model="form.gender"
                    type="radio"
                    value="M"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  Masculino
                </label>
                <label class="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    v-model="form.gender"
                    type="radio"
                    value="F"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  Femenino
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
              <input v-model="form.birthDate" type="date" class="input-field" />
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Direccion</label>
            <input
              v-model="form.address"
              type="text"
              placeholder="Ingresa la direccion completa..."
              class="input-field"
            />
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Foto</label>
            <label
              class="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-6 py-6 text-center cursor-pointer hover:border-blue-300"
            >
              <input type="file" accept="image/*" class="hidden" @change="handlePhotoChange" />
              <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v12m0 0l-3-3m3 3l3-3m-7 7h8" />
                </svg>
              </div>
              <div class="text-sm text-gray-600">
                <span class="text-blue-600 font-medium">Haga clic para subir</span>
                o arrastre y suelte
              </div>
              <div class="text-xs text-gray-400">SVG, PNG, JPG o GIF (max. 800x400px)</div>
              <div v-if="photoPreview" class="mt-3">
                <img :src="photoPreview" alt="Preview" class="h-16 w-16 rounded-lg object-cover" />
              </div>
            </label>
          </div>

          <div class="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              class="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              @click="emitClose"
            >
              Cancelar
            </button>
            <button type="submit" class="btn-primary px-5">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { WorkerResponse, CreateWorkerRequest, UpdateWorkerRequest } from '@/types/worker';

type Mode = 'create' | 'edit';

type FormState = {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  birthDate: string;
  address: string;
  photo: string | null;
};

const props = defineProps<{
  open: boolean;
  mode: Mode;
  worker?: WorkerResponse | null;
}>();

const emit = defineEmits<{
  close: [];
  submit: [payload: CreateWorkerRequest | UpdateWorkerRequest];
}>();

const photoPreview = ref<string | null>(null);

const emptyForm = (): FormState => ({
  firstName: '',
  lastName: '',
  documentType: '',
  documentNumber: '',
  gender: '',
  birthDate: '',
  address: '',
  photo: null,
});

const form = ref<FormState>(emptyForm());

const toInputDate = (value: string | null | undefined) => {
  if (!value) return '';
  return value.split('T')[0];
};

watch(
  () => [props.open, props.worker],
  () => {
    if (!props.open) return;
    if (props.worker) {
      form.value = {
        firstName: props.worker.firstName || '',
        lastName: props.worker.lastName || '',
        documentType: props.worker.documentType || '',
        documentNumber: props.worker.documentNumber || '',
        gender: props.worker.gender || '',
        birthDate: toInputDate(props.worker.birthDate),
        address: props.worker.address || '',
        photo: props.worker.photo || null,
      };
      photoPreview.value = props.worker.photo || null;
    } else {
      form.value = emptyForm();
      photoPreview.value = null;
    }
  },
  { immediate: true }
);

const emitClose = () => emit('close');

const handleSubmit = () => {
  if (props.mode === 'edit' && props.worker) {
    emit('submit', { id: props.worker.id, ...form.value });
    return;
  }
  emit('submit', { ...form.value });
};

const handlePhotoChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const result = typeof reader.result === 'string' ? reader.result : null;
    photoPreview.value = result;
    form.value.photo = result;
  };
  reader.readAsDataURL(file);
};
</script>
