const input = document.querySelector(".form-control");
const button = document.querySelector(".btn");
const content = document.querySelector("template").content;
let tareas = [];
const divs = document.querySelectorAll("div");
tareas = JSON.parse(localStorage.getItem("tareas") || "[]");

const contenedorTareas = document.querySelector(".contenedor-lista-tareas");

//Botones
const eliminar = document.querySelector("#eliminar");
const completada = document.querySelector(".completada");

console.log(tareas);

let objTareas = Object.values(tareas);

let tareasCompletadas = [];
tareasCompletadas = JSON.parse(
  localStorage.getItem("tareasCompletadas") || "[]"
);
console.log(tareasCompletadas);
// Funciones
if (tareas.length > 0) {
  for (let index = 0; index < tareas.length; index++) {
    if (tareasCompletadas.includes(objTareas[index]["id"].toString())) {
      div = document.createElement("DIV");

      div.innerHTML = `<div id="${objTareas[index]["id"]}" class="container d-flex justify-content-center">
                    <div class="alert alert-success w-75 d-flex justify-content-between">
                        <div class="tarea-texto align-self-center text-decoration-line-through">
                            ${objTareas[index]["tarea"]}
                        </div>
                        <div class="iconos">
                            <i class="completada fas fa-check-circle m-2" style="color:green; font-size: 1.5rem; cursor:pointer;"></i>
                            <i class="eliminar fas fa-trash-alt" style="color:grey; font-size: 1.5rem; cursor:pointer;"></i>
                        </div>
                    </div>
                </div>`;

      contenedorTareas.appendChild(div);
    } else {
      div = document.createElement("DIV");
      div.innerHTML = `<div id="${objTareas[index]["id"]}" class="container d-flex justify-content-center">
                      <div class="alert alert-primary w-75 d-flex justify-content-between">
                          <div class="tarea-texto align-self-center ">
                              ${objTareas[index]["tarea"]}
                          </div>
                          <div class="iconos">
                              <i class="completada fas fa-check-circle m-2" style="color:green; font-size: 1.5rem; cursor:pointer;"></i>
                              <i class="eliminar fas fa-trash-alt" style="color:grey; font-size: 1.5rem; cursor:pointer;"></i>
                          </div>
                      </div>
                  </div>`;

      contenedorTareas.appendChild(div);
    }
  }
}

// Crear Tareas
button.addEventListener("click", () => {
  tarea = new crearTareas();
  tareas.push(tarea);
  imprimirTareas();
  input.value = "";

  Storage();
  console.log(tareas);
});

class crearTareas {
  constructor() {
    this.id = Date.now();
    this.tarea = input.value;
  }
}

// Imprimir Tareas
function imprimirTareas() {
  div = document.createElement("DIV");
  div.innerHTML = `<div id="${Date.now()}" class="container d-flex justify-content-center">
            <div class="alert alert-primary w-75 d-flex justify-content-between">
                <div class="tarea-texto align-self-center ">
                    ${tarea.tarea}
                </div>
                <div class="iconos">
                    <i class="completada fas fa-check-circle m-2" style="color:green; font-size: 1.5rem; cursor:pointer;"></i>
                    <i class="eliminar fas fa-trash-alt" style="color:grey; font-size: 1.5rem; cursor:pointer;"></i>
                </div>
            </div>
        </div>`;

  contenedorTareas.appendChild(div);
}

document.addEventListener("click", (e) => {
  let element = e.target;
  elementoId = element.parentNode.parentNode.parentNode.id; // Encuentra el atributo id del contenedor padre.
  // Eliminar Tareas
  if (element.classList.contains("eliminar")) {
    let indexObjeto = tareas.findIndex(
      (crearTareas) => crearTareas.id == elementoId
    ); // Encuentra el Index de la tarea creada.

    tareas.splice(indexObjeto, 1); // Elimina la tarea creada a partir del index entregado en "indexObjeto"

    element.parentNode.parentNode.parentNode.removeChild(
      element.parentNode.parentNode
    ); // Elimina el contenedor padre completo donde se aloja la tarea.
    Storage();
  }

  let indexTareaCompletadaId = tareasCompletadas.findIndex(
    (tareasCompletadas) => tareasCompletadas == elementoId
  );
  console.log(indexTareaCompletadaId);

  // Tarea completada
  if (element.classList.contains("completada")) {
    if (element.parentNode.parentNode.classList.contains("alert-primary")) {
      tareasCompletadas.push(elementoId);
      console.log(tareasCompletadas);
      element.parentNode.parentNode.classList.remove("alert-primary");
      element.parentNode.parentNode.classList.add("alert-success");
      element.parentNode.previousElementSibling.classList.add(
        "text-decoration-line-through"
      );
      storageTareasCompletadas();
    } else {
      tareasCompletadas.splice(indexTareaCompletadaId, 1);
      console.log(tareasCompletadas);
      element.parentNode.parentNode.classList.remove("alert-success");
      element.parentNode.parentNode.classList.add("alert-primary");
      element.parentNode.previousElementSibling.classList.remove(
        "text-decoration-line-through"
      );
      storageTareasCompletadas();
    }
  }
});

function storageTareasCompletadas() {
  localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));
}

function Storage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
