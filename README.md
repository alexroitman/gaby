# Buscador de Mesas para Casamiento

Una aplicación web simple que permite a los invitados buscar en qué mesa están ubicados para un casamiento.

## Características

- Muestra todas las mesas con sus invitados
- Permite buscar por nombre del invitado
- Resalta el nombre buscado en los resultados
- Diseño responsivo que funciona en dispositivos móviles

## Cómo usar

1. Abre el archivo `index.html` en cualquier navegador web
2. Escribe el nombre del invitado en el buscador
3. Los resultados se filtrarán automáticamente a medida que escribes

## Personalización

Para personalizar las mesas y los invitados, edita el array `tablesData` en el archivo `script.js`:

```javascript
const tablesData = [
    {
        tableNumber: 1,
        guests: ["Nombre 1", "Nombre 2", "Nombre 3", "Nombre 4"]
    },
    // Agrega más mesas según sea necesario
];
```

## Tecnologías utilizadas

- HTML5
- CSS3 (con Grid para el diseño responsivo)
- JavaScript (Vanilla JS, sin frameworks) 