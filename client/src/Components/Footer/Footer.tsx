import "./footer.scss";

const Footer = () => {
	return (
		<div className="container-lg w-100 bg-light p-3 border-top border-white footer">
			<div className="row">
				<div className="col-12 col-md-6">
					<div className="d-flex h-100 flex-column justify-content-center align-items-center align-items-lg-start">
						<p className="m-0 fs-5 fw-bold">© 2021 RecipeBook</p>
						<p className="m-0">Made with ❤️ by Francesco Venanti </p>
					</div>
				</div>
				<div className="col-12 col-md-6 text-lg-end text-black-50 fw-bold text-center ">
					<p className="m-0 text-dark">Support</p>
					<p className="m-0">Guidelines</p>
					<p className="m-0">Feedback hub</p>
					<p className="m-0">Cooking Tips</p>
					<p className="m-0">Get in touch</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
