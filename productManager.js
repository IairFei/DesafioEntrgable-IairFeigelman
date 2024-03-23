//Se crea un array con el nombre products

let products = []


//Esta funcion se utiliza para agregar el producto al array de products

const addProduct = (title, descrtiption, price, thumbnail, code, stock) => {

    //Aca se asignan las variables pasadas por parametro

        const newProduct ={
        id: products.length + 1,
        title,
        descrtiption,
        price,
        thumbnail,
        code,
        stock,

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
}

// Esta funcion devuelve todos los productos dentro del array products

const getProducts = () => {
    console.log(products);
    return products;
}

/* Esta funcion se utiliza para buscar un producto con un determinado id en el array products.
Busca en el array un id === al pasado por parametro con la funcion find (Esta funcion recorre todos los id en el array products)
Si lo encuentra, mustra el producto.
Si no lo encuentra, avisa por consola que no se encontro el producto y muestra el id pasado por parametro.*/

const getProductById = (id) => {
    const product = products.find(product => product.id === id)
    if (!product){
        console.log(`No se encontro el producto con el id:${id}`)
        return;
    }
    else {
        console.log(product)
        return;
    }
}


//Inicializacion de productos
addProduct("Producto 1", "El primer producto", 299, "http://www.google.com", "ADF121", 10)
addProduct("Producto 2", "El segundo producto", 899, "http://www.google.com", "ADF122", 10)
addProduct("Producto 3", "El tercer producto", 899, "http://www.google.com", "ADF123", 10)
addProduct("Producto 4", "El cuarto producto", 899, "http://www.google.com", "ADF124", 10)
addProduct("Producto 5", "El quinto producto", 899, "http://www.google.com", "ADF125")


// Test

// Se pide mostrar todos los productos en el array products
getProducts();

// Se pide mostrar el producto con el id pasado por parametro
getProductById(2);
