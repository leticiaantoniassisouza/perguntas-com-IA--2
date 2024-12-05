import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let historiaFinal = "";

// Verificação de elementos DOM
if (!botaoIniciar || !caixaPerguntas || !caixaAlternativas || !caixaResultado) {
  console.error("Alguns elementos necessários não foram encontrados no DOM.");
}

botaoIniciar?.addEventListener('click', iniciaJogo);

function iniciaJogo() {
  atual = 0;
  historiaFinal = "";
  telaInicial.style.display = 'none';
  caixaPerguntas.classList.remove("mostrar");
  caixaAlternativas.classList.remove("mostrar");
  caixaResultado.classList.remove("mostrar");
  mostraPergunta();
}

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }
  const perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.innerHTML = ""; // Limpar alternativas anteriores
  mostraAlternativas(perguntaAtual);
}

function mostraAlternativas(perguntaAtual) {
  perguntaAtual.alternativas.forEach((alternativa) => {
    const botaoAlternativa = document.createElement("button");
    botaoAlternativa.textContent = alternativa.texto;
    botaoAlternativa.addEventListener("click", () => respostaSelecionada(alternativa));
    caixaAlternativas.appendChild(botaoAlternativa);
  });
}

function respostaSelecionada(opcaoSelecionada) {
  const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
  historiaFinal += afirmacao + " ";
  if (opcaoSelecionada.proxima !== undefined) {
    atual = opcaoSelecionada.proxima;
    mostraPergunta();
  } else {
    mostraResultado();
  }
}

function mostraResultado() {
  caixaPerguntas.textContent = `Em 2049, ${nome}`;
  textoResultado.textContent = historiaFinal.trim();
  caixaAlternativas.innerHTML = ""; // Limpar alternativas
  caixaResultado.classList.add("mostrar");
  botaoJogarNovamente?.addEventListener("click", jogaNovamente);
}

function jogaNovamente() {
  atual = 0;
  historiaFinal = "";
  caixaResultado.classList.remove("mostrar");
  mostraPergunta();
}

// Atualizar perguntas com o nome do jogador
function substituiNome() {
  perguntas.forEach((pergunta) => {
    pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
  });
}

substituiNome();
