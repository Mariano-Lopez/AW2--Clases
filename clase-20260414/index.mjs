//Modulo HTTP

import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'



//Creamos una instancia de servidor
const app = http.createServer(async (peticion, respuesta) => {
    //console.log(peticion) // <-- Viene del cliente
    if(peticion.method === 'GET') {


        if (peticion.url === '/') {
            //Antes del end todo. Despues nada
            respuesta.statusCode = 200
            return respuesta.end(`
            Hola ruta raiz
    
            `) // <-- Devuelve el servidor

        }
        if (peticion.url === '/usuarios') {
            //Antes del end todo. Despues nada
            respuesta.statusCode = 200
            return respuesta.end(`
            Hola usuarios
    
            `) // <-- Devuelve el servidor

        }
    }

    if(peticion.method === 'POST'){
        if(peticion.url === '/'){

            const ruta = './contenido.txt'
            await fsp.writeFile(ruta, 'contenido falso')

            return respuesta.end('Recurso creado')
        }

    }

    //Falback
    respuesta.statusCode = 404
    return respuesta.end('No se encontro la ruta')
})

//Abrimos puerto

app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`)
})