import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { database } from '../services/firebase';
import { toast } from 'react-toastify';
import { Logo } from '../components/Logo';

export const Home = () => {
  const [ roomCode, setRoomCode] = useState('');
  const history = useHistory();
  const {user , signInWithGoogle} = useAuth();

  const handleCreateRoom = async () => {
    if(!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  const handleEnterRoom = async (e: FormEvent) => {
    e.preventDefault();
    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if(!roomRef.exists()) {
      toast('Room does not exist.')
      return;
    }
    history.push(`/rooms/${roomCode}`)
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
          <Logo />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="" />
            Crie sua sala com o Google.
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleEnterRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => {setRoomCode(e.target.value)}}
              value={roomCode}
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