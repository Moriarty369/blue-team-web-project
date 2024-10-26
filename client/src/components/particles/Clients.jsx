import React from "react";

const Clients = () => {
  return (
    <div className="bg-gray-100 p-8 flex flex-col items-center justify-center gap-8 mt-20 xl:mt-0">
      <h1 className="text-2xl font-medium text-gray-800 text-center">
        Conexiones con empresas de renombre
      </h1>
      <div className="flex flex-col md:flex-row items-center flex-wrap gap-20">
        <img src="img/google.png" className="w-40" />
        <img src="img/airbnb.png" className="w-40" />
        <img src="img/amazon.png" className="w-40" />
        <img src="img/shopify.png" className="w-40" />
        <img src="img/google.png" className="w-40" />
      </div>
    </div>
  );
};

export default Clients;
