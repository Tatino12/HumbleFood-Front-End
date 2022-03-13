import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { searchByName } from "../../redux/actions";

const SearchBar = () => {
	const [input, setInput] = useState("");
	const dispatch = useDispatch();
	const { shopId } = useParams();

	// console.log("producto", filteredByName);

	const HandleInputChange = (e) => {
		e.preventDefault();
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(searchByName(shopId, input));
		setInput("");
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)} type="submit">
			<div className="relative text-gray-600 focus-within:text-gray-400">
				<span className="absolute inset-y-0 left-0 flex items-center pl-2">
					<button className="p-1 focus:outline-none focus:shadow-outline">
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</button>
				</span>
				<input
					type="search"
					onChange={(e) => HandleInputChange(e)}
					className="py-2 text-sm text-white bg-isabelle rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
					placeholder="Buscar..."
					autoComplete="off"
				/>
			</div>
		</form>
	);
};

export default SearchBar;
