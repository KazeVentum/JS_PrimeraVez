// Se la configuracion del json-server
import env from "../config.js";

//Se oraganiza ingresado a las llaves de config.js
const uri = `${env.ssl + env.hostName}:${env.port}`;

//Nos dice la configuracion del HTTP,  El metodo esta indefinido ya que cambiara en la siguientes funciones y tambien dice como se mandara a informacion, en este caso json
const config = {method: undefined, headers: {"Content-Type": "application/json"}};

export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/prestamo`, config)).json();
    return res;
}
export const post = async(obj)=>{
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/prestamo`, config)).json();
    return res;
}
export const deleteOne = async(id)=>{
    if(typeof id !== 'number') return {status: 400, message: `El datos '${id}' no cumple con el formato`};
    config.method = "DELETE";
    // config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/prestamo/${id}`, config)).json();
    return res;
}
export const putOne = async(obj={})=>{
    if(!obj.id) return {status: 400, message: `Usuario mande un los datos plis :)`};
    const {id, id_Prestamo, id_Usuario, id_Libro, estado, fecha_Prestamo, fecha_Devolucion} = obj;


    if(typeof id !== 'number') return {status: 400, message: `El dato id '${id}' no cumple con el formato`};
    if(typeof id_Prestamo !== 'number') return {status: 400, message: `El dato id_Prestamo '${id_Prestamo}' no cumple con el formato`};
    if(typeof id_Usuario !== 'number') return {status: 400, message: `El dato id_Usuario '${id_Usuario}' no cumple con el formato`};
    if(typeof id_Libro !== 'number') return {status: 400, message: `El dato id_Libro '${id_Libro}' no cumple con el formato`};
    if(typeof estado !== 'string') return {status: 400, message: `El dato estado '${estado}' no cumple con el formato`};
    let date_fecha_Prestamo = new Date(fecha_Prestamo);
    let date_fecha_Devolucion = new Date(fecha_Devolucion);
    if(!(date_fecha_Prestamo && date_fecha_Prestamo.getFullYear()<=2040)) return {status: 400, message: `El datos '${fecha_Prestamo}' no cumple con el formato`};
    if(!(date_fecha_Devolucion && date_fecha_Devolucion.getFullYear()<=2040)) return {status: 400, message: `El datos '${fecha_Devolucion}' no cumple con el formato`};
    
    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/prestamo/${id}`, config)).json();
    return res;
}



console.log(await post({id_prestamo: 1, id_Usuario: 1,  id_Libro: 1, estado: "Activo", fecha_Prestamo: "2020-08-01", fecha_Devolucion: "2021-09-02"}));
// console.log(await getAll());
// console.log(await deleteOne(1));
// console.log(await putOne({id:1, titulo:"Carechimba", autorId: 525}));