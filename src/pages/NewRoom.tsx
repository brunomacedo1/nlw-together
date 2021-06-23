import { useAuth } from '../hooks/useAuth';
import {Link} from 'react-router-dom'
import { Button } from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss'

export const NewRoom = () => {
  // const { user } = useAuth()

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
          <h2>Crie uma nova sala</h2>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Nome da Sala"
            />
            <Button type="submit">
              Criar Sala
            </Button>
          </form>
          <p>Quer entrar em uma sala já existente?<Link to="/">Clique Aqui</Link></p>
        </div>
      </main>
    </div>
  );
}