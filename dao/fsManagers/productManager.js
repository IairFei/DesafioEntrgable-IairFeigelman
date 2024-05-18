//Se inicializa el File System
// const fs = require('fs');

import fs from 'fs';

//Se crea un array con el nombre products
let products = []

//Se asigna un path file en el que va a contener el JSON de los productos
const pathFile = "./src/data/products.json"


//Esta funcion se utiliza para agregar el producto al array de products

// Esta funcion devuelve todos los productos dentro del array products
// Recibe por parametro el limite a mostrar
const getProducts = async (limit) => {

    //En esta linea, readFile lee el contenido del path file y lo guarda en una constante
    const productsJson = await fs.promises.readFile(pathFile, "utf-8")
    
    //Se convierten los datos traidos como String en objetos y si no se pudo, devuelve un array vacio
    if (productsJson.includes("[")) {
        products = JSON.parse(productsJson)
      }else {
        fs.promises.writeFile(pathFile, JSON.stringify(products))
      }

    //Si el limite recibe undefined, retorna todos los productos
    if (!limit) return products


    //Retorna los productos con un limite obtenido por parametro, desde la posicion 0 hasta el limite
    return products.slice(0, limit)
};

const addProduct = async (product) => {
    const { title, description, price, thumbnail, code, stock } = product;
    await getProducts()
    //Aca se asignan las variables pasadas por parametro

        const newProduct ={
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true,

    }

/*Esta funcion se utiliza para verificar que ninguna variable tenga el valor undefined dentro del Object que se esta pidiendo agragar,
 ya que un requisito es que ningun valor del objeto sea undefined.
 Si encontro que alguna variable es === a undefined, frena la creacion del producto y avisa por consola el motivo*/

    if (Object.values(newProduct).includes(undefined)) {
        console.log("Todos los campos son obligatorios")
        return;
    }

/* Esta funcion se utiliza para buscar un producto con el mismo code en el array products.
Busca en el array un code === al pasado por parametro con la funcion find (Esta funcion recorre todos los code en el array products)
Si no lo encuentra, continua.
Si lo encuentra, avisa por consola que se encontro un objeto con el mismo code y frena la creacion del producto.*/

    const productExists = products.find(product => product.code === code)
    if (productExists) {
        console.log(`El producto ${title} con el codigo ${code} ya existe`)
        return;
    }

    //Una vez hechas las validaciones, se hace el .push() para agregar el nuevo producto al array products
    products.push(newProduct)

    //Escribe en el path pasado el nuevo objeto y lo parsea como un objeto al JSON en el archivo de la carpeta data
    await fs.promises.writeFile(pathFile, JSON.stringify(products))
}


/* Esta funcion se utiliza para buscar un producto con un determinado id en el array products.
Busca en el array un id === al pasado por parametro con la funcion find (Esta funcion recorre todos los id en el array products)
Si lo encuentra, mustra el producto.
Si no lo encuentra, avisa por consola que no se encontro el producto y muestra el id pasado por parametro.*/

const getProductById = async (id) => {
    //Con el await, espera a que la funcion getProducts() haga un parse a JSON para poder trabajar con los objetos
    await getProducts()
    const product = products.find(product => product.id === id)
    if (!product){
        console.log(`No se encontro el producto con el id:${id}`)
        return;
    }
    else {
        return product;
    }
}

//Esta funcion recibe 2 datos como parametros para poder actualizar los datos del producto, el id y los datos a cambiar
const updateProduct = async (id, dataProduct) => {
    //Con el await, espera a que la funcion getProducts() haga un parse a JSON para poder trabajar con los objetos
    await getProducts()

    //Busca en products el index pasado por parametro y devuelve el objeto
    const index = products.findIndex(product => product.id === id)

    //Se hace una copia del objeto obtenido en la variable index y se le asignan los valores pasados por parametro\
    //al objeto (no tienen la misma referencia de memoria, ya que, al utilizar ... apunta a un nuevo espacio
    //en la memoria y eso hace que no se modifique el objeto original) 
    products[index] = {
        ...products[index],
        ...dataProduct
    }
    //Escribe en el path pasado el nuevo objeto y lo parsea como un objeto al JSON en el archivo de la carpeta data
    await fs.promises.writeFile(pathFile, JSON.stringify(products))
}

//Elimina el producto con el id pasado por parametro
const deleteProduct = async (id) => {

    //Con el await, espera a que la funcion getProducts() haga un parse a JSON para poder trabajar con los objetos
    await getProducts()

    products = products.filter( product => product.id !== id)

    //Estribe el objeto obtenido en la linea anterior en el path file ya declarado anteriormente y lo convierte en un JSON
    await fs.promises.writeFile(pathFile, JSON.stringify(products))

}

export default {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}