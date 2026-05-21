import pg from '../../conexion.bd.mjs'
// Capa encargada de los datos
// Por ejemplo, consultas a una base de datos local o externa
//import productos from '../../productos.mjs'

export async function obtenerTodos(){
    // Si tomamos datos de archivos JSON aqui estaria el readFile

    const resultado = await pg.query('SELECT * FROM productos') // <-- devuelve un obejto Result
    //Ver las propiedades del rows en la pagina. (.rows es la propiedad que contiene los datos)
    // console.log(resultado)

    return resultado.rows
}

export async function obtenerUno(id){
    const idProducto = Number(id)
                                                                            //Esto
    const resultado = await pg.query('SELECT * FROM productos WHERE id =$1', [idProducto])//Esto es un arreglo
    // const productosFiltrado = productos.datos.filter((producto)=>{
    //     return Number(producto.id) === idProducto
    // })

    return resultado.rows
}

export async function borrarUno(id){
    const idProducto = Number(id)
    const cantProductos = Number(productos.datos.length)

    const resultado = await pg.query('DELETE FROM productos WHERE id =$1', [idProducto])//Esto es un arreglo

    console.log(resultado + '' + 'Console del modelo')
    // Esto es "artificial"
    
    // const productosFiltrado = productos.datos.filter((producto)=>{
        //     return Number(producto.id) !== idProducto
        // })
        // Usar .forEach() idealmente, junto a .splice(indice, 1) 
        
        // Aqui se podria retornar un booleano
        if (cantProductos !== resultado.length){
            return resultado.rows
        } else{
            return 0
        }

}