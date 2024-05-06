class Grupo {
  constructor() {
    this.miembros = [];
    this.nombre = "";
    this.adeudan = [];
  }
}
class Miembro {
  constructor() {
    this.email = "";
    this.username = "";
  }
}


export default function ListGroup() {
  //Hardcodeo grupos//
  let miembro1 = new Miembro();
  miembro1.username = "mariowexd";
  let miembro2 = new Miembro();
  miembro2.username = "carlos";
  let miembro3 = new Miembro();
  miembro3.username = "juan";

  let grupo1 = new Grupo();
  grupo1.nombre = "Almuerzo";
  grupo1.miembros = [miembro1, miembro2];
  grupo1.adeudan = [512, 325, 432];

  let grupo2 = new Grupo();
  grupo2.nombre = "Cena";
  grupo2.adeudan = [512, 325, 0];
  grupo2.miembros = [miembro1, miembro2, miembro3];
  
  let grupos=[grupo1, grupo2];
  //Fin hardcodeo, remplacese con lógica para obtener los datos del backend//
  

  const headings = [];
  for (let i=0; i<grupos.length; i++){
    headings.push(
      <h3>{grupos[i].nombre}</h3>
    );
    for (let j=0; j<grupos[i].miembros.length; j++){
      headings.push(
        <p>{grupos[i].miembros[j].username}, ${grupos[i].adeudan[j]}</p>
      );
    }
  }




  return (
    <section>
      <h1>Group List:</h1>
      {headings}
    </section>
  );
}