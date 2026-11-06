# Organize App

eCommerce es una aplicación para gestionar productos y categorías. La solución contiene una API REST en .NET 10 y una SPA en React que consume sus endpoints.

## Arquitectura

- **eCommerce.Domain**: entidades y reglas del dominio.
- **eCommerce.Application**: casos de uso, DTOs, validaciones e interfaces.
- **eCommerce.Infrastructure**: persistencia con Entity Framework Core, configuraciones, repositorios y migraciones.
- **eCommerce.API**: aplicación ASP.NET Core, controladores, configuración, excepciones y OpenAPI.
- **eCommerce.Frontend**: SPA React servida y compilada con Vite.

La solución es `eCommerce.sln` y está en la raíz del repositorio. Los cinco proyectos se encuentran bajo `src/`.
## Requisitos previos

| Herramienta | Versión mínima | Verificar |
| --- | --- | --- |
| **.NET SDK** | 10+ | `dotnet --version` |
| **Node.js** | 22+ (LTS) | `node --version` |
| **npm** | 10+ | `npm --version` |
| **Git** | 2.40+ | `git --version` |
| **SQL Server** | Según la instancia utilizada | |

> SQL Server puede sustituirse por LocalDB u otra base de datos compatible, siempre que la instancia sea accesible y la cadena de conexión esté correctamente configurada en la API (en appsettings.json).
>
> En Windows, puedes consultar las instalaciones disponibles mediante `Get-Service *SQL*`, `where.exe sqlcmd` o `sqllocaldb info`.

## Instalación y ejecución

Todos los comandos siguientes se ejecutan desde la raíz del repositorio
(`C:\Users\tpmancilla\source\repos\eCommerce`).

### Backend

```powershell
dotnet restore
dotnet build
dotnet run --project src/API/eCommerce.API.csproj
```

La API está disponible en `http://localhost:5295`. El perfil HTTPS también utiliza `https://localhost:7049`.

Para aplicar las migraciones, `eCommerce.Infrastructure` es el proyecto de migraciones y `eCommerce.API` es el proyecto de inicio:

```powershell
dotnet ef database update --project src/Infrastructure/eCommerce.Infrastructure.csproj --startup-project src/API/eCommerce.API.csproj
```

La cadena de conexión y las opciones de la API se configuran en `src/API/appsettings.json` y `appsettings.Development.json`. En entornos de despliegue deben utilizarse variables de entorno o secretos.

### Frontend

El frontend forma parte de la solución, pero sus dependencias y scripts se gestionan con npm:

```powershell
cd src/Frontend
npm ci
npm run dev
```

Por defecto, Vite sirve la aplicación en `http://localhost:5173`. La URL de la API se configura en `src/Frontend/.env.local`:

```env
VITE_BASE_API_URL=https://localhost:7049/api
```

Esta variable indica el destino de las peticiones; el CORS de la API autoriza por separado el origen `http://localhost:5173`. No se debe versionar `.env.local`.

Scripts disponibles:

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la compilación de producción en `dist`.
- `npm run preview`: sirve la compilación generada.
- `npm run lint`: ejecuta ESLint.

> Si utilizas Visual Studio, puedes seleccionar el perfil de inicio API and Frontend para ejecutar simultáneamente la API y el Frontend mediante F5.
>
> La configuración de inicio de dicho perfil se encuentra en `eCommerce.slnLaunch` 

## Estructura del repositorio

```text
eCommerce/
├── eCommerce.sln
├── README.md
└── src/
    ├── API/
    │   ├── Controllers/
    │   ├── Exceptions/
    │   ├── Properties/
    │   ├── Program.cs
    │   └── appsettings.json
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
        ├── .env.local
        ├── package.json
        ├── package-lock.json
        └── vite.config.js
```

## Buenas prácticas

- Abrir `eCommerce.sln` para trabajar con la solución completa en Visual Studio.
- Mantener la lógica de negocio en Application y Domain; los controladores deben permanecer delgados.
- Mantener las migraciones de Entity Framework Core en Infrastructure.
- Gestionar cadenas de conexión y secretos mediante configuración segura en los entornos de despliegue.


## Futuras implementaciones:
1. Test para el Frontend
2. Autenticación 
3. Cart (Carrito)
4. Order (pedido)
5. ClientSettings (página de usuario)
6. OrderSettings (página de gestion de pedidos)