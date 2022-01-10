import React, { useState, useEffect, useRef } from 'react';
import style from './Cast.module.css';
import { toast } from 'react-toastify';
import * as api from '../../services/themovieDB-api';
import profileImg from '../../images/profile.jpg';
import Spinner from '../../components/Loader/Loader';

export default function Cast({ movieId }) {
   const [cast, setCast] = useState([]);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState('idle');
   const unmountedRef = useRef();

   useEffect(() => {
      if (!unmountedRef.current) {
         setStatus('pending');
         getMovieCast();
      }
      async function getMovieCast() {
         try {
            const response = await api.fetchCast(movieId);
            if (response.ok && !unmountedRef.current) {
               const data = await response.json();
               setCast(data.cast);
               setStatus('resolved');
            } else {
               return Promise.reject(new Error(`The movie ${movieId} - not detected!`));
            }
         } catch (error) {
            setError(error);
            setStatus('rejected');
            toast.error(`${error.message}`, {
               position: 'top-left',
               autoClose: 4000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         }
      }
      return () => {
         unmountedRef.current = !unmountedRef.current;
      };
   }, [movieId]);

   return (
      <section>
         {status === 'pending' && <Spinner />}

         {status === 'rejected' && <h2>{error.message}</h2>}

         {status === 'resolved' && (
            <ul className={style.list}>
               {cast.map(({ id, profile_path, name, character }) => (
                  <li key={id} className={style.item}>
                     <img
                        className={style.profileImg}
                        src={
                           profile_path
                              ? `https://image.tmdb.org/t/p/w185/${profile_path}`
                              : profileImg
                        }
                        alt={name}
                     />
                     <p>{name}</p>
                     <p className={style.character}>character: {character}</p>
                  </li>
               ))}
            </ul>
         )}
         {cast.length === 0 && <h3>We don't have acrtors for this movie!</h3>}
      </section>
   );
}
