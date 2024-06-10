import { Col, Row } from "react-bootstrap";
import LandingImage from "../../assets/Images/RecipeBookLandin.png";

/* TODO add custom button component, Images, Text */

const LadingPage = () => {
	return (
		<div className="fullScreen">
			<Row className="p-5 h-100 w-100 g-4">
				<Col xs={12} lg={6}>
					<img src={LandingImage} alt="landing" className="w-100 h-100 rounded-5" />
				</Col>
				<Col xs={12} lg={6} className=" text-center p-2 rounded-5">
					<div className="d-flex flex-column justify-content-center align-items-center h-100">
						<p className="display-1">RecipeBook</p>
						<p className="display-5">Discover Recipes</p>

						<button className="btn btn-danger rounded-pill mt-5 py-2 px-5 fs-5">Explore</button>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default LadingPage;