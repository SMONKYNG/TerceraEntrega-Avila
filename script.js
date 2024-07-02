
const calcularPrecioFinal = (precio, descuento) => {
    return precio * (1 - (descuento / 100));
};

const crearVenta = () => {
    const venta = {};

    venta.nombre = document.getElementById('nameInput').value;
    venta.rut = document.getElementById('rutInput').value;
    venta.fecha = document.getElementById('dateInput').value;
    venta.codigo = document.getElementById('codeInput').value;
    venta.producto = document.getElementById('productInput').value;
    venta.precio = parseInt(document.getElementById('priceInput').value);
    venta.descuento = parseInt(document.getElementById('dctoInput').value);
    venta.precioFinal = calcularPrecioFinal(venta.precio, venta.descuento);

    return venta;
};

const resumenVenta = (venta) => {
    const listadoVentas = document.getElementById('listadoVentas');

    const divVenta = document.createElement('div');
    divVenta.classList.add('venta');
    divVenta.innerHTML = `
        <p><strong>Nombre:</strong> ${venta.nombre}</p>
        <p><strong>RUT:</strong> ${venta.rut}</p>
        <p><strong>Fecha:</strong> ${venta.fecha}</p>
        <p><strong>Código Producto:</strong> ${venta.codigo}</p>
        <p><strong>Producto:</strong> ${venta.producto}</p>
        <p><strong>Precio:</strong> ${venta.precio}</p>
        <p><strong>Descuento:</strong> ${venta.descuento}%</p>
        <p><strong>Precio Final:</strong> ${venta.precioFinal}</p>
        <button class="btn3" onclick="eliminarVenta(event)">Eliminar</button>
    `;
    listadoVentas.appendChild(divVenta);

    guardarVenta(venta);
};


const guardarVenta = (venta) => {
    let ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventasGuardadas.push(venta);
    localStorage.setItem('ventas', JSON.stringify(ventasGuardadas));
};


const cargarVentas = () => {
    const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventasGuardadas.forEach(venta => resumenVenta(venta));
};


const limpiarFormulario = () => {
    document.getElementById('nameInput').value = '';
    document.getElementById('rutInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('codeInput').value = '';
    document.getElementById('productInput').value = '';
    document.getElementById('priceInput').value = '';
    document.getElementById('dctoInput').value = '';
};


const main = () => {
    cargarVentas();

    const formulario = document.getElementById('formRegistro');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const venta = crearVenta();
        resumenVenta(venta);
        limpiarFormulario();
    });
};

const eliminarVenta = (event) => {
    const divVenta = event.target.parentNode;
    divVenta.remove();

    let ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventasGuardadas = ventasGuardadas.filter(venta => venta.rut !== rutVenta);
    localStorage.setItem('ventas', JSON.stringify(ventasGuardadas));
};

main();