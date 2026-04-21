// 1. Definimos la Interface (Obligatorio en TS)
interface IUser {
    id: number;
    nombre: string;
    email: string;
    password: string;
    role: 'client' | 'admin'; 
}

const app = document.getElementById("app") as HTMLDivElement;

// Inyectamos de forma segura
app.innerHTML = `
    <form id="formRegistro" class="form-container">
        <h2>Registro de Usuario</h2>
        <div>
            <label>Nombre:</label>
            <input type="text" id="nombre" required minlength="3">
        </div>
        <div>
            <label>Email:</label>
            <input type="email" id="email" required>
        </div>
        <div>
            <label>Contraseña:</label>
            <input type="password" id="password" required>
        </div>
        <button type="submit">Registrar Usuario</button>
    </form>
`;

const form = document.getElementById("formRegistro") as HTMLFormElement;

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    // Captura de elementos con tipado
    const nombreInput = document.getElementById("nombre") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    // 2. Procesamiento
    const nuevoUsuario: IUser = {
        id: Date.now(),
        nombre: nombreInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        password: passwordInput.value, // es deberia jasheear
        role: 'client' // Rol por defecto según el TP
    };

    // 3. Persistencia en localStorage
    const dataGuardada = localStorage.getItem("users");
    const listaUsuarios: IUser[] = dataGuardada ? JSON.parse(dataGuardada) : [];

    // Validación: ¿Ya existe el mail?
    const existe = listaUsuarios.some(u => u.email === nuevoUsuario.email);
    
    if (existe) {
        alert("Este correo ya está registrado");
        return;
    }

    listaUsuarios.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(listaUsuarios));

    alert("Usuario registrado con éxito");
    form.reset();
    console.log("Usuarios en Storage:", listaUsuarios);
});