// AddMovieButton.jsx
export default function AddMovieButton({ onClick }) {
	return (
		<button onClick={onClick} className="px-5 py-2 rounded-xl flex items-center gap-2 mb-10 bg-[#3b82f6] hover:bg-[#2768d1] transition duration-300 cursor-pointer text-white">
			<span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
			Add Movie
		</button>
	);
}
