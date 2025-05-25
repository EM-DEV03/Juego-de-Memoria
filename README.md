# 🧠 Simón Dice - Juego de Memoria Web
![Node.js](https://img.shields.io/badge/Node.js-v18.x-green?logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=black)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express&logoColor=black)

¡Pon a prueba tu memoria con este clásico juego recreado con tecnologías modernas!  
Simón Dice es un juego donde debes repetir secuencias de colores que se vuelven más difíciles en cada ronda. ¿Hasta dónde puedes llegar?

## 🎮 Demo

> 🚀 **[Jugar ahora](https://TU-DOMINIO.com)**  
*(Reemplaza con tu URL real si lo tienes desplegado)*

---

## 📦 Estructura del Proyecto

app/
├── package.json
├── server.js # Backend (Node.js + Express)
├── public/ # Frontend estático
│ ├── index.html # Página principal
│ ├── frontend.js # Lógica del juego en el navegador
│ └── styles.css # Estilos visuales del juego
└── src/

---

## 🚀 Tecnologías Usadas

- 🔧 **JavaScript** (ESModules)
- 🖥️ **Node.js** + **Express** (Backend)
- 🌐 **HTML5** + **CSS3**
- 🔄 **CORS** para evitar errores cross-origin
- 📁 Servidor de archivos estáticos con Express

---

## 📌 Características Principales

- ✅ Interfaz moderna y responsiva
- ✅ Lógica backend para múltiples sesiones de juego
- ✅ Validación de secuencias de colores
- ✅ Secuencias progresivamente más largas
- ✅ Sistema de puntaje automático

---

## 🧠 ¿Cómo funciona?

1. Se genera un ID único por jugador al iniciar una nueva partida.
2. El servidor devuelve una secuencia inicial aleatoria.
3. El jugador repite la secuencia haciendo clic en los botones de colores.
4. Si acierta, se le agrega un nuevo color y pasa a la siguiente ronda.
5. Si falla, termina la partida y se muestra el puntaje final.

🛠️ Instalación y ejecución
# Clona el repositorio
git clone https://github.com/tu-usuario/simon-dice-web.git
cd simon-dice-web

# Instala las dependencias
npm install

# Inicia el servidor en localhost:3000
npm start

💡 Ideas futuras
🎵 Añadir sonidos al presionar los botones
💾 Guardar puntajes más altos (high scores)
🕹️ Multijugador en tiempo real con Socket.io
📱 Versión para móviles (PWA)

👨‍💻 Autor
Desarrollado con ❤️ por EM
