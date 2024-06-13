//top navbbar component

import { useState } from "react";
import { FaClock, FaUser, FaUtensils } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

//TODO add user icon + implement functionalities

const NavBar = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (query.trim()) {
			navigate(`/Search/${query}`);
		}
	};

	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light sticky-top navBar">
			<div className="container-fluid">
				<Link to={"/home"} className="text-decoration-none">
					<p className="navbar-brand m-0 me-3 ">RecipeBook</p>
				</Link>
				<form className="d-flex" onSubmit={handleSubmit}>
					<input
						className="form-control rounded-pill me-2"
						type="search"
						placeholder="Search for a recipe"
						aria-label="Search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</form>
				<div className="navbar-nav ms-auto">
					<div className="d-flex align-items-center">
						<Link to={"/add-recipe"} className="smallRedButton me-2 text-decoration-none">
							Add
						</Link>

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
