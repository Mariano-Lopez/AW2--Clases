import  obtencionDeDatos  from "./modulos/obtencionDeDatos.mjs";
import { filtradoDeDatos, escribirDatos, lecturaDatos } from "./modulos/escrituraYLectura.mjs";

const usuario = await obtencionDeDatos()

const usuarioFiltro = filtradoDeDatos(usuario)

await escribirDatos(usuarioFiltro)

await lecturaDatos()
