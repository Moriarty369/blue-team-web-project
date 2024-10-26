import mongoose from "mongoose";

const dbConnect = () => {
  try {
    const db = mongoose.connect(process.env.MONGODB_URL, {
     
    });
    console.log("Conexión con la base de datos MongoDB exitosa");
  } catch (error) {
    console.log("Error en conectar con la base de datos MongoDB");
    console.log(error);
  }
};
module.exports = dbConnect;
