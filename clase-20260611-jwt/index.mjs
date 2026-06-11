// Token de acceso TID AW2 p.366

import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import pool from './conexion.bd.mjs';
import jwt from 'jsonwebtoken'

const PUERTO = process.env.PUERTO || 4000;

const app = express();

//AMBOS parsean y guardan datos del cliente en body. Los guarda como objeto JS 
app.use(express.json()); //formato JSON
app.use(express.urlencoded({extended:true})) //formato URLEncoded
//Lee la cabecera de las cookies y crea un objeto 'cookies' que los transforma en un objeto JS (si esta firmada lo va a poner en SIGNED)
app.use(cookieParser(process.env.COOKIE_FIRMA));


app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if (resultado.rowCount > 0) {
            res.redirect('/login'); // Redirigimos al usuario a la página de login
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/autenticar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    //Consultar BBDD si el usuario esta registrado
    if(true){
        jwt.sign({usuario: 'MarianoL'}, process.env.JWT_FIRMA, {expiresIn: '1h'}, (error, token)=>{
            
            if(error){
                return res.json({mensjae: 'error'})
            }
            //Iniciamos una cookie
            res.cookie('token', token, {
                secure: true,
                httpOnly: true,
                sameSite: 'lax',
                signed: true
            })
            res.redirect('/admin')
            
        })
        
    }
});


function verificarAcceso(req, res, next){
    const token = req.signedCookies['token']

    jwt.verify(token, process.env.JWT_FIRMA, function(error, decoded){
        
        if(error){
            return res.redirect('/login')
        }
        next()
    })
}

// Servir ambos fronts

//Admin
app.use('/admin', verificarAcceso, express.static('./fronts/front-admin'))

//Login
app.use('/login', express.static('./fronts/front-login'))



app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
