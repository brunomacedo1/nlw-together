import { Button } from "../../components/Button"
import { RoomCode } from "../../components/RoomCode";
import { useHistory, useParams } from "react-router-dom";
import deleteImg from '../../assets/images/delete.svg';
// import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";
// import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Logo } from "../../components/Logo";
import { Question } from '../../components/Question';
import { useRoom } from "../../hooks/useRoom";
import './styles.scss'

type RoomParams = {
  id: string;
}

export const AdminRoom = () => {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title} = useRoom(roomId);
  const history = useHistory();

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      toast('Question deleted with success.')
    }
  }

  const renderQuestions = () => {
    return questions.map(question =>{
      return (
        <Question key={question.id} content={question.content} author={question.author}>
          <button 
            onClick={() => handleDeleteQuestion(question.id)} 
            type="button" 
            className="delete"
          >
            <img src={deleteImg} alt="Delete question" />
          </button>
        </Question>
      );
    });
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <Logo />
          <div>
            <RoomCode code={params.id}/>
            <Button onClick={handleEndRoom} isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
       
        <div className="question-list">
          {renderQuestions()}
        </div>
      </main>
    </div>
  );
}