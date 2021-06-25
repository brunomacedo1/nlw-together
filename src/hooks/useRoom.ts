import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string;
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean;
  isHighLighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>;

export const useRoom = (roomId: string) => {
  const { user } = useAuth();
  const [questions , setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('');

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
          likeCount: Object.values(question.likes ?? {}).length,
          likeId: Object.entries(question.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      });
      setQuestions(parsedQuestion);
      setTitle(databaseRoom.title);
    });

    return () => {
      roomRef.off('value');
    }

  }, [roomId, user?.id]);

  return { questions, title};
}