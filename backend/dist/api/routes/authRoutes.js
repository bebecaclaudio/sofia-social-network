// c:\Users\Felipe\sofia\Project-Sofia-Social-Networking\backend\src\routes\authRoutes.ts
import express from 'express';
import { aderirElo, conectarElo } from '../controllers/authController.js'; // Importa as funções do controller
const router = express.Router();
// Rota para registro (POST /api/auth/register)
router.post('/aderir', aderirElo);
// Rota para conexão/login (POST /api/auth/conectar)
// Usando '/conectar' como você sugeriu e apontando para a função connectElo
router.post('/conectar', conectarElo);
export default router;
//# sourceMappingURL=authRoutes.js.map