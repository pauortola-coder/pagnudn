let prestamos = JSON.parse(localStorage.getItem('prestamos')) || []
let indiceEdicion = null

const nombre = document.getElementById('nombreAlumno')
const material = document.getElementById('material')
const devuelto = document.getElementById('devuelto')
const boton = document.getElementById('botonGuardar')
const tabla = document.getElementById('cuerpoTabla')
const mensajeVacio = document.getElementById('mensajeVacio')

boton.addEventListener('click', guardar)

function guardar() {
    const turno = document.querySelector("input[name='turno']:checked")
    if (!nombre.value.trim() || !material.value || !turno) {
        alert('Todos los campos son obligatorios')
        return
    }
    const prestamo = {
        nombreAlumno: nombre.value.trim(),
        material: material.value,
        turno: turno.value,
        devuelto: devuelto.checked
    }
    if (indiceEdicion !== null) {
        actualizar(prestamo)
    } else {
        crear(prestamo)
    }
    limpiar()
    mostrar()
}

function crear(prestamo) {
    prestamos.push(prestamo)
}

function actualizar(prestamo) {
    prestamos[indiceEdicion] = prestamo
    indiceEdicion = null
    boton.textContent = 'Añadir préstamo'
}

function mostrar() {
    localStorage.setItem('prestamos', JSON.stringify(prestamos))
    tabla.innerHTML = ""
    mensajeVacio.style.display = prestamos.length ? 'none' : 'block'
    prestamos.forEach((p, i) => {
        tabla.innerHTML += `
            <tr>
                <td>${p.nombreAlumno}</td>
                <td>${p.material}</td>
                <td>${p.turno}</td>
                <td>${p.devuelto ? 'Sí' : 'No'}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar(${i})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="borrar(${i})">Borrar</button>
                </td>
            </tr>`
    })
}

function limpiar() {
    nombre.value = ""
    material.value = ""
    devuelto.checked = false
    document.querySelectorAll("input[name='turno']").forEach(r => r.checked = false)
}

function borrar(i) {
    prestamos.splice(i, 1)
    mostrar()
}

function editar(i) {
    const p = prestamos[i]
    nombre.value = p.nombreAlumno
    material.value = p.material
    devuelto.checked = p.devuelto
    document.querySelector(`input[name='turno'][value='${p.turno}']`).checked = true
    indiceEdicion = i
    boton.textContent = 'Guardar cambios'
    nombre.focus()
}

mostrar()
