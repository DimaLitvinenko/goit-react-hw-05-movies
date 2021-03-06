import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {
   Routes,
   Route,
   Link,
   useNavigate,
   useParams,
   useLocation,
} from 'react-router-dom';
import style from './MovieDetailsPage.module.css';
import { toast } from 'react-toastify';
import Spinner from '../../components/Loader/Loader';
import { TiInfoLargeOutline } from 'react-icons/ti';
import { AiTwotoneHome } from 'react-icons/ai';
import { BsCast } from 'react-icons/bs';
import { MdPreview } from 'react-icons/md';

import * as api from '../../services/themovieDB-api';

const Cast = lazy(() => import('../Cast/Cast.js'));
const Reviews = lazy(() => import('../Reviews/Reviews.js'));

export default function MovieDetailPage() {
   const navigate = useNavigate();
   const location = useLocation();
   const { slug } = useParams();
   const movieId = slug.match(/[0-9]+$/)[0];
   const [movie, setMovie] = useState([]);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState('idle');
   const unmountedRef = useRef();

   useEffect(() => {
      if (!unmountedRef.current) {
         setStatus('pending');
         getMovieDetail();
      }
      async function getMovieDetail() {
         try {
            const response = await api.fetchDetails(movieId);
            if (response.ok) {
               const data = await response.json();
               setMovie(data);
               setStatus('resolved');
            } else {
               return Promise.reject(new Error(`The Movie not detected!`));
            }
         } catch (error) {
            setError(error);
            setStatus('rejected');
            toast.error(error.message, {
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
         unmountedRef.current = true;
      };
   }, [movieId]);

   const { poster_path, tagline, title, release_date, vote_average, overview, genres } =
      movie;

   return (
      <>
         {status === 'pending' && <Spinner />}

         {status === 'rejected' && <h2>{error.message}</h2>}

         {status === 'resolved' && (
            <section className={style.section}>
               <button
                  type="button"
                  className={style.button}
                  onClick={() => {
                     navigate(location?.state?.from?.location ?? '/');
                  }}
               >
                  {location?.state?.from?.label ?? <AiTwotoneHome />}
               </button>

               <div className={style.mainWrapper}>
                  <img
                     className={style.image}
                     src={poster_path && `https://image.tmdb.org/t/p/w342/${poster_path}`}
                     alt={tagline}
                  />

                  <div className={style.descWrapper}>
                     <h2>
                        {title} ({new Date(release_date).getFullYear()})
                     </h2>
                     <p>User Score: {vote_average * 10}%</p>

                     <h3>Overview</h3>
                     <p>{overview}</p>

                     <h3>Genres</h3>
                     <ul className={style.genresList}>
                        {genres.map(({ id, name }) => (
                           <li className={style.genreItem} key={id}>
                              {name}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               <div className={style.infoWrapper}>
                  <h2 className={style.infoTitle}>
                     Additional <TiInfoLargeOutline /> information
                  </h2>
                  <ul className={style.infoList}>
                     <li className={style.infoItem}>
                        <Link
                           to={`./cast`}
                           className={style.infoLink}
                           state={{ from: location?.state?.from }}
                        >
                           Cast
                           <i className={style.icon}>
                              <BsCast />
                           </i>
                        </Link>
                     </li>
                     <li className={style.infoItem}>
                        <Link
                           to={`./reviews`}
                           className={style.infoLink}
                           state={{ from: location?.state?.from }}
                        >
                           Reviews
                           <i className={style.icon}>
                              <MdPreview />
                           </i>
                        </Link>
                     </li>
                  </ul>
               </div>
            </section>
         )}

         <Suspense fallback={<Spinner />}>
            <Routes>
               <Route path="cast" element={<Cast movieId={movieId} />} />
               <Route path="reviews" element={<Reviews movieId={movieId} />} />
            </Routes>
         </Suspense>
      </>
   );
}
