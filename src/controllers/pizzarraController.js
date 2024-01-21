let pizarra = '';
const verPizarra = (req,res) => {
    res.json({ pizarra });
}

const editarPizarra = (req,res)=>{
// Actualiza el contenido de la pizarra con el nuevo contenido del cuerpo de la solicitud
  pizarra = req.body.contenido;

  // Retorna una respuesta exitosa
  res.status(200).send('Actualización exitosa');
}

module.exports = {verPizarra,editarPizarra}