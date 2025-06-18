let nome = prompt("Informe seu nome: ");
alert(`Sejá bem vindo ${nome}!`);

let tempoRestante = 9;
let fase = 0;
let pedidoPedestre = false;

let statusElemento = document.getElementById("status");
let contadorElemento = document.getElementById("contador");
let botaoPedestre = document.getElementById("botao-pedestre");

let luzes = {
  vermelho: document.getElementById("vermelho"),
  amarelo: document.getElementById("amarelo"),
  verde: document.getElementById("verde"),
};

function apagarTodas() {
  for (let cor in luzes) {
    luzes[cor].classList.remove("ativo");
  }
}

function atualizarSemaforo() {
  apagarTodas();

  if (fase === 0) {
    luzes.verde.classList.add("ativo");
    tempoRestante = 9;
    statusElemento.textContent = "Carros em movimento";
  } else if (fase === 1) {
    luzes.amarelo.classList.add("ativo");
    tempoRestante = 3;
    statusElemento.textContent = "Atenção!";
  } else if (fase === 2) {
    luzes.vermelho.classList.add("ativo");
    tempoRestante = 9;
    if (pedidoPedestre) {
      statusElemento.textContent = "Pedestres atravessando";
      pedidoPedestre = false;
    } else {
      statusElemento.textContent = "Carros parados";
    }
  }
  contadorElemento.textContent = tempoRestante;
}

function iniciarSemaforo() {
  atualizarSemaforo();

  setInterval(() => {
    tempoRestante--;
    contadorElemento.textContent = tempoRestante;

    if (tempoRestante <= 0) {
      fase = (fase + 1) % 3;
      atualizarSemaforo();
    }
  }, 1000);
}

botaoPedestre.addEventListener("click", () => {
  if (fase === 0) {
    // Se está no verde, já pula pro amarelo na hora
    fase = 1;
    atualizarSemaforo();
  }
  pedidoPedestre = true;
  alert("Pedido de travessia registrado!");
});

iniciarSemaforo();
