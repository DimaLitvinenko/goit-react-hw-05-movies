import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as api from '../../services/themovieDB-api';
import Loader from 'react-loader-spinner';

export default function Reviews({ movieId }) {
   const [review, setReviews] = useState([]);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState('idle');

   useEffect(() => {
      setStatus('pending');
      getMovieReviews();
   }, []);

   async function getMovieReviews() {
      try {
         const response = await api.fetchReviews(movieId);
         if (response.ok) {
            const data = await response.json();
            setReviews(data.results);
            setStatus('resolved');
         } else {
            return Promise.reject(new Error(`The reviews ${review} - not detected!`));
         }
      } catch (error) {
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
            <ul>
               {review.map(({ id, author, content }) => (
                  <li key={id}>
                     <p>author: {author}</p>

                     <p>{content}</p>
                  </li>
               ))}
            </ul>
         )}
      </section>
   );
}
