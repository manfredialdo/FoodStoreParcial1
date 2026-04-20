// src/main.ts

import type { IUser } from "./types/IUser";

const checkAuth = (): void => {
  // 1. Obtenemos la ruta actual
  const currentPath = window.location.pathname;
  
  // 2. Traemos los datos del usuario del localStorage
  const userDataJSON = localStorage.getItem("userData");
  const user: IUser | null = userDataJSON ? JSON.parse(userDataJSON) : null;

  // --- LÓGICA DE VALIDACIÓN ---

  // A. Si no hay sesión y no está en el login, mandarlo al login
  if (!user && !currentPath.includes("login.html") && currentPath !== "/") {
    window.location.href = "/src/pages/login/login.html";
    return;
  }

  // B. Validación de Rol (Protección de carpeta /admin/)
  if (user && currentPath.includes("/admin/")) {
    if (user.role !== "admin") {
      console.warn("Acceso denegado: Se requiere rol de Admin");
      // Redirigir a su zona permitida o al login
      window.location.href = "/src/pages/client/home/home.html";
    }
  }
};

// Ejecutar la validación inmediatamente al cargar el script
checkAuth();