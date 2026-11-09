
# 🛒 eCommerce

eCommerce es una aplicación para comercio electrónico que permite gestionar productos y categorías. La solución contiene una API REST desarrollada con .NET 10 y una SPA en React que consume sus endpoints.

## 🏗️ Arquitectura

La solución `eCommerce.sln` sigue una arquitectura por capas, separando las responsabilidades de negocio, aplicación, persistencia y presentación.

- **eCommerce.Domain**: entidades y reglas de negocio. Contiene la lógica y las validaciones propias del dominio.
- **eCommerce.Application**: casos de uso, DTOs, validaciones e interfaces que definen las operaciones de la aplicación.
- **eCommerce.Infrastructure**: implementación de la persistencia mediante Entity Framework Core, configuraciones, repositorios y migraciones.
- **eCommerce.API**: capa de presentación del Backend. Expone los endpoints REST, gestiona las peticiones HTTP, las excepciones y la documentación OpenAPI.
- **eCommerce.Frontend**: SPA desarrollada con React y Vite, encargada de la interfaz de usuario y de la comunicación con la API.

## ⚙️ Requisitos previos

| Herramienta | Versión mínima | Verificar |
| --- | --- | --- |
| **.NET SDK** | 10+ | `dotnet --version` |
| **Node.js** | 22+ (LTS) | `node --version` |
| **npm** | 10+ | `npm --version` |
| **Git** | 2.40+ | `git --version` |
| **SQL Server** | Según la instancia utilizada | |

> SQL Server puede sustituirse por LocalDB u otra base de datos compatible, siempre que la instancia sea accesible y la cadena de conexión esté correctamente configurada en la API.
>
> En Windows, puedes consultar las instalaciones disponibles mediante `Get-Service *SQL*`, `where.exe sqlcmd` o `sqllocaldb info`.

## Instalación y ejecución
### 1.🔧 Instalar dependencias

- **Backend**

Restaurar los paquetes NuGet y compilar la solución (desde el directorio raíz):

```powershell
dotnet tool restore
dotnet restore
dotnet build
```

- **Frontend**

Instalar las dependencias de npm (desde el directorio src/Frontend/):

```powershell
 cd .\src\Frontend\
npm ci
cd ../..
```

### 2.🗄️Configurar la base de datos

Configura la cadena de conexión en `src/API/appsettings.Development.json` o mediante el mecanismo de configuración que corresponda a tu entorno. 
> Actualmente `src/API/appsettings.json` contiene una cadena de conexión para desarrollo sin secretos.

Si es una instalación nueva o necesitas actualizar el esquema, aplica las migraciones de Entity Framework Core, configuradas en el proyecto `eCommerce.Infrastructure`:

```powershell
dotnet ef database update --project src/Infrastructure/eCommerce.Infrastructure.csproj --startup-project src/API/eCommerce.API.csproj
```

### 3.🌐Definir la URL base de la API
Se configura mediante la variable de entorno `VITE_BASE_API_URL`, definida en `src/Frontend/.env.local`. 
Determina el destino de las peticiones HTTP. La API configura CORS de forma independiente para autorizar el origen del servidor de desarrollo de Vite (`http://localhost:5173`).

```env
VITE_BASE_API_URL=https://localhost:7049/api
```

>**⚠️ El archivo `.env.local` no debe versionarse.** 
>
>Para iniciar la aplicación se debe crear este archivo en la raiz del proyecto **eCommerce.Frontend** en la ruta `eCommerce/src/Frontend/.env.local`


### 4. 🚀 Ejecutar la aplicación

Es necesario iniciar tanto la API como el Frontend.
Inicia cada proyecto en una terminal independiente.

API:

```powershell
dotnet run --project src/API/eCommerce.API.csproj
```

Frontend:

```powershell
cd src/Frontend
npm run dev
```

> **Si utilizas Visual Studio**
> 
> puedes seleccionar el perfil de inicio `Development` para ejecutar simultáneamente ambos proyectos. 

La aplicación estará disponible en:

| Servicio | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| API (HTTP) | http://localhost:5295 |
| API (HTTPS) | https://localhost:7049 |

## 🧪 Ejecutar Tests

Los tests del Backend y del Frontend se ejecutan por separado desde la raíz del repositorio:

- **Backend** (.NET):

```powershell
dotnet test --results-directory .\Tests\TestResults
```

