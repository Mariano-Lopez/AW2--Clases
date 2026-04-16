async function escrituraDeDatos(usuarios, ruta) {
    
    const datosAGuardar = JSON.stringify(usuarios, null, 4)
                
    await fsp.writeFile(ruta, datosAGuardar)
}

async function lecturaDeDatos(ruta) {
    
    const contenido = await fsp.readFile(ruta, 'utf-8')

    return contenido
}

export {escrituraDeDatos, lecturaDeDatos}
                