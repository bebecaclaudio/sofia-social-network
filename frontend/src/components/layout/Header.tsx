import React from 'react';
import logoSrc from '../../assets/logo.png'; // Ajuste o caminho se necessário
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Usuário deslogado (simulação)');
    // Lógica real de logout (limpar token, etc.)
    navigate('/'); // Volta para a página de login
  };

  return (
    // sticky top-0: Mantém o header fixo no topo após scroll.
    // z-30: Garante que o header fique acima da sidebar (que tem z-20).
    <header className="w-full bg-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <img src={logoSrc} alt="Sofia Logo" className="h-8 w-auto" />

        {/* Placeholder para busca ou outros itens centrais */}
        <div className="flex-1 mx-4">
          {/* <input type="text" placeholder="Buscar..." className="w-full max-w-xs px-3 py-1 border rounded-md" /> */}
        </div>

        {/* Ações do Usuário */}
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-sm font-medium"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
