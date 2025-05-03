// c:\Users\Felipe\sofia\Project-Sofia-Social-Networking\backend\src\api\services\app.ts
import express from 'express';
import cors from 'cors'; // <-- 1. Importar o cors
import authRoutes from '../routes/authRoutes.js'; // Importa as rotas de autenticação (Caminho corrigido)

const app = express();

// Middlewares essenciais
app.use(cors()); // <-- 2. Usar o middleware cors ANTES das rotas
app.use(express.json()); // Para parsear JSON no corpo das requisições

// Usar as rotas de autenticação com um prefixo (opcional, mas comum)
app.use('/api/auth', authRoutes); // Todas as rotas em authRoutes terão /api/auth na frente

export default app;
