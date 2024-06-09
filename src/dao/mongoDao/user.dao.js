import { userModel } from "../models/user.model.js";

//Recibe el pedido de la query y lo retorna con las opciones establecidas previamente del paginate
const getAll = async () => {
    const users = await userModel.find();
    return users;
}

//Retorna el user solicitado mediante id por parametro
const getById = async (id) => {
    const user = await userModel.findById(id)
    return user;
}

//Busca y retorna si encontro el mail en la base
const getByEmail = async (email) => {
    const user = await userModel.findOne({email})
    return user;
}

//Recibe data que se va a almacenar en el user y retorna el user
const create = async (data) => {
    const user = await userModel.create(data)
    return user;
}

//Recibe id del user que se quiere modificar y la data
const update = async (id, data) => {
    //Cambia la data del user, pero no devuelve el user actualizado
    await userModel.findByIdAndUpdate(id, data)
    //Busca el user con la data actualizada
    const user = await userModel.findById(id)
    return user;
}
//El id pasado por parametro se va a eliminar
const deleteOne = async (id) => {
    const user = await userModel.deleteOne({_id: id})
    if(user.deletedCount === 0) return false
    return true;
}

export default{
    getAll,
    getById,
    create,
    update,
    deleteOne,
    getByEmail
}