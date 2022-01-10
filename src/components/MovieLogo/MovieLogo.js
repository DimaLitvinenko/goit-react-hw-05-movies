import movieLogo from '../../images/logo_short.svg';
import style from './MovieLogo.module.css';

export default function MovieLogo() {
   return (
      <a href="https://www.themoviedb.org/" className={style.link}>
         <img className={style.logo} src={movieLogo} alt="themovie-data-base-logo" />
      </a>
   );
}
