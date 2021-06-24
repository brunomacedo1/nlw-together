import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
export const Logo = () => {
  return(
    <Link to="/">
      <img src={logoImg} alt="Letmeask" />
    </Link>
  )
}