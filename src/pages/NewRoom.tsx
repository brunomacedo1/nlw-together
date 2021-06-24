import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import {FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { Button } from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg';
import '../styles/auth.scss'
import { Logo } from '../components/Logo';

export const NewRoom = () => {
  const history =  useHistory();
  const { user } = useAuth();
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();

    if(roomName.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: roomName,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Crie uma nova sala</h2>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da Sala"
              onChange={(e) => setRoomName(e.target.value)}
              value={roomName}
            />
            <Button type="submit">
              Criar Sala
            </Button>
          </form>
          <p>Quer entrar em uma sala já existente? <Link to="/">Clique Aqui</Link></p>
        </div>
      </main>
    </div>
  );
}