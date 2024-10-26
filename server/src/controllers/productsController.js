// -_- ------------------ Encargado de la logica de los productos CRUD ------------------ -_-
import ProductsModel from '../models/productsModel'



export const createProduct = async (req, res) => {
    console.log('Enviando solicitud para crear producto, endpoint al controlador funciona!')
    console.log(req.body)

    // -_- --------- Extraemos los datos del cuerpo de la solicitud del cliente --------- -_- //
    const { title, price, description, category, image, rating } = req.body;
    // -_- --------- Ahora creamos un nuevo producto con los datos extraidos --------- -_- //

    const newProduct = new ProductsModel({
        title,
        price,
        description,
        category,
        image,
        rating
    });
    console.log(`Producto creado: ${newProduct}`)
    const productCreated = await newProduct.save();
    res.status(201).json(productCreated); // -_- el codigo 201 indica que se ha creado un nuevo recurso

};

export const getProducts = async (req, res) => {
    console.log('Obteniendo GET de TODOS los productos endpoint al controlador funciona!')
    const products = await ProductsModel.find();
    res.status(200).json(products);
}

export const getProductById = async (req, res) => {
    console.log('Obteniendo Producto por ID, endpoint al controlador funciona!')
    // -_- --------- Extraemos el id del producto de los parametros de la solicitud antes de pasarlo a findById de mongoose --------- -_- //
    const { id } = req.params;
    try {
        const product = await ProductsModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        console.log(product);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// -_- ------------- Actualizar un producto por ID ------------- -_- //
export const updateProductByID = async (req, res) => {
    console.log('Actualizando Producto, endpoint al controlador funciona!')
    const { id } = req.params
    ;
  try {
    const updateProductCtrl = await ProductsModel.findByIdAndUpdate(id,{
        title: req?.body?.title,
        price: req?.body?.price,
        description: req?.body?.description,
        category: req?.body?.category,
        image: req?.body?.image,
        rating: req?.body?.rating,
    }, {
        new: true
     }
    );
    res.status(200).json(updateProductCtrl);
    console.log(`id usuario actualizado: ${id}`); 
} catch (error) {
  throw new Error('No se pudo actualizar el usuario');
}
}


// -_- ------------- Eliminar un producto por ID ------------- -_- //
 export const deleteProduct = async (req, res) => {
     console.log('Eliminando Producto, endpint al controlador funciona!')
    const { id } = req.params;
    try {
        const product = await ProductsModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        console.error("Error al eliminar el producto por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

    
 
