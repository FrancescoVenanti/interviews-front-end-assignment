import { FaRegStar, FaStar } from "react-icons/fa6";

export const renderStars = (rating: number) => {
	const stars = [];
	const totalStars = 5;
	for (let i = 0; i < rating; i++) {
		stars.push(
			<span key={i} aria-label="star">
				<FaStar />
			</span>
		);
	}
	for (let i = rating; i < totalStars; i++) {
		stars.push(
			<span key={i} aria-label="star">
				<FaRegStar />
			</span>
		);
	}

	return stars;
};
