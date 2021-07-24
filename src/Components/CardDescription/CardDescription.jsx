import { useHistory, useLocation } from 'react-router-dom';
//Components
import defaultImg from 'defaultImg/default-img.jpg';
import { BiArrowBack } from 'react-icons/bi';
//Styles
import css from './CardDescription.module.css';
//Utils
import PropTypes from 'prop-types';

export const CardDescription = ({ movie, genres }) => {
  const history = useHistory();
  const location = useLocation();

  function goBack() {
    if (location.state.from.pathname.includes('/Movie')) {
      const search = location.search;
      history.push(`/Movies${search}`);
      return;
    }
    history.goBack();
  }
  return (
    <div className={css.container}>
      <button type="button" onClick={goBack} className={css.backBtn}>
        <BiArrowBack style={{ marginRight: '10px' }} size="18px" />
        Back
      </button>
      <div className={css.movieWrapper}>
        <img
          className={css.movieImage}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
        />
        <div className={css.contentWrapper}>
          <h2 className={css.primaryHeader}>{movie.title}</h2>
          <h3 className={css.secondryHeader}>Overview</h3>
          <p className={css.movieText}>{movie.overview}</p>
          <h3 className={css.secondryHeader}>Genres</h3>
          <p className={css.movieText}>{genres.join(' ')}</p>
          <h3 className={css.secondryHeader}>Rating</h3>
          <p className={css.movieText}>
            {(movie.vote_average / 10) * 100 + '%'}
          </p>
        </div>
      </div>
    </div>
  );
};

CardDescription.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.isRequired,
  }).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
};
