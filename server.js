const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Разрешить запросы только с клиента
    credentials: true
}));

const users = {
    player1: 'player1',
    player2: 'player2'
};

// Хранилище для сессий в памяти
const sessions = {}; // Например, { sessionId123: "player1" }

const games = require('./data/data.json');

// Генерация уникального ID сессии
const generateSessionId = () => `${Date.now()}_${Math.random()}`;

// Маршрут для входа
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        const sessionId = generateSessionId();
        sessions[sessionId] = username; // Сохранение сессии на сервере
        res.status(200).send({ message: 'Login successful', sessionId });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

// Middleware для проверки аутентификации
const isAuthenticated = (req, res, next) => {
    const sessionId = req.headers['session-id']; // Получаем ID сессии из заголовка
    if (sessions[sessionId]) {
        next(); // Если сессия найдена, продолжаем
    } else {
        res.status(401).send({ message: 'Unauthorized' });
    }
};

// Защищённый маршрут с проверкой сессии
app.get('/games', isAuthenticated, (req, res) => {
    res.status(200).send(games);
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});