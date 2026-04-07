//console.log("Todo funcionando")
//FS Gestion de archivos en node 
import fsp from 'node:fs/promises';
//Gestion de nombres de rutas en los distintos OS
import path from 'node:path'


try{
    const ruta = path.join('./texto.txt')
    const contenido = await fsp.readFile(ruta, 'utf-8')

    console.log(contenido)
}
catch(e){
    console.log(e)
}
