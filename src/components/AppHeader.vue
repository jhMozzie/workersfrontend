<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo y marca -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900">AdminSys</span>
        </div>

        <!-- Navegación -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Dashboard</a>
          <a href="#" class="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Trabajadores</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Horarios</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Reportes</a>
        </nav>

        <!-- Usuario -->
        <div class="flex items-center space-x-4">
          <button class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>
