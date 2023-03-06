import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Rating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = Math.floor(5 - rating);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} color='#3b5998' />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key={stars.length} color='#3b5998' />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={fullStars + i + (hasHalfStar ? 1 : 0)} color='#3b5998' />
    );
  }

  return <>{stars}</>;
}

export default Rating;
