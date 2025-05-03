// c:\Users\Felipe\sofia\Project-Sofia-Social-Networking\frontend\src\pages\LoginPage.tsx
import { useState, ChangeEvent, FormEvent, ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importar Link para navegação interna
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faGoogle,
  faFacebook,
  faXTwitter,
  faApple,
  faGithub,
  faLinkedin,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'; // Certifique-se que esta importação está correta
import SocialButton from '../components/ui/SocialButton';
import logoSrc from '../assets/logo.png';


function LoginPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('pt');
  const [loginValue, setLoginValue] = useState(''); // Estado para o campo login/email
  const [password, setPassword] = useState(''); // Estado para a senha
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro
  const navigate = useNavigate(); // Hook para navegação programática

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    setSelectedLanguage(lang);
    console.log(`Idioma alterado para: ${lang}`);
    // Aqui você poderia integrar com uma biblioteca de internacionalização (i18n)
    alert(`Funcionalidade de tradução para ${lang} ainda não implementada.`);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true); // Inicia o carregamento
    setError(null); // Limpa erros anteriores
    console.log('Tentando conectar com:', { email: loginValue });

    try {
      // Certifique-se que a URL está correta (http ou https, porta, etc.)
      const response = await fetch('http://localhost:3001/api/auth/conectar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginValue, // Envia o valor do estado 'loginValue' como 'email'
          password: password, // Envia o valor do estado 'password'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se a resposta não for OK (ex: 400, 401, 409, 500)
        // Usa a mensagem do backend ou uma mensagem padrão
        let errorMessage = data.message || `Erro ${response.status}: Falha na conexão.`;
        if (response.status === 401) {
          errorMessage = 'Credenciais inválidas. Verifique seu login e senha.';
        } else if (response.status >= 500) {
          errorMessage = 'Ocorreu um erro no servidor. Tente novamente mais tarde.';
        } else if (!data.message) { // Se não houver mensagem específica do backend
          errorMessage = 'Falha ao conectar. Verifique sua conexão ou tente novamente.';
        }
        throw new Error(errorMessage);
      }

      // Sucesso!
      console.log('Login bem-sucedido:', data);

      // Armazenar o token de forma segura (localStorage é comum, mas considere alternativas como cookies HttpOnly)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      } else {
        // Se o token não veio na resposta por algum motivo
        throw new Error('Token não recebido do servidor.');
      }

      // Redirecionar para a página principal ou dashboard após login
      // Certifique-se que a rota '/fragmento' existe e é o destino correto.
      // Pode ser '/feed', '/home' ou outra rota protegida.
      navigate('/fragmento'); // Ajuste se necessário

    } catch (err: any) {
      console.error('Erro no login:', err);
      // Define a mensagem de erro para ser exibida ao usuário
      setError(err.message || 'Falha ao tentar conectar. Verifique suas credenciais ou tente novamente mais tarde.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento, independentemente do resultado
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Tentando login com: ${provider}`);
    // Aqui você implementaria a lógica de login social (ex: usando Firebase Auth, Auth0, ou chamadas específicas)
    alert(`Login com ${provider} ainda não implementado.`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Seção Esquerda (Header) */}
        <header className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-4 bg-sofia-green-light text-sofia-green-dark">
          <img src={logoSrc} alt="Logo Sofia" className="max-w-[180px] h-auto mb-3" />
          <h1 className="text-3xl font-bold mb-2">Bem-vindo à Sofia</h1>
          <p className="mb-1">
            A nova rede social para quem deseja crescer, aprender e expandir a consciência.
          </p>
          <p>Conecte-se e transforme sua jornada!</p>
        </header>

        {/* Seção Direita (Formulário) */}
        <main className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-4 bg-white">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleFormSubmit} className="w-full px-4 sm:px-0 sm:w-4/5 lg:w-3/4 mx-auto">
              {/* Campo de Login/Email */}
              <div className="mb-3">
                <label htmlFor="login" className="sr-only">Login ou Email</label>
                <input
                  type="text" // Pode ser 'email' se for sempre email
                  id="login"
                  name="login"
                  className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sofia-accent focus:border-transparent placeholder-gray-500"
                  placeholder="Login ou Email"
                  required
                  value={loginValue} // Vincula ao estado
                  onChange={(e) => setLoginValue(e.target.value)} // Atualiza o estado
                  autoComplete="username" // Ajuda navegadores a preencher
                />
              </div>
              {/* Campo de Senha */}
              <div className="mb-3">
                <label htmlFor="senha" className="sr-only">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="password"
                  className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sofia-accent focus:border-transparent placeholder-gray-500"
                  placeholder="Senha"
                  required
                  value={password} // Vincula ao estado
                  onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
                  autoComplete="current-password" // Ajuda navegadores a preencher
                />
              </div>
              {/* Exibição de Erro e Link Esqueci Senha */}
              <div className="mb-3 text-right">
                {/* Exibe a mensagem de erro se houver */}
                {error && (
                  <p className="text-red-500 text-sm text-left mb-2">{error}</p>
                )}
                {/* Usar Link para rotas internas */}
                <Link to="/resetar-senha" className="text-sm text-sofia-accent hover:underline">
                  Esqueci minha senha
                </Link>
              </div>
              {/* Botão Conectar */}
              <button
                type="submit"
                className="w-full bg-sofia-accent hover:bg-sofia-accent-dark text-white font-medium py-2.5 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofia-accent disabled:opacity-50"
                disabled={isLoading} // Desabilita durante o carregamento
              >
                {/* Muda o texto do botão durante o carregamento */}
                {isLoading ? 'Conectando...' : 'CONECTAR'}
              </button>
              {/* Link para Criar Conta */}
              <div className="mt-4">
                {/* Usar Link para rotas internas */}
                <Link to="/fragmento" className="text-sm text-sofia-accent hover:underline font-semibold">
                  Sou novo por aqui, quero me <strong className="font-bold"><u className="underline">CONECTAR</u></strong>!
                </Link>
              </div>
            </form>

            {/* Divisor ou Login Social */}
            <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center font-semibold text-gray-500 text-sm">OU</p>
            </div>

            {/* Seção de Login Social */}
            <div className="social-login w-full px-4 sm:px-0">
              <p className="text-sm text-gray-600 mb-3 text-center">Entre com:</p>
              <div className="social-buttons flex flex-wrap justify-center gap-3">
                {/* Botões Sociais */}
                <SocialButton
                  icon={<FontAwesomeIcon icon={faEnvelope} />}
                  label="Login com Email"
                  onClick={() => handleSocialLogin('Email')}
                  className="bg-gray-500 hover:bg-gray-600 text-white"
                />
                <SocialButton
                  icon={<FontAwesomeIcon icon={faGoogle} />}
                  label="Login with Google"
                  onClick={() => handleSocialLogin('Google')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                />
                <SocialButton
                  icon={<FontAwesomeIcon icon={faFacebook} />}
                  label="Login with Facebook"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="bg-blue-700 hover:bg-blue-800 text-white"
                />
                <SocialButton
                  icon={<FontAwesomeIcon icon={faXTwitter} />}
                  label="Login with X/Twitter"
                  onClick={() => handleSocialLogin('XTwitter')}
                  className="bg-black hover:bg-gray-800 text-white"
                />
                <SocialButton
                  icon={<FontAwesomeIcon icon={faApple} />}
                  label="Login with Apple"
                  onClick={() => handleSocialLogin('Apple')}
                  className="bg-black hover:bg-gray-800 text-white"
                />
                <SocialButton
                  icon={<FontAwesomeIcon icon={faGithub} />}
                  label="Login with Github"
                  onClick={() => handleSocialLogin('Github')}
                  className="bg-gray-800 hover:bg-gray-900 text-white"
                />
                <SocialButton
                  icon={<FontAwesomeIcon icon={faLinkedin} />}
                  label="Login with LinkedIn"
                  onClick={() => handleSocialLogin('LinkedIn')}
                  className="text-white"
                  style={{ backgroundColor: '#0A66C2' }}
                />
                <SocialButton
                  icon={<FontAwesomeIcon icon={faWhatsapp} />}
                  label="Login with WhatsApp"
                  onClick={() => handleSocialLogin('WhatsApp')}
                  className="text-white"
                  style={{ backgroundColor: '#25D366' }}
                />
              </div>
            </div>

            {/* Seção de Termos e Políticas */}
            <div className="mt-8 text-center text-xs text-gray-500">
              <p>
                Ao entrar, você concorda com nossos <br />
                {/* Usar Link para rotas internas */}
                <Link to="/termos" className="text-sofia-accent hover:underline">Termos de Serviço</Link> e{' '}
                <Link to="/politicas" className="text-sofia-accent hover:underline">Política de Privacidade</Link>
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 bg-gray-100 text-xs text-gray-600 mt-auto">
        <div id="language-selector" className="mb-2 flex justify-center items-center">
          <label htmlFor="language" className="mr-2 text-gray-700">Idioma:</label>
          <select
            id="language"
            name="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="p-1 border border-gray-300 rounded text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-sofia-accent"
          >
            {/* Opções de Idioma */}
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
        <p className="mb-1">Desenvolvedores: Sofia Team | Versão 1.0.0</p>
        <p className="m-0">&copy; {new Date().getFullYear()} Sofia | Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default LoginPage;
