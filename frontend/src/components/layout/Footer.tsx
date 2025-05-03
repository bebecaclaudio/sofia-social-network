// src/components/layout/Footer.tsx
import React, { useState, ChangeEvent } from 'react';

const Footer: React.FC = () => {
  // Estado para controlar o idioma selecionado
  const [selectedLanguage, setSelectedLanguage] = useState('pt');

  // Handler para mudança de idioma
  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    setSelectedLanguage(lang);
    console.log(`Idioma alterado para: ${lang} (no Footer)`);
    // Aqui você pode adicionar lógica para realmente mudar o idioma da UI
    alert(`Funcionalidade de tradução para ${lang} ainda não implementada.`);
  };

  return (
     // w-full: Ocupa a largura da sidebar.
     // text-xs text-gray-600: Estilos de texto.
     // py-2: Padding vertical menor, já que está dentro da sidebar.
     // text-center: Mantém o texto centralizado (ou mude para text-left se preferir).
    <footer className="w-full text-xs text-gray-600 py-2 text-center"> {/* Estilos ajustados para sidebar */}
      {/* Seletor de Idioma */}
      {/* Seletor de Idioma */}
      <div id="language-selector" className="mb-2 flex justify-center items-center">
        <label htmlFor="footer-language" className="mr-2 text-gray-700">Idioma:</label> {/* ID único para o label/select */}
        <select
          id="footer-language"
          name="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="p-1 border border-gray-300 rounded text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-sofia-accent"
        >
          <option value="pt">Português (BR)</option>
          <option value="en">English (US)</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
          <option value="ja">日本語</option>
          <option value="zh">中文</option>
          <option value="ru">Русский</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      {/* Informações de Desenvolvedor e Versão */}
      <p className="mb-1">Desenvolvedores: Sofia Team | Versão 1.0.0</p>

      {/* Copyright */}
      <p className="m-0">&copy; {new Date().getFullYear()} Sofia | Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
// src/components/layout/Footer.tsx