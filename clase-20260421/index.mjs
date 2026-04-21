//ExpressJS -> framework de JS para crear servidores

import express from 'express'

const puerto = 3000

//Instancia de servidor
const app = express()


//Verbo y ruta configurada -> GET /
app.get('/', (req, rest)=>{
    rest.status(200)

    rest.end('Hola ExpressJS ')
})

app.get('/forlan', (req, rest)=>{
    rest.status(200)
    rest.set('content-type', 'text/plain')
    rest.send('<h1>Hola porto en send</h1>')
})

app.post('/', (req, rest)=>{
    rest.status(201)
    rest.end('Hola express en POST')
})

app.post('/aguero', (req, rest)=>{
    rest.status(201)
    rest.end('Hola porto en POST')
})



//Abro puerto-
app.listen(puerto, ()=>{
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
})