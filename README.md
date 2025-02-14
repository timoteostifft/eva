# 🌐 Eva Technical Assigment

### 📚 Library

- Typescript
- Express
- Awilix
- Mongoose
- Joi
- BullMQ
- Vite
- Tailwind

### 🚀 How To Use

1. Clone repository:

```bash
  git clone https://github.com/timoteostifft/eva.git && cd eva
```

2. Create your own .env copying env.example.

```bash
  cp ./frontend/.env.example frontend/.env && cp ./backend/.env.example backend/.env
```

3. Install local dependencies.

```bash
  (cd backend && pnpm install) & (cd frontend && pnpm install)
```

4. Run using docker-compose:

```bash
  docker-compose up --build
```

5. Run the seed:

```bash
  cd backend && pnpm run seed
```

### 🧪 Testing

1. Ensure you have [pnpm](https://pnpm.io/pt/) installed

2. Go to the backend folder and run:

```bash
  pnpm run test
```

### 📌 Notes

A webapp server in be created [here](http://localhost:5173/)

A database manager will be created [here](http://localhost:3010/)

Once a job is completed, it shall be displayed in the server terminal
