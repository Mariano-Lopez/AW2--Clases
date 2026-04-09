import fsp from 'node:fs/promises';
//Gestion de nombres de rutas en los distintos OS
import path from 'node:path'

function filtradoDeDatos(usuarios){

    try{
        
        const usuariosFiltro = usuarios.map((usuario) => {

            //Este es mas facil bro jajaja xdxd
            // id: usuario.id,
            // name: usuario.name,
            // email: usuario.email

            //Tomar en cuenta el cambio de identificador
            const usuarioFiltro = [{"id": usuario.id, "email": usuario.email, "name": usuario.name}]

            return usuarioFiltro
        })

        return usuariosFiltro
        
    }
    catch(e){
        console.log(e)
    }

}


async function escribirDatos(usuario){
    const ruta = path.join('./usuarios.json')
    
        //Convertimos un objeto JS - Arreglo u objeto a un  JSON 
        const datosAGuardar = JSON.stringify(usuario, null, 4)

        await fsp.writeFile(ruta, datosAGuardar)
        
}

async function lecturaDatos(){

    const ruta = path.join('./usuarios.json')
    const contenido = await fsp.readFile(ruta, 'utf-8')
    console.log(contenido)
}

export {filtradoDeDatos, escribirDatos, lecturaDatos}