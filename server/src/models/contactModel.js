import { Schema, model } from "mongoose";


const contactSchema = new Schema({
  name: String,
  email: String,
  message: String,
  subject: String,
},
{
  timestamps: true,
  versionKey: false // -_- para que no aparezca la versión de express, etc del documento en la base de datos
})

// -_- Exportar el modelo con la funcion model de mongoose que recibe el nombre del modelo y el esquema
export default model('Contact', contactSchema)