//console.log("Todo funcionando")
//FS Gestion de archivos en node 
import fsp from 'node:fs/promises';
//Gestion de nombres de rutas en los distintos OS
import path from 'node:path'

try{
    //Leemos la api via fetch y me devuelve un objeto Response 
    const respuesta = await fetch('https://69cbcbce0b417a19e07b43d3.mockapi.io/Productos')

    //Extrae el cuerpo en formato JSON y convertilo en un Arreglo/Objeto 
    const productos = await respuesta.json()

    console.log(productos)

}
catch(e){
    console.log(e)
}