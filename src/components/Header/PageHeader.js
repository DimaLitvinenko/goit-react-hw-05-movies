import Navigation from '../Navigation/Navigation';
import style from './PageHeader.module.css';
import MovieLogo from '../MovieLogo/MovieLogo';

export default function PageHeader() {
   return (
      <header className={style.header}>
         <Navigation />
         <MovieLogo />
      </header>
   );
}