- **Frontend** (Vitest): requiere haber instalado previamente las dependencias con `npm ci` en `src/Frontend`.

```powershell
cd .\src\Frontend
npm test
```

> 🚦En Visual Studio también puedes ejecutar los tests (sólo para los de Backend) haciendo click derecho sobre la solución o el proyecto de Tests, y seleccionando **Ejecutar pruebas**

Los resultados de cada suite se muestran en la consola. Vitest informa de los archivos y casos ejecutados, y de si pasan o fallan.

## 🧩 Organización de los tests

### Backend (.NET)

El proyecto `tests/eCommerce.Tests.csproj` agrupa las pruebas automatizadas de las capas del Backend. Los archivos se organizan por capa y cubren reglas de dominio, casos de uso, repositorios y controladores. Las pruebas de Infrastructure comparten fixtures para la base de datos, mientras que las de API usan una fábrica de aplicación para sus pruebas HTTP.

### Frontend (React/Vitest)

Las pruebas de la SPA se encuentran dentro de `src/Frontend/tests`, junto al `package.json` que gestiona sus dependencias. Se organizan por área: `services` para llamadas HTTP, `utils` para utilidades, y carpetas por feature como `navigation`, `products` y `categories` para componentes y flujos de interfaz. Vitest es independiente del runner .NET y se ejecuta con `npm test` desde `src/Frontend`.

## 📁 Estructura del repositorio

```text
eCommerce/
├── .config/
│   └── dotnet-tools.json
├── eCommerce.sln
├── eCommerce.slnLaunch
├── README.md
├── Tests/
│   ├── API/
│   │   ├── CategoryControllerTests.cs
│   │   ├── CustomWebApplicationFactory.cs
│   │   └── ProductControllerTests.cs
│   ├── Application/
│   │   ├── Categories/CategoryUseCasesTests.cs
│   │   └── Products/ProductUseCasesTests.cs
│   ├── Domain/
│   │   ├── Categories/CategoryTests.cs
│   │   └── Products/ProductTests.cs
│   ├── Infrastructure/
│   │   ├── CategoryRepositoryTests.cs
│   │   ├── DataBaseFixture.cs
│   │   └── ProductRepositoryTests.cs
│   └── eCommerce.Tests.csproj
└── src/
    ├── API/
    │   ├── Controllers/
    │   ├── Exceptions/
    │   ├── Properties/
    │   ├── Program.cs
    │   ├── appsettings.json
    │   └── appsettings.Development.json
    ├── Application/
    │   ├── Category/
    │   ├── Exceptions/
    │   ├── Product/
    │   └── DependencyInjection.cs
    ├── Domain/
    │   ├── Entities/
    │   └── Exceptions/
    ├── Infrastructure/
    │   ├── Migrations/
    │   ├── Persistence/
    │   │   ├── Configurations/
    │   │   └── Repositories/
    │   └── DependencyInjection.cs
    └── Frontend/
        ├── public/
        ├── src/
        │   ├── assets/
        │   ├── components/
        │   └── pages/
        ├── tests/
        │   ├── setup.js
        │   ├── categories/
        │   │   └── CategoryForm.test.jsx
        │   ├── navigation/
        │   │   └── Navbar.test.jsx
        │   ├── products/
        │   │   ├── ProductCatalog.test.jsx
        │   │   └── ProductForm.test.jsx
        │   ├── services/
        │   │   ├── categoryService.test.js
        │   │   └── productService.test.js
        │   └── utils/
        │       └── errorHelper.test.js
        ├── .env.local          # Configuración local (no versionada)
        ├── package.json
        ├── package-lock.json
        └── vite.config.js
```

## 📌 Buenas prácticas

- Abrir `eCommerce.sln` para trabajar con la solución completa en Visual Studio.
- Mantener la lógica de negocio en Domain y los casos de uso en Application.
- Mantener los controladores delgados, delegando las operaciones a la capa Application.
- Mantener las migraciones de Entity Framework Core en Infrastructure.
- No versionar archivos con configuraciones locales ni credenciales.

## 🔮 Futuras implementaciones

1. Ampliar la cobertura de pruebas del Frontend.
2. Autenticación.
3. Cart (carrito).
4. Order (pedidos).
5. ClientSettings (página de usuario).
6. OrderSettings (gestión de pedidos).
