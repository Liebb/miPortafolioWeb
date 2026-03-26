<div align="center">
  <h1>🚀 Portafolio Web Profesional | Liebermen Morazán</h1>
  <p>
    Un portafolio moderno, rápido y escalable de nivel senior construido con <b>Angular 19</b>, <b>Tailwind CSS v4</b> y arquitectura orientada a <i>features</i>.
  </p>

  <p>
    <a href="https://angular.dev" target="_blank">
      <img src="https://img.shields.io/badge/Angular-19.0-DD0031.svg?style=for-the-badge&logo=angular" alt="Angular 19">
    </a>
    <a href="https://tailwindcss.com" target="_blank">
      <img src="https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC.svg?style=for-the-badge&logo=tailwind-css" alt="Tailwind SDK">
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6.svg?style=for-the-badge&logo=typescript" alt="TypeScript">
    </a>
  </p>
</div>

<br>

## ✨ Características Principales

Este proyecto refleja altos estándares de la industria, optimización de rendimiento y experiencia de usuario fluida:

- **Arquitectura Moderna:** Componentes `standalone` nativos sin uso de NgModules y estructurados bajo una _Feature-based architecture_ (`core`, `shared`, `features`).
- **Estado Reactivo:** Gestión de estado centralizada a través de Angular **Signals**.
- **Inyección de Dependencias Limpia:** Uso exclusivo de la función `inject()` en lugar de constructores.
- **Integración con GitHub API:** Los repositorios se extraen dinámicamente y se renderizan con _skeleton loaders_. Incluye **Caché (LocalStorage)** con TTL y mitigación de _rate-limits_.
- **Performance Optimizada (SPA):** Inicialización de la app extremadamente rápida con animaciones fluidas renderizadas puramente por cliente. (Sin SSR para enfoque 100% de despliegues estáticos en CDNs).
- **UX Premium:** Modo Oscuro y Claro integrados con persistencia local. Elementos con Glassmorphism y animaciones detectadas por scroll (IntersectionObserver).
- **SEO Ready:** Utilización de servicios nativos de Angular (Meta y Title) listos para producción.
- **Formulario de Contacto:** _Reactive Forms_ completamente funcionales con sus respectivas validaciones sincrónicas listas para integración con _backend_.

<br>

## 🛠️ Arquitectura del Proyecto

El código fuente está estructurado de manera desacoplada para facilitar la mantenibilidad y escalabilidad.

```text
src/app/
├── core/
│   ├── models/           # Interfaces estrictas y modelos de datos.
│   └── services/         # Manejo de la lógica global y estado (GitHub, Scroll, Theme, Contact, SEO).
├── shared/
│   ├── components/       # Componentes reusables UI (Navbar, Footer, Headers).
│   └── directives/       # Directivas reutilizables (ej. scroll-animations).
├── features/
│   └── home/             # Módulo principal y su orquestación.
│       ├── sections/     # Modularización por sección (Hero, About, Projects, Skills, Contact).
│       └── home.component.ts 
```

<br>

## 🚀 Guía de Instalación Rápida

Si deseas correr este portafolio en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/Liebb/miPortafolioWeb.git
cd miPortafolioWeb
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Servidor de Desarrollo
Corre el proyecto utilizando Angular CLI.
```bash
npm run start
```
> Accede en tu navegador a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que hagas cambios.

### 4. Build de Producción
Para compilar y optimizar código listo para despliegue estático ejecuta:
```bash
npm run build
```
> Los artefactos minimizados se encontrarán en la carpeta `/dist/portafolio-web`. Listos para ser colocados en Vercel, Netlify o GitHub Pages.

<br>


## 📝 Licencia

Este proyecto está bajo la [Licencia MIT](https://choosealicense.com/licenses/mit/). Siéntete libre de adaptarlo o usarlo como base para tus proyectos personales.

---
> Elaborado por [Liebermen Morazán](https://www.linkedin.com/in/lieb-298025247/).
