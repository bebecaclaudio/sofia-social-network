// c:\Users\Felipe\sofia\Project-Sofia-Social-Networking\frontend\src\components\layout\AsideRight.tsx
import React from 'react';

// Componente Placeholder para a Sidebar Direita
const AsideRight: React.FC = () => {
  return (
    // Estilos básicos para a sidebar direita:
    // - Fixa na direita (fixed top-0 right-0)
    // - Altura total (h-screen)
    // - Largura (w-64) - ajuste se necessário
    // - Fundo e sombra (bg-white shadow-md)
    // - Padding (p-4)
    // - Z-index (z-20) - igual à esquerda, abaixo do header
    <aside className="fixed top-0 right-0 h-screen w-64 bg-white shadow-md p-4 flex flex-col z-20">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Sidebar Direita</h2>
      {/* Conteúdo da sidebar direita virá aqui */}
      <p className="text-sm text-gray-500">Em breve...</p>
    </aside>
  );
};

export default AsideRight;