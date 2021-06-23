import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'

export const Home = () => {
  const history = useHistory();
  const {user , signInWithGoogle} = useAuth();

  const handleCreateRoom = () => {
    if(!user) {
      signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas"/>
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask"/>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="" />
            Crie sua sala com o Google.
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}