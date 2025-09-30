import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Импортируем БД и роуты
const { sequelize } = require('../db/models');
import ideasRouter from './routes/ideas';

// Middleware
app.use(cors());
app.use(express.json());

// Логирование запросов в development режиме
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api/ideas', ideasRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Обработка несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Подключение к БД и запуск сервера
async function startServer() {
  try {
    console.log('Подключение к базе данных...');
    await sequelize.authenticate();
    console.log('✓ Подключение к базе данных успешно установлено');

    app.listen(PORT, () => {
      console.log(`\n🚀 Сервер запущен на http://localhost:${PORT}`);
      console.log(`📊 API доступно на http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
    process.exit(1);
  }
}

startServer();
