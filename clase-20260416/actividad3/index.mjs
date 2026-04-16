//Drive con avtividad 

//https://docs.google.com/document/d/13cjKFq_RWrTDeD0mf65fKxq1grVKb1QpIqf9QZYE8ys/edit?pli=1&tab=t.0#heading=h.y1k868cld6rj

import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'
import obtencionDeDatos from '../../actividad2/modulos/obtencionDeDatos.mjs'
import { escrituraDeDatos, lecturaDeDatos } from './modulos/lecturaYescritura.mjs'
import filtradoDeDatos from './modulos/filtrado.mjs'


const app = http.createServer(async(peticion, resp)=>{
    try{

        if(peticion.method === 'GET'){
    
            if (peticion.url === '/usuarios') {

                const usuarios = obtencionDeDatos()
                
                const ruta = path.join('./usuarios.json')
                
                escrituraDeDatos(usuarios, ruta)

                const contenido = lecturaDeDatos(ruta)
                
                return resp.end(contenido)
            }

            if(peticion.url === '/usuarios/filtrados'){

                const usuarios = obtencionDeDatos()
                
                const usuariosFiltrados = filtradoDeDatos(usuarios)
                
                const ruta = path.join('./usuariosFiltrados.json')
                
                escrituraDeDatos(usuariosFiltrados, ruta)
                
                const contenido = lecturaDeDatos(ruta)

                return resp.end(contenido)
            }


        }
    }

    catch(e){
    
        throw new Error(e)
    }

    resp.statusCode = 404
    return resp.end('No se encontro la ruta')

})

//IMPORTANTE
app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`)
})