// c:\Users\Felipe\sofia\Project-Sofia-Social-Networking\frontend\src\components\ui\SocialButton.tsx
import React from 'react';

// Estilos base comuns a todos os botões sociais
const baseClasses = "flex items-center justify-center w-10 h-10 border border-transparent rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform duration-200 ease-in-out hover:scale-110";

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string; // Permite passar classes adicionais (ex: bg-red-600)
  style?: React.CSSProperties; // Permite passar estilos inline (ex: backgroundColor)
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, onClick, className = '', style }) => {
  return (
    <button type="button" aria-label={label} onClick={onClick}
      className={`${baseClasses} ${className}`} // Combina as classes base com as recebidas
      style={style} // Aplica estilos inline recebidos
    >
      {icon}
    </button>
  );
};

export default SocialButton;