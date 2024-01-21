//esta funcion nos permitira que todos los formatos que se envie este en json

function isJson(formato){
   

    try{

          formato = formato.toString('utf-8')
        const jsonData = JSON.parse(formato);
        return jsonData;


    }catch(e){
        console.log("No se mando con  formato json");
        return false;
    }
}

module.exports = isJson