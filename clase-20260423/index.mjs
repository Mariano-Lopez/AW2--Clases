//ExpressJS -> framework de JS para crear servidores

import express from 'express'

const puerto = 3000

//Instancia de servidor
const app = express()

const productos = [
        {
            id: 1,
            nombre: "AW2",
            precio: 300
        },
        {
            id:2,
            nombre: "AW3",
            precio:200
        }
    ]

//Avisamos a ExpressJS -> Chequear datos del cliente -> cuerpo (configuracion)

//app.use(express.urlencoded({extended:true}))
app.use(express.json())


const obtenerRaiz = (req, rest)=>{

    rest.end('Estas en la ruta raziz')
}

//Verbo y ruta configurada -> GET /
app.get('/', obtenerRaiz)

//------------------
                    //Tienen que ser iguales
app.get('/productos/:id', (req, res)=>{
                        //Tienen que ser iguale
    const id = parseInt(req.params.id)

    console.log(id)

    //Objeto JS
    

    const prodFil = productos.filter((producto)=>{
        return (producto.id === id)
    })

    if(prodFil.length > 0 ){

        return res.json(prodFil)
    }
    res.json({"mensaje":"Producto no encontrado"})



                                                        //Sin llave esta implicito el return
    // const productoFiltrado = productos.filter(producto => producto.id == id)

    // //Filtrar
    // if(productoFiltrado.length != 0){
    //     res.json(productoFiltrado)
    // }
    // else{
    //     res.sendStatus(404)
    // }
    

    //res.sendStatus(204)

    //Convierte de formato js a formato JSON pa xdxdxdxdxd
   
    //res.set('content-type', 'application/json')
    //                       'text/plain'
    //Objeto formato JSON, es una cadena como un texto cualquiera xdxdxdxdxd
    //res.send('{"materia":"AW2"}')

})

app.post('/productos',(req,res)=>{

    //Verificamos el cuerpo del mensaje
    const datosCliente = req.body
    productos.push(datosCliente)
    res.status(201).json({menaje: "Producto dado de alta"})

})

app.get('/productos', (req, rest)=>{

    rest.json(productos)

})


//Abro puerto-
app.listen(puerto, ()=>{
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
})