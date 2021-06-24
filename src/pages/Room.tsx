import { Button } from "../components/Button"
import likeImg from '../assets/images/like.svg'
import '../styles/room.scss';
import { RoomCode } from "../components/RoomCode";
import { useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { database } from "../services/firebase";
import { Logo } from "../components/Logo";
import { useEffect } from "react";

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean;
  isHighLighted: boolean;
}>

type Question = {
  id: string;
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean;
  isHighLighted: boolean;
}

type RoomParams = {
  id: string;
}

export const Room = () => {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions , setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('');
  const params = useParams<RoomParams>();
  const roomId = params.id;

  useEffect( () => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestion: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestion = Object.entries(firebaseQuestion).map(([key, question]) => {
        return {
          id: key,
          content: question.content,
          author: question.author,
          isHighLighted: question.isHighLighted,
          isAnswered: question.isAnswered,
        }
      });
      setQuestions(parsedQuestion);
      setTitle(databaseRoom.title);
    });
  }, [roomId])

  const handleSendQuestion = async (e: FormEvent) => {
    e.preventDefault();
    if(newQuestion.trim() === '') {
      return;
    }
    if(!user){
      toast('Sign in to send question.');
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighLighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('')
  }

  const renderQuestion = () => {
    return questions.map(question =>{
      return (
        <div key={question.id} className="room-questions">
          <p>{question.content}</p>
          <div className="question-info">
            <img src={question.author.avatar} alt={question.author.name} />
            <span>{question.author.name}</span>
          </div>
          <img src={likeImg} alt="Like"/>
        </div>
      );
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Logo />
          <RoomCode code={params.id}/>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="What do you want to ask?"
            onChange={e => setNewQuestion(e.target.value)}
            value={newQuestion} 
          />
          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>To submit a question, <button>Sign in.</button></span>
            )}
            <Button type="submit" disabled={!user}>Send Question</Button>
          </div>
        </form>
        {renderQuestion()}
      </main>
    </div>
  )
}