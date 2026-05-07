import productos from "./productos.mjs"



export function obtenerProductos(req, res){
    res.json(productos)
}

export function obtenerProductoPorID(req, res){
    const id = Number(req.params.id)
    
    const productoFiltrado = productos.datos.filter(producto => (Number(producto.id) === id))
    
    if (productoFiltrado.length > 0){
        // Se pueden hacer respuestas personalizadas
        const respuesta = {
            datos: productoFiltrado,
            url: 'http://localhost:3000/api/v1/productos/' + id,
            status: 200
        }
        
        res.json(respuesta)
    } else{
        res.status(404).json({mensaje: 'Producto no encontrado.'})
    }
}

export function agregarProducto(req, res){
    const producto = req.body
    const ultimoId = productos.ultimo_id + 1
    const productoFinal = {
        id: ultimoId,
        ...producto

    }

    productos.datos.push(productoFinal)
    productos.ultimo_id = ultimoId
    res.status(201).json({mensaje: 'El producto fue dado de alta'})
}

export function modificarProducto(req, res){
    //Necesito saber id
    const id_producto = Number(req.params.id)
    //Necesitamos los datos del producto a modificar
    const productoNuevo = req.body 

    productos.datos.map((producto)=>{
        // const indice = productos.datos.indexOf(producto)
        // console.log(indice)
         if(Number(producto.id) === id_producto){
                const indice = productos.datos.indexOf(producto)
                console.log(indice)
                productos.datos[indice] = {
                    id: id_producto,
                    ...productoNuevo
                }


                // productos.datos[indice].nombre = producto.nombre
                // productos.datos[indice] =
                // productos.datos[indice] =
                // productos.datos[indice] =
                
        }   
    })
    res.json({mensaje: 'Se cambio pa, AGUUANTE EL BAYERN'})

}


/*VER ESTO*/
export function eliminarProducto(req, res){
    const id = Number(req.params.id)
    
    const productosFiltrado = productos.filter(producto => (Number(producto.id) !== id))

    const respuesta = {
        datos: productosFiltrado,
        mensaje: 'producto eliminado',
        url: 'http://localhost:3000/api/v1/productos/' + id,
        status: 200,
        verbo: 'DELETE'
    }

    res.json(respuesta)
    
}