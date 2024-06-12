import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NarBar";
import Sidebar from "../Sidebar/Sidebar";
import "./HomePage.scss";
import { useEffect } from "react";
import { fetchData } from "../../redux/dataSlice";
import { RootState, AppDispatch } from "../../redux/store";

const HomePage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const data = useSelector((state: RootState) => state.data.items);
	const status = useSelector((state: RootState) => state.data.status);
	const error = useSelector((state: RootState) => state.data.error);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchData());
		}
	}, [status, dispatch]);

	console.log("Data:", data);
	const baseURL = "http://localhost:8080";

	return (
		<div className="d-flex flex-column">
			<NavBar />
			<div className="d-flex">
				<Sidebar />
				<div className="p-3">
					{status === "loading" && <p>Loading...</p>}
					{status === "succeeded" && (
						<div>
							{data.map((item, index) => (
								<div className="containerGray" key={index}>
									<img src={`${baseURL}${item.image}`} />
									<p>{item.name}</p>
								</div>
							))}
						</div>
					)}
					{status === "failed" && <p>{error}</p>}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
