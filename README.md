# AdminSys - Sistema de Gestión de Trabajadores

Sistema de gestión de trabajadores construido con Vue 3, TypeScript, Pinia y Tailwind CSS, diseñado para consumir una Web API desarrollada en .NET.

## 🚀 Características

- ✅ Vue 3 con Composition API
- ✅ TypeScript para tipado estático
- ✅ Pinia para gestión de estado
- ✅ Tailwind CSS para estilos
- ✅ Arquitectura modular
- ✅ Integración con API .NET mediante Axios
- ✅ Paginación
- ✅ Búsqueda y filtros
- ✅ Diseño responsive

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura la URL de tu API:

```
VITE_API_URL=https://localhost:7000/api
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Compilar para producción

```bash
npm run build
```

## 📚 Librerías NPM Instaladas

### Dependencias de Producción
- **vue** (^3.4.21) - Framework progresivo de JavaScript
- **vue-router** (^4.3.0) - Enrutamiento oficial para Vue
- **pinia** (^2.1.7) - Store para gestión de estado
- **axios** (^1.6.7) - Cliente HTTP para consumir API

### Dependencias de Desarrollo
- **@vitejs/plugin-vue** (^5.0.4) - Plugin de Vite para Vue
- **typescript** (^5.4.2) - Superset de JavaScript con tipado
- **vue-tsc** (^2.0.6) - Compilador TypeScript para Vue
- **vite** (^5.1.5) - Build tool y dev server
- **tailwindcss** (^3.4.1) - Framework CSS utility-first
- **postcss** (^8.4.35) - Procesador de CSS
- **autoprefixer** (^10.4.18) - Plugin de PostCSS
- **@types/node** (^20.11.24) - Tipos de TypeScript para Node

## 🏗️ Estructura del Proyecto

```
src/
├── assets/           # Estilos globales (Tailwind CSS)
├── components/       # Componentes reutilizables
│   ├── AppHeader.vue
│   ├── AppBreadcrumb.vue
│   ├── WorkerTable.vue
│   └── PaginationControls.vue
├── stores/          # Stores de Pinia
│   └── workerStore.ts
├── services/        # Servicios para API
│   └── workerService.ts
├── types/           # Interfaces TypeScript
│   └── worker.ts
├── views/           # Vistas/Páginas
│   └── WorkersView.vue
├── router/          # Configuración de rutas
│   └── index.ts
├── App.vue          # Componente raíz
└── main.ts          # Punto de entrada
```

## 🔌 Integración con API .NET

### Modelo esperado de la API

El servicio espera que tu API .NET tenga los siguientes endpoints:

```csharp
GET    /api/trabajadores       // Obtener todos
GET    /api/trabajadores/{id}  // Obtener por ID
POST   /api/trabajadores       // Crear nuevo
PUT    /api/trabajadores/{id}  // Actualizar
DELETE /api/trabajadores/{id}  // Eliminar
```

### Modelo de datos TypeScript

```typescript
interface Worker {
  id?: number;
  nombre: string;
  apellidos: string;
  documento: string;
  tipoDocumento: 'DNI' | 'PASS' | 'SEN' | string;
  fechaNacimiento: string;
  direccion: string;
}
```

### Ejemplo de modelo C# (.NET)

```csharp
public class Trabajador
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Apellidos { get; set; }
    public string Documento { get; set; }
    public string TipoDocumento { get; set; }
    public DateTime FechaNacimiento { get; set; }
    public string Direccion { get; set; }
}
```

## 🎨 Personalización de Estilos

Los estilos utilizan Tailwind CSS. Puedes personalizar:

1. **Colores**: Edita `tailwind.config.js`
2. **Componentes**: Edita clases en `src/assets/main.css`
3. **Temas**: Modifica las variables CSS en los componentes

## 📖 Uso del Store (Pinia)

```typescript
import { useWorkerStore } from '@/stores/workerStore';

const workerStore = useWorkerStore();

// Cargar trabajadores
await workerStore.fetchWorkers();

// Acceder a datos
const workers = workerStore.paginatedWorkers;
const loading = workerStore.loading;

// Crear trabajador
await workerStore.createWorker(newWorker);

// Actualizar
await workerStore.updateWorker(id, updatedWorker);

// Eliminar
await workerStore.deleteWorker(id);

// Filtros
workerStore.setSearchTerm('Juan');
workerStore.setPage(2);
```

## 🔐 CORS en .NET

Asegúrate de configurar CORS en tu API .NET:

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVueApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

app.UseCors("AllowVueApp");
```

## 🛠️ Próximas Características

- [ ] Modal de creación/edición de trabajadores
- [ ] Validación de formularios
- [ ] Exportación a Excel/PDF
- [ ] Autenticación y autorización
- [ ] Toast notifications
- [ ] Modo oscuro

## 📝 Notas Importantes

1. **Tipado de documentos**: Ajusta los tipos de documento según tu país
2. **Formato de fechas**: El componente espera formato ISO (YYYY-MM-DD)
3. **Paginación**: Configurada para 4 items por página (ajustable en el store)
4. **Validaciones**: Implementa validaciones según tus reglas de negocio

## 🤝 Contribución

Este proyecto sigue una arquitectura modular. Al agregar nuevas funcionalidades:

1. Crea servicios en `src/services/`
2. Define tipos en `src/types/`
3. Gestiona estado en `src/stores/`
4. Componentes UI en `src/components/`
5. Vistas en `src/views/`

## 📄 Licencia

MIT

---

Desarrollado con ❤️ usando Vue 3 + TypeScript + Pinia + Tailwind CSS
