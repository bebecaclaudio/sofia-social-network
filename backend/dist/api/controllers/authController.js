var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt'; // <--- Corrigido para bcrypt
// import jwt from 'jsonwebtoken';
import jwt from 'jsonwebtoken'; // <--- Descomentado para usar na função loginElo
import pool from '../config/db.js'; // <-- Adicione esta linha. Ajuste o caminho '../config/db' se necessário!
// Define o custo do hashing (leia do .env ou use 10 como padrão)
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
/**
 * Conecta (autentica) um "elo" existente.
 * Recebe email e senha, verifica se o email já existe,
 * hasheia a senha e salva no banco de dados.
 */
export const aderirElo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // 1. Validação de Entrada
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' });
        return;
    }
    // Adicionar validações mais robustas aqui (formato de email, força da senha) se necessário
    try {
        // 2. Verificar se o email já está em uso
        const [existingElos] = yield pool.query('SELECT id FROM elos WHERE email = ?', [email]);
        if (existingElos.length > 0) {
            res.status(409).json({ message: 'Email already registered.' }); // 409 Conflict
            return;
        }
        // 3. Hashear a senha
        const passwordHash = yield bcrypt.hash(password, saltRounds);
        // 4. Inserir o novo "elo" no banco de dados
        const [result] = yield pool.query('INSERT INTO elos (email, password_hash) VALUES (?, ?)', [email, passwordHash]);
        // 5. Retornar sucesso
        res.status(201).json({ message: 'Elo registered successfully!', eloId: result.insertId });
    }
    catch (error) {
        console.error('Error connecting elo:', error);
        res.status(500).json({ message: 'Internal server error during registration.' });
    }
});
/**
 * Autentica um "elo" existente.
 * Recebe email e senha, busca o "elo" no banco,
 * compara a senha fornecida com o hash armazenado e,
 * se válido, retorna um token JWT.
 */
export const conectarElo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // 1. Validação de Entrada
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' });
        return;
    }
    try {
        // 2. Buscar o "elo" pelo email
        const [elos] = yield pool.query('SELECT id, email, password_hash FROM elos WHERE email = ?', [email]);
        if (elos.length === 0) {
            res.status(401).json({ message: 'Invalid credentials.' }); // Email não encontrado
            return;
        }
        const elo = elos[0];
        // 3. Comparar a senha fornecida com o hash armazenado
        const isMatch = yield bcrypt.compare(password, elo.password_hash);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials.' }); // Senha incorreta
            return;
        }
        // 4. Gerar Token JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in environment variables.');
            res.status(500).json({ message: 'Internal server configuration error.' });
            return;
        }
        const payload = { id: elo.id, email: elo.email };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Defina a expiração desejada
        // 5. Retornar sucesso com o token
        res.status(200).json({ message: 'Login successful!', token: token });
    }
    catch (error) {
        console.error('Error logging in elo:', error);
        res.status(500).json({ message: 'Internal server error during login.' });
    }
});
//# sourceMappingURL=authController.js.map