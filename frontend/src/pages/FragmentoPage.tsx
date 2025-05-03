// src/pages/FragmentoPage.tsx
import Footer from '../components/layout/Footer'; // Importa apenas o Footer
import FormCadastroFragmento from '../components/fragmentos/FormCadastroFragmento';

export default function FragmentoPage(): JSX.Element {
  return (
    // Estrutura flexível para manter o footer na parte inferior
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Conteúdo principal que ocupa o espaço disponível */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-6">
        {/* Seção que contém o formulário, centralizada e com estilo */}
        <section className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-8">
          {/* Título da página */}
          <h1 className="text-2xl font-bold text-center text-sofia-green-dark mb-6">
            Quero me Conectar a Sofia como um Novo Fragmento
          </h1>
          {/* Componente do formulário de cadastro */}
          <FormCadastroFragmento />
        </section>
      </main>
      {/* Footer renderizado diretamente no final da página */}
      <Footer />
    </div>
  );
};
