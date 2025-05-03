// c:\Users\Felipe\sofia\Project-Sofia-Social-Networking\frontend\src\components\fragmentos\FormCadastroFragmento.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para links de Termos/Políticas
import zxcvbn from 'zxcvbn'; // <-- Importar zxcvbn
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebook,
  faXTwitter,
  faApple,
  faGithub,
  faLinkedin,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import SocialButton, { socialButtonBaseClasses } from '../ui/SocialButton'; // <-- Importar do novo local


export default function FormCadastroFragmento() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    semente: '', // Nome de usuário
    chave: '', // Senha
    proposito: '',
    termos: false,
    newsletter: false,
  });

  const [error, setError] = useState<string | null>(null); // Estado para erros
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [passwordScore, setPasswordScore] = useState<number>(0); // <-- Estado para força da senha

  // Função de validação
  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex para senha: min 6 chars, 1 maiúscula, 1 minúscula, 1 número, 1 símbolo
    const senhaRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

    if (!formData.nome.trim()) {
      return 'Por favor, insira o nome do Fragmento.';
    }
    if (!emailRegex.test(formData.email)) {
      return 'Por favor, insira um email válido.';
    }
    if (!formData.semente.trim()) {
        return 'Por favor, insira uma Semente (nome de usuário).';
    }
    // A validação da força da senha pode ser feita aqui também, se desejado,
    // por exemplo, exigindo um score mínimo.
    // if (passwordScore < 2) { // Exemplo: exigir score mínimo de 2 (Razoável)
    //   return 'A senha precisa ser pelo menos "Razoável".';
    // }
    if (!senhaRegex.test(formData.chave)) {
      return 'A Chave (senha) deve ter no mínimo 6 caracteres, incluindo maiúscula, minúscula, número e símbolo.';
    }
    if (!formData.termos) {
      return 'Você deve aceitar os Termos e Políticas para se conectar.';
    }
    return null; // Sem erros
  };

  // Handler para mudanças nos inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    // Tratamento específico para checkbox
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Calcula a força da senha em tempo real quando o campo 'chave' muda
    // Adiciona a verificação typeof value === 'string'
    if (name === 'chave' && typeof value === 'string') {
      // Calcula a pontuação (0 a 4), apenas se houver algum valor
      const score = value ? zxcvbn(value).score : 0;
      setPasswordScore(score);
    } else if (name === 'chave') { // Caso o input de senha não retorne string (improvável, mas seguro)
      setPasswordScore(0); // <-- Correção: Define como 0 diretamente
    }
  };

  // Handler para submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true); // Inicia o carregamento

    try {
      // Ajuste a URL da API conforme necessário
      const res = await fetch('http://localhost:3001/api/fragmentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Envia todos os dados do formulário
      });

      const data = await res.json();

      if (!res.ok) {
        // Usa a mensagem de erro do backend ou uma mensagem padrão
        throw new Error(data.message || `Erro ${res.status}: Falha ao conectar fragmento.`);
      }

      // Sucesso!
      alert(`Fragmento conectado com sucesso! Bem-vindo(a), ${data.nome || formData.nome}!`);
      // Aqui você pode redirecionar o usuário, por exemplo, para a página de login ou dashboard
      // Ex: navigate('/login');

    } catch (err: any) {
      console.error('Erro ao conectar fragmento:', err);
      setError(err.message || 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Handler placeholder para cadastro social
  const handleSocialSignup = (provider: string) => {
    console.log(`Tentando cadastro com: ${provider}`);
    alert(`Cadastro com ${provider} ainda não implementado.`);
  };

  return (
    // Formulário com espaçamento vertical e largura controlada
    <form onSubmit={handleSubmit} className="w-full px-4 sm:px-0 sm:w-4/5 lg:w-full mx-auto space-y-4">

      {/* Exibição de Erro */}
      {error && (
        <p className="text-red-500 text-sm text-left p-2 bg-red-50 border border-red-200 rounded-md">
          {error}
        </p>
      )}

      {/* Campo Nome */}
      <div>
        <label htmlFor="nome" className="sr-only">Nome do Fragmento</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Nome do Fragmento"
          value={formData.nome}
          onChange={handleChange}
          className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sofia-accent focus:border-transparent placeholder-gray-500"
          autoComplete="name"
          required
        />
      </div>

      {/* Campo Email */}
      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email válido"
          value={formData.email}
          onChange={handleChange}
          className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sofia-accent focus:border-transparent placeholder-gray-500"
          autoComplete="email"
          required
        />
      </div>

      {/* Campo Semente (Usuário) */}
      <div>
        <label htmlFor="semente" className="sr-only">Semente (usuário único)</label>
        <input
          type="text"
          id="semente"
          name="semente"
          placeholder="Semente (usuário único)"
          value={formData.semente}
          onChange={handleChange}
          className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sofia-accent focus:border-transparent placeholder-gray-500"
          autoComplete="username"
          required
        />
      </div>

      {/* Campo Chave (Senha) */}
      <div>
        <label htmlFor="chave" className="sr-only">Chave (senha segura)</label>
        <input
          type="password"
          id="chave"
          name="chave"
          placeholder="Chave (senha segura)"
          value={formData.chave}
          onChange={handleChange}
          className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sofia-accent focus:border-transparent placeholder-gray-500"
          autoComplete="new-password"
          required
        />
        {/* Feedback de Força da Senha */}
        {formData.chave && ( // Mostra apenas se algo foi digitado
          <div className="mt-1 text-xs">
            {/* Barra de Progresso Simples */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ease-in-out ${
                  passwordScore === 0 ? 'bg-red-500 w-[20%]' :
                  passwordScore === 1 ? 'bg-orange-500 w-[40%]' :
                  passwordScore === 2 ? 'bg-yellow-500 w-[60%]' :
                  passwordScore === 3 ? 'bg-blue-500 w-[80%]' :
                                        'bg-green-500 w-[100%]' // Score 4
                }`}
                style={{ width: `${(passwordScore + 1) * 20}%` }} // Atualiza a largura dinamicamente
              ></div>
            </div>
            {/* Mensagem de Texto */}
            <span className={`font-medium ${
              passwordScore === 0 ? 'text-red-600' :
              passwordScore === 1 ? 'text-orange-600' :
              passwordScore === 2 ? 'text-yellow-600' :
              passwordScore === 3 ? 'text-blue-600' :
                                    'text-green-600' // Score 4
            }`}>Força: {['Muito Fraca', 'Fraca', 'Razoável', 'Forte', 'Muito Forte'][passwordScore]}</span>
          </div>
        )}
      </div>

      {/* Campo Propósito */}
      <div>
        <label htmlFor="proposito" className="sr-only">Qual é o seu Propósito?</label>
        <textarea
          id="proposito"
          name="proposito"
          placeholder="Qual é o seu Propósito? (Opcional)"
          value={formData.proposito}
          onChange={handleChange}
          className="form-textarea w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sofia-accent focus:border-transparent placeholder-gray-500 h-24 resize-none"
        />
      </div>

      {/* Checkbox Termos */}
      <div className="flex items-start space-x-2 text-left">
        <input
          type="checkbox"
          id="termos"
          name="termos"
          checked={formData.termos}
          onChange={handleChange}
          className="form-checkbox h-4 w-4 text-sofia-accent border-gray-300 rounded focus:ring-sofia-accent mt-1 cursor-pointer"
          required
        />
        <label htmlFor="termos" className="text-sm text-gray-600 cursor-pointer">
          Li e aceito os{' '}
          <Link to="/termos" className="text-sofia-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Termos de Uso
          </Link>{' '}
          e as{' '}
          <Link to="/politicas" className="text-sofia-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Políticas da Comunidade
          </Link>.
        </label>
      </div>

      {/* Checkbox Newsletter */}
      <div className="flex items-center space-x-2 text-left">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
          className="form-checkbox h-4 w-4 text-sofia-accent border-gray-300 rounded focus:ring-sofia-accent cursor-pointer"
        />
        <label htmlFor="newsletter" className="text-sm text-gray-600 cursor-pointer">
          Desejo receber sementes e novidades por email.
        </label>
      </div>

      {/* Divisor ou Login Social */}
      <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 text-center font-semibold text-gray-500 text-sm">OU</p>
      </div>
      <div className="social-login w-full px-4 sm:px-0">
        <p className="text-sm text-gray-600 mb-3 text-center">Conecte-se rapidamente com:</p>
        <div className="social-buttons flex flex-wrap justify-center gap-3">
          {/* Botões Sociais usando o componente SocialButton */}
          <SocialButton
            icon={<FontAwesomeIcon icon={faGoogle} />}
            label="Cadastrar com Google"
            onClick={() => handleSocialSignup('Google')} // Passa a função de clique
            className="bg-red-600 hover:bg-red-700 text-white" // Passa apenas classes adicionais
          />
          <SocialButton
            icon={<FontAwesomeIcon icon={faFacebook} />}
            label="Cadastrar com Facebook"
            onClick={() => handleSocialSignup('Facebook')}
            className="bg-blue-700 hover:bg-blue-800 text-white"
          />
          <SocialButton
            icon={<FontAwesomeIcon icon={faXTwitter} />}
            label="Cadastrar com X/Twitter"
            onClick={() => handleSocialSignup('XTwitter')}
            className="bg-black hover:bg-gray-800 text-white"
          />
          <SocialButton
            icon={<FontAwesomeIcon icon={faApple} />}
            label="Cadastrar com Apple"
            onClick={() => handleSocialSignup('Apple')}
            className="bg-black hover:bg-gray-800 text-white"
          />
          <SocialButton
            icon={<FontAwesomeIcon icon={faGithub} />}
            label="Cadastrar com Github"
            onClick={() => handleSocialSignup('Github')}
            className="bg-gray-800 hover:bg-gray-900 text-white"
          />
          <SocialButton
            icon={<FontAwesomeIcon icon={faLinkedin} />}
            label="Cadastrar com LinkedIn"
            onClick={() => handleSocialSignup('LinkedIn')}
            className="text-white" // Classe adicional (embora a cor venha do style)
            style={{ backgroundColor: '#0A66C2' }}
          />
          <SocialButton
            icon={<FontAwesomeIcon icon={faWhatsapp} />}
            label="Cadastrar com WhatsApp"
            onClick={() => handleSocialSignup('WhatsApp')}
            className="text-white" // Classe adicional
            style={{ backgroundColor: '#25D366' }}
          />
        </div>
      </div>

      {/* Placeholder para Captcha */}
      <div className="text-center text-xs text-gray-400 italic pt-2">
        {/* Integração com reCAPTCHA ou similar pode ser adicionada aqui */}
        Protegido por medidas anti-bot.
      </div>

      {/* Botão de Submissão */}
      <button
        type="submit"
        className="w-full bg-sofia-accent hover:bg-sofia-accent-dark text-white font-medium py-2.5 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofia-accent disabled:opacity-50 mt-6" // Adicionado mt-6 para mais espaço
        disabled={isLoading} // Desabilita durante o carregamento
      >
        {isLoading ? 'Conectando...' : 'CONECTAR FRAGMENTO'}
      </button>
    </form>
  );
}
