//Variables

const contenedor = document.getElementById("contenedor");
const boton_inicio = document.getElementById("boton-inicio");
const boton_siguiente = document.getElementById("boton-siguiente");
const boton_reiniciar = document.getElementById("boton-reiniciar");
const contenedor_elementos = document.getElementById("contenedor-elementos");
const contenedor_PyR = document.getElementById("preguntas-y-respuestas");
const question = document.getElementById("pregunta");
const respuestas = document.getElementById("respuestas");
const resultado_juego = document.getElementById("resultado-juego");

let matrizRandom,
  indice,
  contador = 0;

//Add event Listeners
boton_inicio.addEventListener("click", iniciaJuego);
boton_siguiente.addEventListener("click", () => {
  indice++;
  siguientePregunta();
});

//funcion inicia juego

function iniciaJuego() {
  contenedor_elementos.classList.add("oculto");
  boton_reiniciar.classList.add("oculto");
  matrizRandom = preguntas.sort(() => Math.random() - 0.5); //Permite reorganizar el array preguntas en distintos ordenes
  indice = 0;
  cargarContenido(matrizRandom[indice]);
}

//Funcion que carga las preguntas y respuestas

function cargarContenido(arrayElem) {
  contenedor_PyR.classList.remove("oculto");
  question.innerText = arrayElem.pregunta;
  arrayElem.respuestas.forEach((respuesta) => {
    const boton_respuesta = document.createElement("BUTTON");
    boton_respuesta.innerText = respuesta.texto;
    respuestas.appendChild(boton_respuesta);

    if (respuesta.correcto) {
      boton_respuesta.dataset.correcto = respuesta.correcto;
    }
      boton_respuesta.addEventListener("click", seleccionaRespuesta);
  });
}

//Función que permite seleecionar una respuesta

function seleccionaRespuesta(e) {
  const botonSeleccionado = e.target;
  Array.from(respuestas.children).forEach((boton) => {
    if (boton.dataset.correcto) {
      boton.classList.add("correcto");
      if (botonSeleccionado.dataset.correcto === "true") {
        contador += 1;
      }
    } else {
      boton.classList.add("incorrecto");
    }
  });

  //Determina el fin de la matriz y del juego

  if (matrizRandom.length > indice + 1) {
    boton_siguiente.classList.remove("oculto");
  } else {
    boton_siguiente.classList.add("oculto");
    boton_reiniciar.classList.remove("oculto");
    if (contador >= matrizRandom.length / 2 + 1) {
      resultado("ganado");
    } else {
      resultado("perdido");
    }
    boton_reiniciar.addEventListener("click", function () {
      restaurar();
      iniciaJuego();
      contador = 0;
      resultado_juego.classList.add("oculto");
    });
  }
  console.log(contador);
}

//Función que carga la siguiente pregunta

function siguientePregunta() {
  restaurar();
  cargarContenido(matrizRandom[indice]);
}

//Función que restaura el juego

function restaurar() {
  while (respuestas.firstChild) {
    respuestas.removeChild(respuestas.firstChild);
  }
}

//Función que muestra el resultado

function resultado(valor) {
  resultado_juego.classList.remove("oculto");
  resultado_juego.innerText = `Has ${valor}!`;
}

//Preguntas

const preguntas = [
  {
    pregunta: "Cuál fue el primer presidente de Colombia?",
    respuestas: [
      { texto: "Rafael Nuñez", correcto: false },
      { texto: "Simón Bolivar", correcto: true },
      { texto: "José de Paula Santander", correcto: false },
      { texto: "Tomás Cipriano de Mosquera", correcto: false },
    ],
  },

  {
    pregunta: "Cuál es el elemento más duro descubierto hasta el momento?",
    respuestas: [
      { texto: "Carbino", correcto: true },
      { texto: "Diamante", correcto: false },
      { texto: "Grafeno", correcto: false },
      { texto: "Grafito", correcto: false },
    ],
  },
  {
    pregunta: "Cuál es la capital de Turquía?",
    respuestas: [
      { texto: "Islamabad", correcto: false },
      { texto: "Dakar", correcto: false },
      { texto: "Estambul", correcto: false },
      { texto: "Ankara", correcto: true },
    ],
  },
  {
    pregunta: "Quién fue el inventor de la penicilina?",
    respuestas: [
      { texto: "Louis Pasteur", correcto: false },
      { texto: "Robert Koch", correcto: false },
      { texto: "Alexander Fleming", correcto: true },
      { texto: "Joseph Lister", correcto: false },
    ],
  },
  {
    pregunta: "Quién fue la primera persona en viajar al espacio?",
    respuestas: [
      { texto: "Neil Armstrong", correcto: false },
      { texto: "Buzz Aldrin", correcto: false },
      { texto: "Rodolfo Neri Vela", correcto: false },
      { texto: "Yuri Gagarin", correcto: true },
    ],
  },
  {
    pregunta:
      "En qué año y dónde se da la declaración universal de los derechos humanos?",
    respuestas: [
      { texto: "1950, Roma", correcto: false },
      { texto: "1948, París", correcto: true },
      { texto: "1894, Marsella", correcto: false },
      { texto: "1920, Londres", correcto: false },
    ],
  },
];
