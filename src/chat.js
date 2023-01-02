const socket = io();
const imagen = document.querySelector("img");
const salida = document.querySelector("#valor");
const texto = document.querySelector("#recibetxt");
const btnenv = document.querySelector("#envio");
const nombre = document.querySelector("#name");
const formulario = document.querySelector("#formulario");
let nombreT = "";

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (nombre.value === "" || texto.value === "") {
    alert("Por favor no ingreses espacios vacios");
  } else {
    estilos();
    nombreT = nombre.value;
    socket.emit("chat:message", { name: nombreT, texto: texto.value });
    nombre.remove();
  }
});

socket.on("server:chat", (chat) => {
  salida.innerHTML += `<p><strong>${chat.name} : </strong>${chat.texto}</p>`;
  texto.value = "";
  abajo();
});

function estilos() {
  imagen.remove();
  document.body.style.gridTemplateRows = " 90% 10%";
  formulario.style.flexDirection = "row";
  formulario.style.width = "100%";
  texto.style.width = "80%";
  btnenv.style.marginLeft = "3px ";
  btnenv.style.width = "10%";
  btnenv.style.height = "22px";
}

function abajo() {
  salida.scrollTop = salida.scrollHeight;
}
