async function obtencionDeDatos() {
    try{
    //Leemos la api via fetch y me devuelve un objeto Response 
    const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')

    //Extrae el cuerpo en formato JSON y convertilo en un Arreglo/Objeto 
    const usuarios = await respuesta.json()
    
    return usuarios
    }
    catch(e){
        console.log(e)
    }
}

export default obtencionDeDatos



