const API_URL = window.location.origin + '/api';

// Colores disponibles en el juego
const COLORS = ['Rojo', 'Verde', 'Azul', 'Amarillo'];

// Referencias a los elementos del DOM
const colorBtns = Array.from(document.querySelectorAll('.color-btn'));
const startBtn = document.getElementById('start-btn');
const scoreDiv = document.getElementById('score');
const messageDiv = document.getElementById('message');

// Variables de estado del juego
let gameId = null;
let sequence = [];
let userSequence = [];
let playing = false;

// Función para pausar la ejecución (usada para animaciones)
function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// Muestra la secuencia de colores al usuario, activando los botones visualmente
async function showSequence() {
    for (const color of sequence) {
        const btn = colorBtns.find(b => b.dataset.color === color);
        btn.classList.add('active');
        await sleep(600);
        btn.classList.remove('active');
        await sleep(200);
    }
}

// Reinicia el estado del juego en el frontend
function resetGame() {
    sequence = [];
    userSequence = [];
    playing = false;
    scoreDiv.textContent = '';
    messageDiv.textContent = '';
    gameId = null;
}

// Inicia un nuevo juego solicitando al backend la secuencia inicial
async function startGame() {
    resetGame();
    const res = await fetch(`${API_URL}/start`, { method: 'POST' });
    const data = await res.json();
    gameId = data.id;
    sequence = data.sequence;
    scoreDiv.textContent = `Ronda: ${data.round}`;
    await sleep(800);
    await showSequence();
    messageDiv.textContent = '¡Tu turno!';
    playing = true;
    userSequence = [];
}

// Envía la secuencia ingresada por el usuario al backend y gestiona la respuesta
async function playTurn() {
    const res = await fetch(`${API_URL}/play`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: gameId, userSequence })
    });
    const data = await res.json();
    if (data.correct) {
        // Si la secuencia es correcta, avanza de ronda y muestra la nueva secuencia
        sequence = data.sequence;
        scoreDiv.textContent = `Ronda: ${data.round}`;
        messageDiv.textContent = '¡Correcto!';
        await sleep(800);
        await showSequence();
        messageDiv.textContent = '¡Tu turno!';
        userSequence = [];
        playing = true;
    } else {
        // Si es incorrecta, muestra mensaje de fin de juego
        messageDiv.textContent = `¡Incorrecto! Juego terminado. Puntaje final: ${data.score}`;
        playing = false;
    }
}

// Maneja los clics en los botones de colores
colorBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        if (!playing) return; // Ignora clics si no es el turno del usuario
        const color = btn.dataset.color;
        btn.classList.add('active');
        await sleep(200);
        btn.classList.remove('active');
        userSequence.push(color);
        // Cuando el usuario completa la secuencia, se valida con el backend
        if (userSequence.length === sequence.length) {
            playing = false;
            await playTurn();
        }
    });
});

// Inicia el juego al hacer clic en el botón "Comenzar"
startBtn.addEventListener('click', startGame);
