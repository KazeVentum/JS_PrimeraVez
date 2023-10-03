// Se la configuracion del json-server
import env from "../config.js";

//Se oraganiza ingresado a las llaves de config.js
const uri = `${env.ssl + env.hostName}:${env.port}`;

//Nos dice la configuracion del HTTP,  El metodo esta indefinido ya que cambiara en la siguientes funciones y tambien dice como se mandara a informacion, en este caso json
const config = {method: undefined, headers: {"Content-Type": "application/json"}};

export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/estado_libro`, config)).json();
    return res;
}

export const post = async(obj)=>{
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/estado_libro`, config)).json();
    return res;
}

export const deleteOneCategoria = async(id)=>{
    if(typeof id !== 'number') return {status: 400, message: `El datos '${id}' no cumple con el formato`};
    config.method = "DELETE";
    // config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/estado_libro/${id}`, config)).json();
    return res;
}

export const putOneCategoria = async(obj={})=>{

    if(!obj.id) return {status: 400, message: `Usuario mande bien los datos plis :)`};
    const { 
        descripcion=null,
        nombre=null,
        id_estado= null,
        id=null
    } = obj;

    if(typeof id !== 'number') return {status: 400, message: `El dato id '${id}' no cumple con el formato`};
    if(typeof id_estado !== 'number') return {status: 400, message: `El dato id_estado '${id_estado}' no cumple carechimba`};
    if(typeof nombre !== 'string') return {status: 400, message: `El dato nombre '${nombre}' no cumple con el formato`};
    if(typeof descripcion !== 'string') return {status: 400, message: `El dato descripcion '${descripcion}' no cumple con el formato`};

    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/estado_libro/${id}`, config)).json();
    return res;
}

// console.log(await post({}));  // FUNCIONANDO
// console.log(await getAll()); //FUNCIONANDO
// console.log(await deleteOneCategoria(2)); //FUNCIONANDO
// console.log(await putOneCategoria({id:1, id_estado: 1111, nombre: "ScorpioCity", descripcion: "Un libro escrito en bogotá."})); //FUNCIONANDO

