import { ReactNode } from 'react';
import './styles.scss'
import cx from 'classnames';

type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string
  },
  children?: ReactNode,
  isHighLighted?: boolean,
  isAnswered?: boolean,
}

export const Question = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighLighted = false,
}: QuestionProps) => {
  return (
    <div 
    className={ cx ('questions', {isAnswered}, {isHighLighted: isHighLighted && !isAnswered})}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}

