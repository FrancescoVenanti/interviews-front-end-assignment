import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store"; // Ensure this imports your configured store type
import { addRecipe } from "../../redux/Slicer/recipeSlice";
import { fetchCuisines } from "../../redux/Slicer/cousineSlice"; // Ensure these paths are correct
import { fetchDiets } from "../../redux/Slicer/dietsSlice";
import { fetchDifficulties } from "../../redux/Slicer/difficultiesSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar/NarBar";
import { Link, useNavigate } from "react-router-dom";

const AddRecipe: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [ingredients, setIngredients] = useState<string>("");
	const [instructions, setInstructions] = useState<string>("");
	const [cuisineId, setCuisineId] = useState<string>("");
	const [dietId, setDietId] = useState<string>("");
	const [difficultyId, setDifficultyId] = useState<string>("");
	const [image, setImage] = useState<File | null>(null);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const cuisines = useSelector((state: RootState) => state.cuisines.cuisines);
	const diets = useSelector((state: RootState) => state.diets.diets);
	const difficulties = useSelector((state: RootState) => state.difficulties.difficulties);

	useEffect(() => {
		dispatch(fetchCuisines());
		dispatch(fetchDiets());
		dispatch(fetchDifficulties());
	}, [dispatch]);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const handleIngredientsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIngredients(e.target.value);
	const handleInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value);
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImage(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		formData.append("ingredients", ingredients.split(",").join("\n"));
		formData.append("instructions", instructions);
		formData.append("cuisineId", cuisineId);
		formData.append("dietId", dietId);
		formData.append("difficultyId", difficultyId);
		if (image) {
			formData.append("image", image);
		}
		try {
			await dispatch(addRecipe(formData));
			console.log("Recipe added successfully");
			setName("");
			setIngredients("");
			setInstructions("");
			setCuisineId("");
			setDietId("");
			setDifficultyId("");
			setImage(null);
		} catch (error) {
			console.error("There was an error adding the recipe!", error);
		}
		navigate("/home");
	};

	return (
		<div className="container-lg p-0">
			<NavBar />

			<form onSubmit={handleSubmit} className="p-3">
				<div className="row">
					<div className="col-12 col-lg-8">
						<div className="containerGray">
							<p className="fs-5 fw-bold m-0 mb-3">Recipe details</p>
							<div className="mb-3">
								<label className="form-label">Recipe title</label>
								<input
									type="text"
									className="form-control  rounded-pill"
									placeholder="Recipe Name"
									value={name}
									onChange={handleNameChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Ingredients</label>
								<textarea
									className="form-control rounded-pill ps-3"
									placeholder="ingredient1, ingredient2, ingredient3, ..."
									value={ingredients}
									onChange={handleIngredientsChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Instructions</label>
								<textarea
									className="form-control rounded-pill ps-3"
									value={instructions}
									onChange={handleInstructionsChange}
									placeholder="instructions..."
									required
								/>
							</div>
						</div>

						<div className="containerGray mt-3">
							<p className="fs-5 fw-bold m-0">Image</p>
							<div className="mb-3">
								<div className="image-selector">
									<input
										className="h-100 w-100"
										type="file"
										id="fileInput"
										onChange={handleImageChange}
									/>
									<label htmlFor="fileInput">
										{image ? (
											<span>{image.name}</span>
										) : (
											<span>Drag and drop an image here or click to select</span>
										)}
									</label>
								</div>
							</div>
						</div>

						<div className="containerGray mt-3">
							<p className="fs-5 fw-bold m-0">Additional Information</p>
							<div className="d-flex flex-column flex-md-row justify-content-between px-4 py-2">
								<div className="mb-3">
									<label className="form-label">
										Cuisine:
										<select
											className="form-control"
											value={cuisineId}
											onChange={(e) => setCuisineId(e.target.value)}
											required
										>
											<option value="" disabled>
												Select Cuisine
											</option>
											{cuisines.map((cuisine) => (
												<option key={cuisine.id} value={cuisine.id}>
													{cuisine.name}
												</option>
											))}
										</select>
									</label>
								</div>
								<div className="mb-3">
									<label className="form-label">
										Diet:
										<select
											className="form-control"
											value={dietId}
											onChange={(e) => setDietId(e.target.value)}
											required
										>
											<option value="" disabled>
												Select Diet
											</option>
											{diets.map((diet) => (
												<option key={diet.id} value={diet.id}>
													{diet.name}
												</option>
											))}
										</select>
									</label>
								</div>
								<div className="mb-3">
									<label className="form-label">
										Difficulty:
										<select
											className="form-control"
											value={difficultyId}
											onChange={(e) => setDifficultyId(e.target.value)}
											required
										>
											<option value="" disabled>
												Select Difficulty
											</option>
											{difficulties.map((difficulty) => (
												<option key={difficulty.id} value={difficulty.id}>
													{difficulty.name}
												</option>
											))}
										</select>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-lg-4">
						<div className="containerGray p-3">
							<p className="fs-5 fw-bold m-0">Recipe preview</p>
							<div className="d-flex justify-content-center">
								{image && (
									<img
										src={image ? URL.createObjectURL(image) : "https://placehold.co/400"}
										alt="recipe"
										className="img-fluid rounded-3"
									/>
								)}
							</div>
						</div>
						<div className=" mt-3 containerGray px-5 py-3">
							<button type="submit" className="smallRedButton w-100 mb-3">
								Add Recipe
							</button>
							<Link to="/home" className=" text-decoration-none">
								<p className="smallWhiteButton w-100 text-center m-0">Cancel</p>
							</Link>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddRecipe;
