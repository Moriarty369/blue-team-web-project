import { Schema, model } from 'mongoose';

// -_-  Esquema de Mongoose 
var userSchema = new Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    lastname:{
      type:String,
      required:true,
      index:true,
  },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    roles:[{ 
        type: Schema.Types.ObjectId,
        ref: 'Roles', // -_- Referencia a la colección de roles (rolesModel.js), relacionado por el _id (relacion uno a muchos un usuario puede tener varios roles)
    }]
    // cart:{
    //     type:Array,
    //     default:[],
    // },
    // address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    // wishlist:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

}, {
    timestamps: true,
    versionKey: false,

});

// -_- Hashear la contraseña antes de guardarla en la base de datos
const bcrypt = require('bcrypt');

// -_- Definir el método `encryptPassword` como un método estático del esquema de usuario
userSchema.statics.encryptPassword = async function(password) {
  try {
    // -_- Generar el "salt" para cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    // -_- Hashear la contraseña utilizando el "salt"
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    // -_- Manejar cualquier error que pueda ocurrir durante el proceso de cifrado
    throw new Error(error);
  }
};
 // -_- Comparar contraseña
 userSchema.statics.comparePassword = async (password, receivedPassword) => {
   return await bcrypt.compare(password, receivedPassword);
 };

//-_- Exportar el modelo de usuario
export default model('User', userSchema);