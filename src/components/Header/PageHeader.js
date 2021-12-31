import Navigation from '../Navigation/Navigation';
import style from './PageHeader.module.css';

export default function PageHeader() {
   return (
      <header className={style.header}>
         <Navigation />
      </header>
   );
}
