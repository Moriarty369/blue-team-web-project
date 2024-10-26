import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="block items-center ml-40  flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
      <div className="w-full lg:w-1/2">
        <img
          className="hidden lg:block"
          src="https://i.ibb.co/v30JLYr/Group-192-2.png"
        />
        <img
          className="hidden md:block lg:hidden"
          src="https://i.ibb.co/c1ggfn2/Group-193.png"
        />
        <img
          className="md:hidden"
          src="https://i.ibb.co/8gTVH2Y/Group-198.png"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
          Parece que intentas buscar puertas traseras{" "}
        </h1>
        <p className="py-2 text-base text-gray-800">
          Este contenido no es permitido
        </p>
        <p className="py-4 text-base text-gray-800">
          o eres paleto y no escribiste bien la url
        </p>
        <Link
          to="/register"
          className="w-full lg:w-auto my-8 rounded-md px-2 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
        >
          No vas a hackearnos 😂{" "}
        </Link>
      </div>
    </div>
  );
}

export { NotFound };
