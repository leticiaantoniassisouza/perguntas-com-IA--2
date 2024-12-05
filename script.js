import { aleatorio, nome } from './aleatorio.js';

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

const perguntas = [
    {
        enunciado: "Quem foi o principal criador de Elden Ring?",
        alternativas: [
            { texto: "Hidetaka Miyazaki", certo: true },
            { texto: "Hironobu Sakaguchi", certo: false }
        ]
    },
    {
        enunciado: "Quem é o personagem principal do jogo?",
        alternativas: [
            { texto: "O Cavaleiro", certo: false },
            { texto: "O Sinluz (Tarnished)", certo: true }
        ]
    },
    {
        enunciado: "Qual desses é um dos principais chefes em Elden Ring?",
        alternativas: [
            { texto: "Gwyn, Lord of Cinder", certo: false },
            { texto: "Malenia, Blade of Miquella", certo: true }
        ]
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;

botaoIniciar.addEventListener('click', iniciaJogo);

function iniciaJogo() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    telaInicial.style.display = 'none';
    caixaResultado.style.display = 'none';
    mostraPergunta();
}

function mostraPergunta() {
    // Se todas as perguntas foram respondidas, mostra o resultado
    if (indicePerguntaAtual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[indicePerguntaAtual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = ""; // Limpa alternativas anteriores

    // Gera alternativas
    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.classList.add("alternativa-btn");
        botao.addEventListener("click", () => verificaResposta(alternativa.certo));
        caixaAlternativas.appendChild(botao);
    });
}

function verificaResposta(respostaCerta) {
    if (respostaCerta) {
        pontuacao++;
    }

    indicePerguntaAtual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Fim do jogo!";
    textoResultado.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
    caixaAlternativas.innerHTML = "";
    caixaResultado.style.display = 'block';
}

botaoJogarNovamente.addEventListener('click', () => {
    telaInicial.style.display = 'flex';
    caixaResultado.style.display = 'none';
});
