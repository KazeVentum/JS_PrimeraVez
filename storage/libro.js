// Se la configuracion del json-server
import env from "../config.js";

//Se oraganiza ingresado a las llaves de config.js
const uri = `${env.ssl + env.hostName}:${env.port}`;

//Nos dice la configuracion del HTTP,  El metodo esta indefinido ya que cambiara en la siguientes funciones y tambien dice como se mandara a informacion, en este caso json
const config = {method: undefined, headers: {"Content-Type": "application/json"}};

export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/libro`, config)).json();
    return res;
}
export const post = async(obj)=>{
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro`, config)).json();
    return res;
}
export const deleteOne = async(id)=>{
    if(typeof id !== 'number') return {status: 400, message: `El datos '${id}' no cumple con el formato`};
    config.method = "DELETE";
    // config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    return res;
}
export const putOne = async(obj={})=>{
    if(!obj.id) return {status: 400, message: `Usuario mande un los datos plis :)`};
    const {id, autorId, categoriaId, editorialId, titulo, fechaLanzamiento, isbn, numPaginacion, estadoId} = obj;
    if(typeof titulo !== 'string') return {status: 400, message: `El datos '${titulo}' no cumple con el formato`};
    if(typeof id !== 'number') return {status: 400, message: `El datos '${id}' no cumple con el formato`};
    // let date = new Date(fechaLanzamiento);
    // if(!(date && date.getFullYear()<=2040)) return {status: 400, message: `El datos '${fechaLanzamiento}' no cumple con el formato`};
    if(typeof autorId !== 'number') return {status: 400, message: `El datos '${autorId}' no cumple con el formato`};
    // if(typeof categoriaId !== 'number') return {status: 400, message: `El datos '${categoriaId}' no cumple con el formato`};
    // if(typeof editorialId !== 'number') return {status: 400, message: `El datos '${editorialId}' no cumple con el formato`};
    // if(typeof isbn !== 'string') return {status: 400, message: `El datos '${isbn}' no cumple con el formato`};
    // if(typeof numPaginacion !== 'number') return {status: 400, message: `El datos '${numPaginacion}' no cumple con el formato`};
    // if(typeof estadoId !== 'number') return {status: 400, message: `El datos '${estadoId}' no cumple con el formato`};
    
    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    return res;
}



// console.log(await post({titulo:"Pepito", fecha: "2023-08-10"}));
// console.log(await getAll());
// console.log(await deleteOne(1));
console.log(await putOne({id:1, titulo:"Carechimba", autorId: 525}));