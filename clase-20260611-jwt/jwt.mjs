import jwt from 'jsonwebtoken'

//SIGNED <----- firmar
 
//VERIFY <------ verificar la firma

jwt.sign({usuario: 'MarianoL'}, 'largaysupersecreta', {expiresIn: '1h'}, (error, token)=>{
    console.log(token)
})

