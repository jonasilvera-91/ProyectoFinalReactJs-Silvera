# Proyecto Final React - E-commerce

SPA de e-commerce desarrollada con React + Vite.

## Funcionalidades
- Catálogo de productos desde Firestore
- Filtrado por categorías
- Detalle de producto por ID
- Contador de unidades (ItemCount) con validación por stock
- Carrito global con Context API (agregar, eliminar, vaciar, totales)
- Checkout con formulario
- Generación de orden en Firestore y muestra del ID de compra

## Tecnologías
- React
- Vite
- React Router DOM
- Firebase / Firestore
- CSS Modules

## Instalación y ejecución
```bash
npm install
npm run dev

🟢 Cómo corre el proyecto localmente  
📌 Esto va así, con los ``` porque es Markdown.

## Estructura
- `components/`: componentes de presentación (NavBar, Item, ItemList, ItemDetail, ItemCount, CartWidget)
- `containers/`: contenedores con lógica y fetch (ItemListContainer, ItemDetailContainer, Cart, Checkout)
- `context/`: CartContext
- `services/`: configuración de Firebase

## Base de datos
La aplicación utiliza Firebase Firestore para:
- Almacenar productos
- Registrar órdenes de compra generadas desde el checkout
