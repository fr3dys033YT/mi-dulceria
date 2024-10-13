// Datos iniciales de los dulces (por defecto si no hay nada en el localStorage)
const dulcesIniciales = [
    { nombre: "Paleta Payaso", precio: "$10.00" },
    { nombre: "Chicle Motita", precio: "$5.00" },
    { nombre: "Duvalín", precio: "$8.00" },
    { nombre: "Gomitas de Osito", precio: "$12.00" },
    { nombre: "Pelón Pelo Rico", precio: "$15.00" },
];

// Verifica si hay dulces guardados en el localStorage, si no, guarda los iniciales
function checkLocalStorage() {
    if (!localStorage.getItem('dulces')) {
        localStorage.setItem('dulces', JSON.stringify(dulcesIniciales));
    }
}

// Carga los dulces desde localStorage y los muestra en la página de lista de dulces
function loadDulces() {
    checkLocalStorage();
    const dulces = JSON.parse(localStorage.getItem('dulces'));
    const dulcesTable = document.getElementById('dulces-lista');

    dulces.forEach(dulce => {
        const row = dulcesTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = dulce.nombre;
        cell2.innerHTML = dulce.precio;
    });
}

// Cargar los dulces en la página de edición
function loadEditableDulces() {
    checkLocalStorage();
    const dulces = JSON.parse(localStorage.getItem('dulces'));
    const dulcesTable = document.getElementById('dulces-table');

    dulces.forEach(dulce => {
        const row = dulcesTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = `<input type="text" value="${dulce.nombre}">`;
        cell2.innerHTML = `<input type="text" value="${dulce.precio}">`;
        cell3.innerHTML = '<button onclick="saveRow(this)">Guardar</button>';
    });
}

// Añadir fila en la tabla de edición
function addRow() {
    const table = document.getElementById('dulces-table');
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerHTML = '<input type="text" value="Nuevo Dulce">';
    cell2.innerHTML = '<input type="text" value="$0.00">';
    cell3.innerHTML = '<button onclick="saveRow(this)">Guardar</button>';
}

// Guardar los datos actualizados en el localStorage
function saveData() {
    const dulcesTable = document.getElementById('dulces-table');
    const dulces = [];

    for (let i = 1; i < dulcesTable.rows.length; i++) {
        const nombre = dulcesTable.rows[i].cells[0].getElementsByTagName('input')[0].value;
        const precio = dulcesTable.rows[i].cells[1].getElementsByTagName('input')[0].value;
        dulces.push({ nombre, precio });
    }

    localStorage.setItem('dulces', JSON.stringify(dulces));
    alert('Cambios guardados con éxito.');
}

// Función de login para acceder a la edición de dulces
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'Aldo' && password === 'fr3dys') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('edit-section').style.display = 'block';
        loadEditableDulces(); // Cargar dulces al iniciar sesión
    } else {
        document.getElementById('error-msg').textContent = 'Usuario o contraseña incorrectos';
    }
}

function submitFeedback() {
    const feedback = document.getElementById('feedback').value;
    if (feedback.trim()) {
        alert('¡Gracias por tus comentarios!');
        document.getElementById('feedback').value = '';
    } else {
        alert('Por favor, escribe algún comentario antes de enviar.');
    }
}

