interface CollageProps {
	images: string[];
}

const Collage = ({ images }: CollageProps) => {
	const count = images.length;

	const size = count === 1 ? "size-160" : count <= 3 ? "size-104" : "size-56";

	const square3x3 = count === 9;

	const imagesElements = (
		<>
			{images.map((image) => (
				<div
					className={`rounded-3xl ${size} relative overflow-hidden`}
					key={image}>
					<img
						className="object-cover w-full h-full absolute blur-sm opacity-60"
						src={`/${image}`}
					/>
					<img
						className="object-contain w-full h-full absolute"
						src={`/${image}`}
					/>
				</div>
			))}
		</>
	);

	const baseClass = "w-full h-full justify-center content-center p-10 gap-5 relative";

	return square3x3 ? <div className={"grid grid-cols-3cols justify-items-center " + baseClass}>{imagesElements}</div> : <div className={"flex flex-wrap " + baseClass}>{imagesElements}</div>;
};

export default Collage;
