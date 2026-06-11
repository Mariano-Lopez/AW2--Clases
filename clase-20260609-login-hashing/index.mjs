import express, {urlencoded} from 'express';
import bcrypt from 'bcryptjs'
import pool from './conexion.bd.mjs'
import cookieParser from 'cookie-parser'

const PUERTO = 3000


////////////////

////////////////
const app = express();


app.use(cookieParser('EsUnSecreto'))

app.use(express.json())//-->req.body --> un objeto JS
app.use(express.urlencoded({extended:true})) // ------> req.body --> un objeto JS


function chequearAcceso(req, res, next){    
    const miIdentificador= req.signedCookies['sesion']
    //Debe ser una consulta en la base de datos
    if(miIdentificador === 'identificador'){
        return next()
    }
    return res.redirect('/login')
}


//Hacer publicas estas carpetas para acceder desde el navegador

//-> /admin ->Peticion (./fronts/front-admin)
app.use('/admin', chequearAcceso , express.static('./fronts/front-admin'))
//-> /login -> Peticion (./fronts/front-login)
app.use('/login', express.static('./fronts/front-login'))





//Configurar rutas login y registro
app.post('/autenticar', async (req, res)=>{

    const {usuario, pass} = req.body

    //Chequear datos
    if(!usuario || !pass ){
        return res.status(400).json({
            mensaje: 'El usuario no existe'
        })
    }


    const resultado = await pool.query(`
        SELECT * 
        FROM usuarios 
        WHERE username = $1
        `,
        [
            usuario
        ]
    )


    if(resultado.rowCount === 0){

        return res.status(400).json({mensaje: 'Usuario no encontrado =('})
    }

    const hash = resultado.rows[0].password_hash


    // Load hash from your password DB.
    const verificacion = await bcrypt.compare( pass, hash)

    if(!verificacion){
        return res.status(400).json({mensaje: 'jiji le erraste'})
    }
    res.cookie('sesion', 'identificador', {
        secure:true, //https
        httpOnly: true, // No se puede leer desde JS
        sameSite: 'lax', //Como se va a leer la cookie con respecto al dominio
        signed: true, // Si la cookie se va a firmar o no
        maxAge: 1000*10
    })

    return res.status(200).redirect('/admin')
    

})

app.post('/registrar', async(req, res)=>{
    
    // 1 - obtengo los datos del formulario
    // req.body.usuario
    // req.body.pass
    
    //Asignacion desestructurante
    const {usuario, pass} = req.body
    //3- Hashing
    try{

    }
    catch{

    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    // Store hash in your password DB

    const resultado = await pool.query(
        `INSERT INTO usuarios
            (username, password_hash)
        VALUES
            ($1, $2)
        RETURNING id, username
        `,
        [
            usuario,
            hash
        ]
    )
    //Si todo OK
    if(resultado.rowCount > 0){
        return res.status(201).json({mensaje: 'Usuario creado =)', usuario: resultado.rows[0].username})
    }
    //SIno
    res.json({mensaje:'No funciono'})

})

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
