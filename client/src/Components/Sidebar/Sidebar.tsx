// Sidebar.tsx

import { FaBook, FaCalendar, FaPeopleGroup, FaUtensils } from "react-icons/fa6";
import "./Sidebar.scss"; // Ensure this is imported for your custom button styles

const Sidebar = () => {
	return (
		<div className="sidebar bg-light shadow-sm">
			<div className="container-fluid p-3">
				<div className="d-flex flex-column justify-content-center mt-4">
					<button className="btn btn-transparent mb-2 ">
						<FaUtensils className="text-dark" />
					</button>
					<button className="btn btn-transparent mb-2 ">
						<FaBook className="text-dark" />
					</button>
					<button className="btn btn-transparent mb-2 ">
						<FaPeopleGroup className="text-dark" />
					</button>
					<button className="btn btn-transparent mb-2 ">
						<FaCalendar className="text-dark" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
