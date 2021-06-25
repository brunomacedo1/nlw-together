import { useHistory, useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import { toast } from "react-toastify";
import { database } from "../../services/firebase";

import { Button } from "../../components/Button"
import { RoomCode } from "../../components/RoomCode";
import { Logo } from "../../components/Logo";
import { Question } from '../../components/Question';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';
// import { FormEvent, useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
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
      toast('Question deleted with success.');
    }
  }

  const handleCheckQuestionAsAnswered = async  (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true
    });
  }


  const renderQuestions = () => {
    return questions.map(question =>{
      return (
        <Question 
          key={question.id} 
          content={question.content} 
          author={question.author}
          isAnswered={question.isAnswered}
          isHighLighted={question.isHighLighted}
        >
          {!question.isAnswered && (
            <>
              <button 
                onClick={() => handleCheckQuestionAsAnswered(question.id)} 
                type="button" 
              >
                <img src={checkImg} alt="Check question" />
              </button>
              <button 
                onClick={() => handleHighlightQuestion(question.id)} 
                type="button" 
              >
                <img src={answerImg} alt="Highlight question" />
              </button>
            </>
          )}
          <button 
            onClick={() => handleDeleteQuestion(question.id)} 
            type="button" 
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