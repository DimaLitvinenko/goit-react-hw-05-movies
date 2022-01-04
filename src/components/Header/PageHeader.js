import React from 'react';
import Navigation from '../Navigation/Navigation';
import style from './PageHeader.module.css';
import movieLogo from '../../images/logo_short.svg';
export default function PageHeader() {
   return (
      <header className={style.header}>
         <Navigation />
         <a href="https://www.themoviedb.org/" className={style.link}>
            <img className={style.logo} src={movieLogo} alt="themovie-data-base-logo" />
         </a>
      </header>
   );
}
