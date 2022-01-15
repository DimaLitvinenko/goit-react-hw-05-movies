import { useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';
import { IoArrowUpSharp } from 'react-icons/io5';
import style from './BtnToTop.module.css';

const ButtonToTop = () => {
   const [status, setStatus] = useState('hide');

   useEffect(() => {
      window.addEventListener(
         'scroll',
         throttle(500, event => scrollWatch()),
      );
   });

   const scrollWatch = () => {
      let scroll_position = window.scrollY;
      scroll_position > 140 ? setStatus('visible') : setStatus('hide');
   };

   const toTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   return (
      <>
         {status === 'visible' && (
            <button type="button" className={style.btnToTop} onClick={toTop}>
               <IoArrowUpSharp />
            </button>
         )}
         <></>
      </>
   );
};

export default ButtonToTop;
