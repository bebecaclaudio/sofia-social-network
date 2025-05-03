// src/server.ts
import app from '../api/services/app.js';
import pool from '../api/config/db.js'; // Importa para garantir que a conexão seja tentada na inicialização

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown (Opcional, mas bom para produção)
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    pool.end(); // Fecha o pool de conexões do DB
    console.log('Database pool closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      pool.end(); // Fecha o pool de conexões do DB
      console.log('Database pool closed');
      process.exit(0);
    });
  });
