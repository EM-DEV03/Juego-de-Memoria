const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos de la carpeta public
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const COLORS = ['Rojo', 'Verde', 'Azul', 'Amarillo'];
const games = {};

function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// Iniciar nuevo juego
app.post('/api/start', (req, res) => {
    const id = Math.random().toString(36).substring(2, 10);
    const sequence = [randomColor()];
    games[id] = { sequence, round: 1 };
    res.json({ id, sequence: games[id].sequence, round: 1 });
});

// Validar jugada y avanzar ronda
app.post('/api/play', (req, res) => {
    const { id, userSequence } = req.body;
    if (!games[id]) return res.status(404).json({ error: 'Juego no encontrado' });

    const correct = games[id].sequence.every((color, idx) => color === userSequence[idx]);
    if (!correct || userSequence.length !== games[id].sequence.length) {
        const score = games[id].sequence.length - 1;
        delete games[id];
        return res.json({ correct: false, score });
    }
    // Siguiente ronda
    games[id].sequence.push(randomColor());
    games[id].round++;
    res.json({ correct: true, sequence: games[id].sequence, round: games[id].round });
});

// Servir index.html para cualquier ruta no API (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor Simón Dice escuchando en http://localhost:${PORT}`);
});