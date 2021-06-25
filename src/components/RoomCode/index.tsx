import copyImg from '../../assets/images/copy.svg';
import './styles.scss'

type RoomCodeProps = {
  code: string;
}

export const RoomCode = (props: RoomCodeProps) => {

  const copyRoomCodeToClipBoard = () => {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button onClick={copyRoomCodeToClipBoard} className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>{props.code}</span>
    </button>
  )
}