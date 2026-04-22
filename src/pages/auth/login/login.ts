import type { IUser } from "../../../types/IUser";
// Importamos las utilidades para manejar los datos reales
import { getUsuarios, saveUser } from "../../../utils/localStorage"; 
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const valueEmail = inputEmail.value.trim().toLowerCase();
  const valuePassword = inputPassword.value;

  // 1. Buscamos en el array de "users" (Lo que pide la consigna)
  const listaUsuarios = getUsuarios();
  
  // 2. Buscamos coincidencia real de email y contraseña
  const usuarioEncontrado = listaUsuarios.find(u => 
    u.email === valueEmail && u.password === valuePassword
  );

  if (usuarioEncontrado) {
    // 3. Si es correcto, preparamos el objeto de sesión
    const user: IUser = {
      email: usuarioEncontrado.email,
      role: usuarioEncontrado.role, // El rol ya viene del registro
      loggedIn: true,
    };

    // 4. Guardamos en "userData"
    saveUser(user);

    alert("¡Ingreso exitoso!");

    // 5. Redirigimos según el rol que ya tiene el usuario
    if (user.role === "admin") {
      navigate("/src/pages/admin/home/home.html");
    } else {
      navigate("/src/pages/client/home/home.html");
    }
  } else {
    // Si no lo encuentra en el array
    alert("Usuario o contraseña incorrectos");
  }
});