import express from 'express'

const PUERTO = 3000

const app = express()

function middleware1(req, res, next){

    console.log('middlewre1')
    next()
    // const usuarioExiste = true
    
    // if(usuarioExiste){
        
    //     console.log('Usuario existe, puede pasar')
    //     next() //Avanzar al siguiente
    // }else{
    //     console.log('Usuario no existe, clavalo')
    //     res.send('Usuario no registrado')
    // }

    // if(usuarioExiste){
    //     return next()
    // }
    // console.log('Usuario no existe, clavalo')
    // return res.send('Usuario no registrado')

}

//La ruta en use e sun prefijo 
//Se ejecuta en todas las rutas ya que por defecto tiene '/'
app.use(middleware1)



app.get('/', (req, res)=>{
    console.log('Respuesta final')
    res.send('Hola')
})



app.get('/saludo', (req, res)=>{
    console.log('Respuesta final con saludo')
    res.send('Hola')
})

app.get('/saludo/dedia', (req, res)=>{
    console.log('Respuesta final con saludo')
    res.send('Hola')
})


app.listen(PUERTO, ()=>{
    console.log(`http://localhost:${PUERTO}`)
})
