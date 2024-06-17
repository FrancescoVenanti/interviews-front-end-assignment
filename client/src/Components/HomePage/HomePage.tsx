import { motion } from "framer-motion";
import { fetchComments } from "../../redux/Slicer/commentSlice";
import { fetchRecipes } from "../../redux/Slicer/recipeSlice";
import NavBar from "../NavBar/NarBar";
import Sidebar from "../Sidebar/Sidebar";
import "./HomePage.scss";
import { useEffect } from "react";
import { fetchCuisines } from "../../redux/Slicer/cousineSlice";
import { fetchDifficulties } from "../../redux/Slicer/difficultiesSlice";
import { fetchDiets } from "../../redux/Slicer/dietsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SingleRecipe from "../Recipe/SingleRecipe";
import Footer from "../Footer/Footer";

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { x: -100, opacity: 0 },
	show: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

const HomePage = () => {
	const dispatch = useAppDispatch();
	const { recipes, status, error } = useAppSelector((state) => state.recipes);

	useEffect(() => {
		dispatch(fetchRecipes());
		dispatch(fetchComments());
		dispatch(fetchCuisines());
		dispatch(fetchDifficulties());
		dispatch(fetchDiets());
	}, [dispatch]);

	return (
		<div className="d-flex flex-column container-lg p-0">
			<NavBar />
			<div className="d-flex">
				<Sidebar />
				<div className="p-3 pe-0">
					{status === "loading" && <p>Loading...</p>}
					{status === "succeeded" && (
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="show"
							className="recipe-list"
						>
							{recipes.map((item, index) => (
								<motion.div key={index} className="containerGray mb-3 shadow" variants={itemVariants}>
									<SingleRecipe recipe={item} />
								</motion.div>
							))}
						</motion.div>
					)}
					{status === "failed" && <p>{error}</p>}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default HomePage;
