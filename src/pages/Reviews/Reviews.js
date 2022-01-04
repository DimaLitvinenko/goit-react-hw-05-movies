import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import style from './Reviews.module.css';
import * as api from '../../services/themovieDB-api';
import Loader from 'react-loader-spinner';

export default function Reviews({ movieId }) {
   const [review, setReviews] = useState([]);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState('idle');
   const unmountedRef = useRef();

   useEffect(() => {
      if (!unmountedRef.current) {
         setStatus('pending');
         getMovieReviews();
      }
      async function getMovieReviews() {
         try {
            const response = await api.fetchReviews(movieId);
            if (response.ok && !unmountedRef.current) {
               const data = await response.json();
               setReviews(data.results);
               setStatus('resolved');
            } else {
               Promise.reject(new Error(`The reviews not detected!`));
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
         {status === 'pending' && (
            <Loader type="ThreeDots" color="blue" height={80} width={80} />
         )}

         {status === 'rejected' && <h2>{error.message}</h2>}

         {status === 'resolved' && (
            <ul>
               {review.map(({ id, author, content }) => (
                  <li key={id} className={style.item}>
                     <p className={style.autorNick}>author: {author}</p>

                     <p className={style.autorComent}>{content}</p>
                  </li>
               ))}
            </ul>
         )}
         {review.length === 0 && <h3>We don't have any reviews for this movie!</h3>}
      </section>
   );
}
