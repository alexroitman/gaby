// Datos de ejemplo de las mesas y sus invitados
const tablesData = [
    {
        tableNumber: 1,
        guests: ["Juan Pérez", "María García", "Pedro Rodríguez", "Laura Martínez"]
    },
    {
        tableNumber: 2,
        guests: ["Carlos López", "Ana Sánchez", "Diego Fernández", "Sofía Gómez"]
    },
    {
        tableNumber: 3,
        guests: ["Javier Díaz", "Elena Torres", "Andrés Ruiz", "Carmen Moreno"]
    },
    {
        tableNumber: 4,
        guests: ["Roberto Jiménez", "Lucía Álvarez", "Miguel Romero", "Paula Gutiérrez"]
    },
    {
        tableNumber: 5,
        guests: ["Francisco Hernández", "Cristina Muñoz", "Alberto Serrano", "Isabel Navarro"]
    },
    {
        tableNumber: 6,
        guests: ["David Alonso", "Marta Domínguez", "Jorge Vázquez", "Raquel Medina"]
    }
];

// Referencias a elementos del DOM
const searchInput = document.getElementById('searchInput');
const tableContainer = document.getElementById('tableContainer');
const resultMessage = document.getElementById('resultMessage');

// Función para normalizar texto (quitar acentos y convertir a minúsculas)
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Función para mostrar todas las mesas
function displayAllTables() {
    tableContainer.innerHTML = '';
    
    tablesData.forEach(table => {
        const tableCard = createTableCard(table);
        tableContainer.appendChild(tableCard);
    });
    
    resultMessage.textContent = '';
}

// Función para crear una tarjeta de mesa
function createTableCard(table, highlightGuest = '') {
    const tableCard = document.createElement('div');
    tableCard.classList.add('table-card');
    
    const tableNumber = document.createElement('div');
    tableNumber.classList.add('table-number');
    tableNumber.textContent = `Mesa ${table.tableNumber}`;
    
    const guestList = document.createElement('ul');
    guestList.classList.add('guest-list');
    
    table.guests.forEach(guest => {
        const listItem = document.createElement('li');
        
        if (highlightGuest && normalizeText(guest).includes(normalizeText(highlightGuest))) {
            // Crear una expresión regular que coincida con el término de búsqueda 
            // sin importar mayúsculas/minúsculas y acentos
            const escapedSearchTerm = highlightGuest.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const accentInsensitiveRegex = new RegExp(escapedSearchTerm.split('').map(c => {
                if (/[a-zA-Z]/.test(c)) {
                    const lower = c.toLowerCase();
                    return `[${lower}${lower.toUpperCase()}${
                        lower === 'a' ? 'áÁàÀâÂäÄ' :
                        lower === 'e' ? 'éÉèÈêÊëË' :
                        lower === 'i' ? 'íÍìÌîÎïÏ' :
                        lower === 'o' ? 'óÓòÒôÔöÖ' :
                        lower === 'u' ? 'úÚùÙûÛüÜ' :
                        lower === 'n' ? 'nNñÑ' : c
                    }]`;
                }
                return c;
            }).join(''), 'g');
            
            listItem.innerHTML = guest.replace(accentInsensitiveRegex, 
                '<span class="highlight">$&</span>'
            );
        } else {
            listItem.textContent = guest;
        }
        
        guestList.appendChild(listItem);
    });
    
    tableCard.appendChild(tableNumber);
    tableCard.appendChild(guestList);
    
    return tableCard;
}

// Función para filtrar mesas por nombre de invitado
function filterTables(searchTerm) {
    if (!searchTerm.trim()) {
        displayAllTables();
        return;
    }
    
    const normalizedSearchTerm = normalizeText(searchTerm);
    
    const filteredTables = tablesData.filter(table => 
        table.guests.some(guest => 
            normalizeText(guest).includes(normalizedSearchTerm)
        )
    );
    
    tableContainer.innerHTML = '';
    
    if (filteredTables.length === 0) {
        resultMessage.textContent = `No se encontraron invitados con el nombre "${searchTerm}"`;
    } else {
        resultMessage.textContent = `Se encontraron ${filteredTables.length} ${filteredTables.length === 1 ? 'mesa' : 'mesas'} con invitados que coinciden con "${searchTerm}"`;
        
        filteredTables.forEach(table => {
            const tableCard = createTableCard(table, searchTerm);
            tableContainer.appendChild(tableCard);
        });
    }
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    filterTables(e.target.value);
});

// Mostrar todas las mesas al cargar la página
document.addEventListener('DOMContentLoaded', displayAllTables); 