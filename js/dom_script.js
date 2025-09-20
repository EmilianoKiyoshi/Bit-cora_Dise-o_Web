// Variables globales
let contador = 0;
let tareas = [];
let imagenCount = 0;
const fondoOriginal = 'var(--light-color)';

// Funciones del contador
function incrementar() {
    contador++;
    document.getElementById('contador').textContent = contador;
}

function decrementar() {
    contador--;
    document.getElementById('contador').textContent = contador;
}

function resetear() {
    contador = 0;
    document.getElementById('contador').textContent = contador;
}

// Funciones de la lista de tareas
function agregarTarea() {
    const input = document.getElementById('nueva-tarea');
    const texto = input.value.trim();

    if (texto === '') {
        alert('Por favor, escribe una tarea');
        return;
    }

    const tarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };

    tareas.push(tarea);
    input.value = '';
    renderizarTareas();
}

function renderizarTareas() {
    const lista = document.getElementById('lista-tareas');
    lista.innerHTML = '';

    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = `tarea-item ${tarea.completada ? 'completed' : ''}`;
        li.innerHTML = `
                    <span onclick="toggleTarea(${tarea.id})" style="cursor: pointer; flex: 1;">${tarea.texto}</span>
                    <button class="btn danger" onclick="eliminarTarea(${tarea.id})" style="margin: 0; padding: 0.3rem 0.8rem;">Eliminar</button>
                `;
        lista.appendChild(li);
    });
}

function toggleTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        renderizarTareas();
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderizarTareas();
}

// Funciones de cambio de color
function cambiarFondo(color) {
    document.body.style.background = color;
}

function restaurarFondo() {
    document.body.style.background = fondoOriginal;
}

// Funciones del formulario
function procesarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const edad = document.getElementById('edad').value;
    const mensaje = document.getElementById('mensaje').value;

    if (!nombre || !email) {
        alert('Por favor, completa al menos el nombre y email');
        return;
    }

    const resultado = document.getElementById('resultado-formulario');
    resultado.innerHTML = `
                <h3>Datos procesados:</h3>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Edad:</strong> ${edad || 'No especificada'}</p>
                <p><strong>Mensaje:</strong> ${mensaje || 'Sin mensaje'}</p>
            `;
    resultado.style.display = 'block';
}

function limpiarFormulario() {
    document.getElementById('formulario-dinamico').reset();
    document.getElementById('resultado-formulario').style.display = 'none';
}

// Funciones de la galeria
function agregarImagen() {
    imagenCount++;
    const galeria = document.getElementById('galeria');
    const div = document.createElement('div');
    div.className = 'imagen-placeholder';
    div.innerHTML = `📷 ${imagenCount}`;
    div.onclick = function () {
        this.remove();
    };
    galeria.appendChild(div);
}

function eliminarUltimaImagen() {
    const galeria = document.getElementById('galeria');
    const imagenes = galeria.querySelectorAll('.imagen-placeholder');
    if (imagenes.length > 0) {
        imagenes[imagenes.length - 1].remove();
    }
}

function limpiarGaleria() {
    document.getElementById('galeria').innerHTML = '';
    imagenCount = 0;
}

// Función de opacidad
function cambiarOpacidad(valor) {
    const elementos = document.querySelectorAll('.demo-section');
    elementos.forEach(elemento => {
        elemento.style.opacity = valor / 100;
    });
    document.getElementById('valor-opacidad').textContent = valor + '%';
}

// Funciones de manipulacion de texto
function actualizarTexto() {
    const input = document.getElementById('texto-input');
    const resultado = document.getElementById('texto-resultado');
    resultado.textContent = input.value || 'Tu texto aparecerá aquí...';
}

function cambiarEstilo(tipo) {
    const input = document.getElementById('texto-input');
    const resultado = document.getElementById('texto-resultado');
    let texto = input.value;

    if (!texto) {
        alert('Por favor, escribe algo primero');
        return;
    }

    switch (tipo) {
        case 'mayuscula':
            texto = texto.toUpperCase();
            break;
        case 'minuscula':
            texto = texto.toLowerCase();
            break;
        case 'capitalize':
            texto = texto.split(' ').map(palabra =>
                palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
            ).join(' ');
            break;
        case 'reverse':
            texto = texto.split('').reverse().join('');
            break;
    }

    resultado.textContent = texto;
}

// Función de visibilidad
function toggleElemento(id) {
    const elemento = document.getElementById(id);
    if (elemento.style.display === 'none') {
        elemento.style.display = 'block';
    } else {
        elemento.style.display = 'none';
    }
}

// Funcionalidad del menu hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Manejo de Enter en el input de tareas
document.getElementById('nueva-tarea').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

// Inicializacion
document.addEventListener('DOMContentLoaded', function () {
    console.log('Página de Manipulación del DOM cargada correctamente');
});