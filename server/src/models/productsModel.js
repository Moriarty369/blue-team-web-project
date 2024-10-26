import { Schema, model } from "mongoose";


const productSchema = new Schema({
  title: {
    type:String,
    required:true,
    index:true,
},
  price: {
    type:Number,
    required:true,
    index:true,
},
  description: {
    type:String,
    required:true,
    index:true,
},
  category: {
    type:String,
    required:true,
    index:true,
},
  image: {
    type:String,
    required:true,
    index:true,
},
  rating: Object,
//reviews: Array
},
{
  timestamps: true,
  versionKey: false // -_- para que no aparezca la versión del documento en la base de datos
})

// -_- Exportar el modelo con la funcion model de mongoose que recibe el nombre del modelo y el esquema
export default model('Product', productSchema)