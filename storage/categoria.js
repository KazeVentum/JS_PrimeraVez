// Se la configuracion del json-server
import env from "../config.js";

//Se oraganiza ingresado a las llaves de config.js
const uri = `${env.ssl + env.hostName}:${env.port}`;

//Nos dice la configuracion del HTTP,  El metodo esta indefinido ya que cambiara en la siguientes funciones y tambien dice como se mandara a informacion, en este caso json
const config = {method: undefined, headers: {"Content-Type": "application/json"}};

export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/categoria`, config)).json();
    return res;
}

export const post = async(obj)=>{
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/categoria`, config)).json();
    return res;
}

export const deleteOneCategoria = async(id)=>{
    if(typeof id !== 'number') return {status: 400, message: `El datos '${id}' no cumple con el formato`};
    config.method = "DELETE";
    // config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/categoria/${id}`, config)).json();
    return res;
}

export const putOneCategoria = async(obj={})=>{

    if(!obj.id) return {status: 400, message: `Usuario mande bien los datos plis :)`};
    const {
        id=null, 
        nombreCategoria=null, 
        categoriaId= null
    } = obj;

    if(typeof id !== 'number') return {status: 400, message: `El dato id '${id}' no cumple con el formato`};
    if(typeof categoriaId !== 'number') return {status: 400, message: `El dato categoriaId '${categoriaId}' no cumple carechimba`};
    if(typeof nombreCategoria !== 'string') return {status: 400, message: `El dato nombreCategoria '${nombreCategoria}' no cumple con el formato`};

    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/categoria/${id}`, config)).json();
    return res;
}


// console.log(await post({id_categoria: 7, categoria: "Terror"}));  // FUNCIONANDO
// console.log(await getAll()); //FUNCIONANDO
// console.log(await deleteOneCategoria(1)); //FUNCIONANDO
// console.log(await putOneCategoria({id:1, nombreCategoria:"Historia", categoriaId:70})); // FUNCIONANDO