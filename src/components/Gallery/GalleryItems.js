import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import s from './Gallery.module.css';

export default function GalleryItem({ item }) {
   const base_img_url = 'https://image.tmdb.org/t/p/w342/';
   const location = useLocation();
   return (
      <Link
         to={{
            pathname: `/movies/${item.media_type}/${item.id}`,
            state: { from: location },
         }}
      >
         <li className={s.gallery_item}>
            {/* <p>Raiting:{item.title} , {item.vote_average}/10</p> */}
            <img
               className={s.galleryItemImg}
               src={`${base_img_url}${item.poster_path}`}
               alt={item.title}
            />
         </li>
      </Link>
   );
}
