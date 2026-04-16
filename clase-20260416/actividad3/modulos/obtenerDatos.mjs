
async function obtenerDatos() {
    
    try{
        
        const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')
        const usuarios = await respuesta.json()

        return usuarios
    }

    catch{
        throw new Error(e)
    }

    
}

export default{obtenerDatos}