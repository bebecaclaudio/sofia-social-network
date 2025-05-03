// c:\Users\Felipe\sofia\Project-Sofia-Social-Networking\frontend\src\App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FragmentoPage from './pages/FragmentoPage'; // 1. Importe o FragmentoPage
// import RegisterPage from './pages/RegisterPage'; // Exemplo, mantenha se for usar

function App() {
  // Lógica de autenticação pode ser adicionada aqui no futuro
  // Por exemplo, verificar se há um token válido no localStorage
  // e redirecionar para /fragmento ou /login conforme necessário.

  return (
    <Router>
      <Routes>
        {/* Rota Raiz '/' mostra a LoginPage (ou poderia redirecionar se já logado) */}
        <Route path="/" element={<LoginPage />} />

        {/* Se alguém tentar acessar /login diretamente, redireciona para / */}
        {/* Isso evita ter duas URLs para a mesma página de login */}
        <Route path="/login" element={<Navigate to="/" replace />} />

        {/* Exemplo de rota de registro (se existir) */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* 2. Adiciona a rota para /fragmento */}
        {/* Idealmente, esta rota deveria ser protegida, permitindo acesso
            apenas se o usuário estiver autenticado. */}
        <Route path="/fragmento" element={<FragmentoPage />} />

        {/* Outras rotas futuras podem ser adicionadas aqui */}
        {/* Ex: <Route path="/perfil/:userId" element={<ProfilePage />} /> */}
        {/* Ex: <Route path="/configuracoes" element={<SettingsPage />} /> */}

        {/* Rota Catch-all (404 - Não encontrado) - Opcional */}
        {/* Se nenhuma rota acima corresponder, pode mostrar uma página 404 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
