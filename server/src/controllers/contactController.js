import ContactModel from "../models/contactModel";

export const createContact = async (req, res) => {
  console.log(
    "Enviando solicitud para crear mensaje de contacto, endpoint al controlador funciona!"
  );
  // -_- --------- Extraemos los datos del cuerpo de la solicitud del cliente --------- -_- //
  const { name, email, message, subject } = req.body;
  // -_- --------- Ahora creamos un nuevo producto con los datos extraidos --------- -_- //

  const newContact = new ContactModel ({
    name,
    email,
    message,
    subject,
  });

  console.log("Mensaje de contacto creado: ".concat(newContact));

  const productCreated = await newContact.save();

  res.status(201).json(productCreated); // -_- el codigo 201 indica que se ha creado un nuevo recurso
};
