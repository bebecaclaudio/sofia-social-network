// c:\Users\Felipe\sofia\Project-Sofia-Social-Networking\frontend\src\components\layout\Main.tsx
import React from 'react';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    // w-full: Garante que ocupe a largura disponível (considerando o padding).
    // pl-64: Padding à esquerda para compensar a largura da Aside esquerda (w-64).
    // pt-16: Padding no topo para compensar a altura do Header.
    // pr-64: Padding à direita para compensar a largura da Aside direita (w-64). -> Aplicado apenas em 'md' e acima
    // px-4 pb-4: Padding horizontal e inferior para o conteúdo interno.
    <main className="w-full pt-16 px-4 pb-4 md:pl-64 md:pr-64"> {/* Padding lateral apenas em md+ */}
      {children}
    </main>
  );
};

export default Main;
