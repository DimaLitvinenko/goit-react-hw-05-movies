import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
import style from './Cast.module.css';
import { toast } from 'react-toastify';
import * as api from '../../services/themovieDB-api';
import Loader from 'react-loader-spinner';
import profileImg from '../../images/profile.jpg';

export default function Cast({ movieId }) {
   const [cast, setCast] = useState([]);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState('idle');

   useEffect(() => {
      setStatus('pending');
      getMovieCast();
   }, []);

   async function getMovieCast() {
      try {
         const response = await api.fetchCast(movieId);
         if (response.ok) {
            const data = await response.json();
            setCast(data.cast);
            setStatus('resolved');
         } else {
            return Promise.reject(new Error(`The movie ${movieId} - not detected!`));
         }
      } catch {
         setError(error);
         setStatus('rejected');
         toast.error(error.message);
      }
   }

   return (
      <section>
         {status === 'pending' && (
            <Loader type="Triangle" color="red" secondaryColor="blue" height={80} width={80} />
         )}

         {status === 'rejected' && <h3>{error.message}</h3>}

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
      </section>
   );
}
