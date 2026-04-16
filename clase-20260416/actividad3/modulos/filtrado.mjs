function filtradoDeDatos(parametro){

    const parametro2 = parametro.filter(e=> e.id < 10)

    return parametro2
}

export default filtradoDeDatos