import { Link } from "react-router-dom";
import NavBar from "../NavBar/NarBar";
import Footer from "../Footer/Footer";
import capibara from "../../assets/Images/capibara.jpeg";

const NotFound = () => {
	return (
		<div className="container-lg">
			<NavBar />
			<div className="text-center my-4">
				<h2 className="display-4">404 - Not Found</h2>
				<p className="lead fs-3">
					The page you're looking for isn't available. Here is a capibara to compensate for the inconvenience.
				</p>
				<img src={capibara} alt="Recipe not found" className="my-4 img-fluid rounded-3 shadow" />
				<div>
					<Link to="/home">
						<button className="bigWhiteButton">Go Home</button>
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default NotFound;
