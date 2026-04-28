import express from 'express'
import path from 'node:path'
const PUERTO = 3000

const app = express()

app.use(express.static(/*Utilizar el modulo path*/path.resolve('front')))

app.listen(PUERTO, ()=>{
    console.log(`http://localhost:${PUERTO}`)
})
