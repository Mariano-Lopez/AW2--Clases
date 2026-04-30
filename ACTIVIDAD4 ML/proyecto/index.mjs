import express from 'express'

const PUERTO = 3000

const app = express()

async function middleware(req, res, next){

    const codigoRecibido = parseInt(req.params.codigo)

    const respuesta = await fetch('http://localhost:4321/usuario')

    const codigo2 = await respuesta.json()

    console.log(typeof codigo2.codigo)
    if(codigo2.codigo === codigoRecibido){
        next()
    }
    else{
        res.status(400).json({mensaje: 'El codigo es incorrecto'})
    }
}

app.get('/:codigo', middleware, (req, res)=>{

    res.status(200).json({mensaje: 'El codigo es correcto'})

})

app.listen(PUERTO)
