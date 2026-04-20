// 1. Inyectamos el formulario al HTML
const app = document.getElementById("app") as HTMLDivElement;

app.innerHTML += `
    <form id="formRegistro">
        <div>
            <label>Email:</label>
            <input type="email" id="email" required placeholder="correo@ejemplo.com">
        </div>
        <div>
            <label>Contraseña:</label>
            <input type="password" id="password" required placeholder="********">
        </div>
        <button type="submit">Registrar Usuario</button>
    </form>
`;

// 2. Lógica para capturar y guardar en el Array
const form = document.getElementById("formRegistro") as HTMLFormElement;

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    // Creamos el objeto del nuevo usuario
    const nuevoUsuario = {
        email: emailInput.value,
        password: passwordInput.value, // Capturamos contraseña como pide el ejercicio
        id: Date.now() // Un ID único opcional para identificarlo
    };

    // 3. Manejo del Array en localStorage bajo la clave "users"
    const dataGuardada = localStorage.getItem("users");
    
    // Si ya hay usuarios, los traemos; si no, creamos un array vacío
    const listaUsuarios = dataGuardada ? JSON.parse(dataGuardada) : [];

    // Agregamos el nuevo objeto al array
    listaUsuarios.push(nuevoUsuario);

    // Guardamos el array actualizado
    localStorage.setItem("users", JSON.stringify(listaUsuarios));

    alert("Usuario guardado en el array de localStorage");
    form.reset();
    
    console.log("Estado actual de 'users':", listaUsuarios);
});