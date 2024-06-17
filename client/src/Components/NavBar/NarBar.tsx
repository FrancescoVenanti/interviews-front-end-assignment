//top navbbar component

import { useState } from "react";
import { Container, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { FaBars, FaClock, FaUser, FaUtensils } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import IsMobile from "../../functions/isMobile";
import "./NavBar.scss";

//TODO Handle responsiveness

const NavBar = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (query.trim()) {
			navigate(`/Search/${query}`);
		}
	};

	const isMobile = IsMobile();
	console.log(isMobile);

	return (
		<Navbar bg="light" expand="lg" sticky="top">
			<Container fluid>
				<Navbar.Brand as={Link} to="/home">
					RecipeBook
				</Navbar.Brand>
				<Form className="d-flex mt-2 mt-lg-0 searchbar" onSubmit={handleSubmit}>
					<FormControl
						type="search"
						placeholder="Search for a recipe"
						className="me-2 rounded-pill"
						aria-label="Search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</Form>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0">
					<FaBars className="border-0" />
				</Navbar.Toggle>
				<Navbar.Collapse id="navbarScroll">
					<Nav className="ms-auto d-flex flex-row align-items-center justify-content-center">
						<div>
							<Nav.Link as={Link} to="/add-recipe">
								<button className="smallRedButton">Add Recipe</button>
							</Nav.Link>
						</div>
						<div className="d-flex align-items-center ms-4">
							<FaUtensils className="me-3" />

							<FaClock className="me-3" />

							<FaUser className="me-3" />
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
