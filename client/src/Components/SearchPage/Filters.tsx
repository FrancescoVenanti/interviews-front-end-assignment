import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import React from "react";

interface FiltersProps {
	expandFilters: boolean;
	setExpandFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters: React.FC<FiltersProps> = ({ expandFilters, setExpandFilter }) => {
	if (!expandFilters) {
		return (
			<div className="bg-light me-3 shadow">
				<button className="btn btn-transparent" onClick={() => setExpandFilter(true)}>
					<FaArrowRight className="ms-3" />
				</button>
			</div>
		);
	} else {
		return (
			<div className="bg-light me-3 shadow">
				<button className="btn btn-transparent" onClick={() => setExpandFilter(false)}>
					<FaArrowLeft className="ms-2 mt-2" />
				</button>
				<div className="p-3">
					<p className="fs-5 m-0">Discover recipes</p>
				</div>
			</div>
		);
	}
};

export default Filters;
