import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
// Carrega as variáveis de ambiente do arquivo .env na raiz do projeto
dotenv.config();
// Verifica se as variáveis essenciais do banco foram carregadas
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    console.error("FATAL ERROR: Database environment variables (DB_HOST, DB_USER, DB_NAME) are not defined. Check your .env file.");
    process.exit(1); // Encerra a aplicação se variáveis críticas estiverem faltando
}
const dbConfig = {
    host: process.env.DB_HOST, // Removido fallback para 'localhost' para forçar definição no .env
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '', // Permite senha vazia se não definida (não recomendado para produção)
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306', 10), // Converte para número, padrão 3306
    waitForConnections: true,
    connectionLimit: 10, // Número de conexões simultâneas permitidas
    queueLimit: 0 // Sem limite na fila de espera por conexões
};
const pool = mysql.createPool(dbConfig);
// Testa a conexão inicial (bom para debug)
pool.getConnection()
    .then(connection => {
    console.log('Successfully connected to the MySQL database.');
    connection.release(); // Libera a conexão de teste de volta para o pool
})
    .catch(err => {
    console.error('Error connecting to the MySQL database:', err.code, err.message);
    // Considerar encerrar a aplicação se a conexão inicial falhar
    // process.exit(1);
});
export default pool; // Exporta o pool para ser usado em outros arquivos
//# sourceMappingURL=db.js.map