import express from 'express';
import bcrypt from 'bcryptjs'
import pool from './conexion.bd.mjs'

const PUERTO = 3000

////////////////

////////////////
const app = express();

app.use(express.json())//-->req.body --> un objeto JS
app.use(express.urlencoded({extended:true})) // ------> req.body --> un objeto JS


//Hacer publicas estas carpetas para acceder desde el navegador

//-> /admin ->Peticion (./fronts/front-admin)
app.use('/admin', express.static('./fronts/front-admin'))
//-> /login -> Peticion (./fronts/front-login)
app.use('/login', express.static('./fronts/front-login'))

//Configurar rutas login y registro

app.post('/autenticar', (req, res)=>{

})

app.post('/registrar', async(req, res)=>{
    
    // 1 - obtengo los datos del formulario
    // req.body.usuario
    // req.body.pass
    
    //Asignacion desestructurante
    const {usuario, pass} = req.body

    //2 - Chequear datos
    if(!usuario || !pass ){
        return res.status(400).json({
            mensaje: 'El usuario no existe'
        })
    }

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
