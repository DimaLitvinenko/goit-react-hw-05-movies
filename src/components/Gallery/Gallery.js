import PropTypes from 'prop-types';
import GalleryItem from './GalleryItems';
import s from './Gallery.module.css';

export default function Gallery({ items }) {
   return (
      <ul className={s.gallery}>
         {items.map(item => (
            <GalleryItem key={item.id} item={item} />
         ))}
      </ul>
   );
}

Gallery.propTypes = {
   items: PropTypes.array,
};
