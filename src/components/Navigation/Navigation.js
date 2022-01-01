import React from 'react';
import { NavLink } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { BiMoviePlay } from 'react-icons/bi';
import style from './Navigation.module.css';

export default function Navigation() {
   return (
      <nav className={style.navigation}>
         <ul className={style.list}>
            <li className={style.item}>
               <NavLink to="/" className={style.link}>
                  home <ImHome />
               </NavLink>
            </li>
            <li className={style.item}>
               <NavLink to="/movies" className={style.link}>
                  movies <BiMoviePlay />
               </NavLink>
            </li>
         </ul>
      </nav>
   );
}
