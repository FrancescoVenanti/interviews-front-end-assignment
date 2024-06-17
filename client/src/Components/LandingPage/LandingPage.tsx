import { motion } from "framer-motion";
import "./LandingPage.scss";
import LandingImage from "../../assets/Images/RecipeBookLandin.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
	const imageVariants = {
		initial: { scale: 0.9, opacity: 0 },
		animate: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
	};

	const textVariants = {
		initial: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
	};

	return (
		<div className="fullScreen d-lg-flex">
			<motion.img
				src={LandingImage}
				alt="landing"
				className="landingImage rounded-5"
				variants={imageVariants}
				initial="initial"
				animate="animate"
			/>
			<motion.div className="overlayText" variants={textVariants} initial="initial" animate="animate">
				<p className="display-1">RecipeBook</p>
				<p className="display-5">Discover Recipes</p>
				<Link to="/home">
					<button className="bigRedButton">Explore</button>
				</Link>
			</motion.div>
		</div>
	);
};

export default LandingPage;
