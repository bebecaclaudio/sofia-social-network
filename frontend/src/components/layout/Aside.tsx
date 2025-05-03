// c:\Users\Felipe\sofia\Project-Sofia-Social-Networking\frontend\src\components\layout\Aside.tsx
import React from 'react';
import Footer from './Footer'; // Importa o Footer
import { Link } from 'react-router-dom';

// Componente funcional Aside para a barra lateral esquerda
const Aside: React.FC = () => {
  return (
    // Tag <aside> para semântica de conteúdo complementar/navegação lateral
    // Estilos Tailwind para:
    // - Posicionamento fixo no lado esquerdo (fixed top-0 left-0)
    // - Altura total da tela (h-screen)
    // - Largura definida (w-64) - ajuste conforme necessário
    // - Fundo branco e sombra (bg-white shadow-md)
    // - Padding interno (p-4)
    // - Layout flexível vertical (flex flex-col)
    // - Z-index para ficar acima de outros conteúdos (z-20)
    // - Responsividade: Escondida por padrão (hidden), exibida como flex container
    //   a partir do breakpoint 'md' (md:flex)
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4 flex flex-col z-20 hidden md:flex">
      {/* Opcional: Logo ou título da aplicação */}
      <div className="mb-8"> {/* Espaçamento abaixo do logo/título */}
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-sofia-accent">
          Sofia Social {/* Exemplo de Título/Logo */}
        </Link>
      </div>

      {/* Container para os links de navegação com espaçamento vertical */}
      {/* Usando <nav> aqui dentro para agrupar semanticamente os links principais */}
      <nav className="flex flex-col space-y-2">
        {/* Links de navegação usando o componente Link */}
        {/* Estilos para exibição em bloco, padding, cantos arredondados e hover */}
        <Link
          to="/fragmento"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-sofia-accent font-medium"
        >
          Feed
        </Link>
        <Link
          to="/Fragmento"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-sofia-accent font-medium"
        >
          Meu Fragmento
        </Link>
        <Link
          to="/mensagens"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-sofia-accent font-medium"
        >
          Mensagens
        </Link>
        <Link
          to="/grupos"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-sofia-accent font-medium"
        >
          Grupos
        </Link>
        <Link
          to="/configuracoes"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-sofia-accent font-medium"
        >
          Configurações
        </Link>
      </nav>

      {/* Renderiza o Footer na parte inferior da Sidebar */}
      <div className="mt-auto pt-4 border-t border-gray-200"> {/* Empurra para baixo, adiciona padding e borda superior */}
        <Footer />
      </div>
    </aside>
  );
};

// Exporta o componente Aside
export default Aside;
