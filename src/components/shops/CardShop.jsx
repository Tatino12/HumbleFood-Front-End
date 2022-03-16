import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillHeartFill } from "react-icons/bs";
import {
	addFavorites,
	getAllFavorites,
	removeFavorites,
} from "../../redux/actions";

const CardShop = ({ shop, userId }) => {
	const dispatch = useDispatch();
	const { id, name, image, description } = shop;
	const misfavoritos = useSelector((state) => state.allFavorites);
	const shopsID = misfavoritos.map((i) => i.id);
	const shopIdguardado = shopsID.includes(id);

	// console.log(shopID.includes(id))

	const guardar = () => {
		// console.log(id);
		dispatch(addFavorites(userId, id));
		dispatch(getAllFavorites(userId));
	};

	const borrar = () => {
		// console.log(id);
		dispatch(removeFavorites(userId, id));
		dispatch(getAllFavorites(userId));
	};

	return (
		<>
			<div className="flex justify-center items-center mobile:ml-6 mobile:w-11/12 w-full drop-shadow-lg">
				<div className="w-full relative bg-white shadow-md h-96 rounded-xl  flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-11/12 md:w-96">
					<img
						className="relative w-full sm:w-1/2 h-3/4 sm:h-full  object-cover"
						src={image}
						alt="comida"
					/>
					{userId ? (
						<div
							className="cursor-pointer"
							onClick={shopIdguardado ? borrar : guardar}
						>
							<button className="absolute bg-gray-600 text-white p-2.5 rounded-sm shadow-md top-0 left-0">
								<BsFillHeartFill
									className={shopIdguardado ? "text-red-600" : "text-white-500"}
								/>
							</button>
						</div>
					) : null}

					<div className=" flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
						<div className="flex flex-col justify-start items-baseline">
							<Link to={`/productShop/${id}`}>
								<h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
									{name}
								</h1>
							</Link>
						</div>
						<p className="text-xs text-gray-500 w-4/5">{description}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default CardShop;
