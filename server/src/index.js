import app from "./config/app.js";
import dbConnect from "./config/dbConnect";

require("dotenv").config();
const PORT = process.env.PORT || 4000;

dbConnect();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto:${PORT}`);
});






/////////// PRUEBA HTTPS ///////////////////////
// import app from "./config/app.js";
// import dbConnect from "./config/dbConnect";
// import https from 'https'; // Importa el módulo https
// import fs from 'fs'; // Importa el módulo fs para leer los archivos de certificado SSL

// require("dotenv").config();
// const PORT = process.env.PORT || 4000;

// dbConnect();

// const privateKey = fs.readFileSync('/Users/sibarita/key.pem', 'utf8');
// const certificate = fs.readFileSync('/Users/sibarita/cert.pem', 'utf8');

// ;

// const credentials = {
//     key: privateKey,
//     cert: certificate,

// };

// // Crea un servidor HTTPS en lugar de usar app.listen()
// const httpsServer = https.createServer(credentials, app);

// // Ahora, el servidor HTTPS escuchará en el mismo puerto que el servidor HTTP anterior
// httpsServer.listen(PORT, "0.0.0.0", () => {
//     console.log(`Servidor escuchandoooo en el puerto:${PORT}`);
// });

