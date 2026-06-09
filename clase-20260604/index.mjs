import express from 'express'
import cookieParser from 'cookie-parser'

const PUERTO = 3000

const app = express()

app.use(cookieParser('misecreto'))
//Avisamos que debe incluir los datos ne body
app.use(express.json())
//Codificacion de URL
app.use(express.urlencoded({extended:true}))

//Front login
//login
app.use('/login', express.static('./fronts/front-login'))

function chequearAcceso(req, res, next){    
    const miIdentificador= req.signedCookies['sesion']
    //Debe ser una consulta en la base de datos
    if(miIdentificador === 'identificador'){
        return next()
    }
    return res.redirect('/login')
}

//front admin
app.use('/admin', chequearAcceso , express.static('./fronts/front-admin'))

//Ruta autenticacion 
app.post('/autenticar', (req, res)=>{
    //Primero -> verificar credenciales
    const {usuario, clave} = req.body

    if(usuario != 'Quintero' || clave != '123456'){
        return res.redirect('/login')
    }
    console.log(req.body)
    //Generar cabeceras para gestion de cookies
    //Gestionamos cookies
    res.cookie('sesion', 'identificador', {
        secure:true, //https
        httpOnly: true, // No se puede leer desde JS
        sameSite: 'lax', //Como se va a leer la cookie con respecto al dominio
        signed: true, // Si la cookie se va a firmar o no
        maxAge: 1000*10
    })
    // res.json(
    //     {
    //         mensaje: 'usuario logueado'
    //     }
    // ) 
    //Lo vamos a usar solo si en el front es HTML puro
    res.redirect('/admin')
    //Si no es puro -> utilizar js para gestionar el formulario
} )

app.listen(PUERTO)