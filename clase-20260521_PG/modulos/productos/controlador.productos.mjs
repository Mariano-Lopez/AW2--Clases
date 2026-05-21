import * as modelo from './modelo.productos.mjs'
import * as vista from './vistas.productos.mjs'

export async function obtenerTodos(req, res){
    // Obtenemos de capa modelo la funcion
    const productos = await modelo.obtenerTodos()

    //En la vista modelamos la respuesta
    const respuesta = vista.obtenerTodos(productos) // <- arreglo

    res.json(respuesta)
}

export async function obtenerUno (req, res){
    // obtener id del parametro
    const id = req.params.id
    // ejecutamos la funcion importada desde modelo
    const producto = await modelo.obtenerUno(id)
    const respuesta = vista.obtenerUno(producto) // <- arreglo
    console.log(respuesta)
    // verificamos si hay producto
    if (respuesta.length > 0){
        res.json(producto)
    } else{
        res.status(404).json({mensaje: 'producto no encontrado'})
    }
}

export async function borrarUno (req, res){
    // obtener id del parametro
    const id = req.params.id
    // ejecutamos la funcion importada desde modelo
    const producto = modelo.borrarUno(id)

    console.log(producto + '' + 'Console del modelo')
    // verificamos si hay producto
    if (producto){
        res.json('Producto elimnado correctamente')
    } else{
        res.status(500).json({mensaje: 'producto no encontrado'})
    }

}