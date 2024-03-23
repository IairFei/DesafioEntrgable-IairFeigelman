
let products = []

const addProduct = (title, descrtiption, price, thumbnail, code, stock) => {
    const newProduct ={
        id: products.length + 1,
        title,
        descrtiption,
        price,
        thumbnail,
        code,
        stock
    }

    // if (title === undefined || descrtiption === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined) {
    //     console.log("Todos los campos son obligatorios")
    //     return;
    // }

    if (Object.values(newProduct).includes(undefined)) {
        console.log("Todos los campos son obligatorios")
        return;
    }


    const productExists = products.find(product => product.code === code)
    if (productExists) {
        console.log(`El producto ${title} con el codigo ${code} ya existe`)
        return;
    }

    products.push(newProduct)
}

const getProducts = () => {
    console.log(products);
    return products;
}

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

addProduct("Producto 1", "El primer producto", 299, "http://www.google.com", "ADF123", 10)
addProduct("Producto 2", "El segundo producto", 899, "http://www.google.com", "ADF124", 10)
addProduct("Producto 3", "El tercer producto", 899, "http://www.google.com", "ADF124", 10)
addProduct("Producto 4", "El cuarto producto", 899, "http://www.google.com", "ADF125", 10)
addProduct("Producto 5", "El quinto producto", 899, "http://www.google.com", "ADF126")


// test

// getProducts();

getProductById(5);
