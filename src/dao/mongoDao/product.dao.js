import { productModel } from "../models/product.model.js";

//Recibe el pedido de la query y lo retorna con las opciones establecidas previamente del paginate
const getAll = async (query, options) => {
    const products = await productModel.paginate(query, options);
    return products;
}

//Retorna el producto solicitado mediante id por parametro
const getById = async (id) => {
    const product = await productModel.findById(id)
    return product;
}

//Recibe data que se va a almacenar en el producto y retorna el producto
const create = async (data) => {
    const product = await productModel.create(data)
    return product;
}

//Recibe id del producto que se quiere modificar y la data
const update = async (id, data) => {
    //Cambia la data del producto, pero no devuelve el producto actualizado
    await productModel.findByIdAndUpdate(id, data)
    //Busca el producto con la data actualizada
    const product = await productModel.findById(id)
    return product;
}
//El id pasado por parametro se va a eliminar
const deleteOne = async (id) => {
    const product = await productModel.deleteOne({_id: id})
    if(product.deletedCount === 0) return false
    return true;
}

export default{
    getAll,
    getById,
    create,
    update,
    deleteOne
}