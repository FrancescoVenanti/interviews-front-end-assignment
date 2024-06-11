//top navbbar component

import { FaClock, FaUser, FaUtensils } from "react-icons/fa6";

//TODO add user icon + implement functionalities

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
			<div className="container-fluid">
				<form className="d-flex">
					<input
						className="form-control rounded-pill me-2"
						type="search"
						placeholder="Search for a recipe"
						aria-label="Search"
					/>
				</form>
				<div className="navbar-nav ms-auto">
					<div className="d-flex align-items-center">
						<button className="smallRedButton me-2">Add</button>

						<button className="btn btn-transparent me-2">
							<FaUtensils className="text-secondary" />
						</button>
						<button className="btn btn-transparent me-2">
							<FaClock className="text-secondary" />
						</button>
						<button className="btn btn-transparent me-2">
							<FaUser className="text-secondary" />
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
