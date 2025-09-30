# LogicLike - Система голосования за идеи

Веб-приложение для голосования за идеи развития продукта с ограничением 10 голосов на IP-адрес.

## Стек технологий

**Backend:** Node.js, Express, TypeScript, PostgreSQL, Sequelize  
**Frontend:** React, TypeScript, Vite

## Требования

- Node.js 18+
- PostgreSQL 14+

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <url-репозитория>
cd logicLike
```

### 2. Настройка Backend

```bash
cd backend
npm install

# Создать .env файл на основе .env.example
cp .env.example .env

# Отредактировать .env и указать свои данные PostgreSQL:
# DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
```

### 3. Инициализация БД

```bash
# Создать базу данных
npm run db:create

# Применить миграции и seeders
npm run db:setup
```

### 4. Запуск Backend

```bash
npm run dev
```

Backend запустится на `http://localhost:3001`

### 5. Настройка Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend запустится на `http://localhost:3000`

## API Endpoints

- `GET /api/ideas` - Получить список идей
- `POST /api/ideas/:id/vote` - Проголосовать за идею
- `GET /api/ideas/votes/remaining` - Получить оставшиеся голоса

## Особенности

- Лимит 10 голосов с одного IP-адреса
- Корректная работа за reverse-proxy (X-Forwarded-For)
- Проверка повторного голосования
- Ошибка 409 Conflict при нарушении правил
