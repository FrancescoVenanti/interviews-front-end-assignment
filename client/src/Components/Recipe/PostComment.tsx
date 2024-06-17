import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store"; // Ensure this imports your configured store type
import { addComment } from "../../redux/Slicer/commentSlice";
import "bootstrap/dist/css/bootstrap.min.css";

interface PostCommentProps {
	recipeId: string;
}

const PostComment: React.FC<PostCommentProps> = ({ recipeId }) => {
	const [comment, setComment] = useState<string>("");
	const [rating, setRating] = useState<number>(0);
	const [date, setDate] = useState<string>(new Date().toISOString());
	const dispatch = useDispatch<AppDispatch>();

	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);
	const handleRatingChange = (value: number) => setRating(value);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setDate(new Date().toISOString());
		try {
			await dispatch(addComment({ recipeId, comment, rating, date }));
			console.log("Comment added successfully");
			setComment("");
			setRating(0);
		} catch (error) {
			console.error("There was an error adding the comment!", error);
		}
	};

	const renderStars = () => {
		return [1, 2, 3, 4, 5].map((value) => (
			<span
				key={value}
				className={`star ${value <= rating ? "selected" : ""}`}
				onClick={() => handleRatingChange(value)}
				style={{ cursor: "pointer", fontSize: "1.5rem", color: value <= rating ? "#ffc107" : "#e4e5e9" }}
			>
				★
			</span>
		));
	};

	return (
		<form onSubmit={handleSubmit} className="p-3">
			<div className="mb-3">
				<label className="form-label">
					Comment:
					<textarea className="form-control" value={comment} onChange={handleCommentChange} required />
				</label>
			</div>
			<div className="mb-3">
				<label className="form-label">
					Rating:
					<div>{renderStars()}</div>
				</label>
			</div>
			<button type="submit" className="btn btn-danger btn-sm">
				Add Comment
			</button>
		</form>
	);
};

export default PostComment;
