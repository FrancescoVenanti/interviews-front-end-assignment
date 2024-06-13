import { useParams } from "react-router-dom";

const SearchPage = () => {
	const param = useParams();
	const searchQuery = param.query;
	return (
		<div className="search-page">
			<h1>Search Page</h1>
			<p>Search Query: {searchQuery}</p>
		</div>
	);
};

export default SearchPage;
