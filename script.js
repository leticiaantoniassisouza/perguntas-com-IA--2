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
const perguntas = [
    {
        enunciado: "Quem foi o principal criador de Elden Ring? ",
        alternativas: [
            {
                texto: "Hidetaka Miyazaki",
                afirmacao: [
                    "Certo",
                    ""
                ],
                proxima: 1,
            },
            {
                texto: "Hironobu Sakaguchi",
                afirmacao: [
                    "Errado",
                    ""
                ],
                proxima: 2,
            },
        ]
    },
    {
        enunciado: "Quem é o personagem principal do jogo?",
        alternativas: [
            {
                texto: "O Cavaleiro",
                afirmacao: [
                    "Errado",
                    "",
                    ""
                ],
                proxima: 3,
            },
            {
                texto: "O Sinluz (Tarnished)",
                afirmacao: [
                    "Certo",
                    "",
                    ""
                ],
                proxima: 4,
            },
        ]
    },
    {
        enunciado: "Qual desses é um dos principais chefes em Elden Ring?",
        alternativas: [
            {
                texto: "Gwyn, Lord of Cinder",
                afirmacao: [
                    "Errado",
                    "",
                    ""
                ],
                proxima: 3,
            },
            {
                texto: "Malenia, Blade of Miquella",
                afirmacao: [
                    "Certo",
                    "",
                    ""
                ],
                proxima: 4,
            },
        ]
    },
    {
        enunciado: "Qual é a natureza de Radahn, um dos grandes chefes do jogo?",
        alternativas: [
            {
                texto: "Um guerreiro gigante",
                afirmacao: [
                    "Certo",
                    ""
                ],
                proxima: 5,
            },
            {
                texto: "Um cavaleiro celestial",
                afirmacao: [
                    "Errado",
                    ""
                ],
                proxima: 6,
            },
        ]
    },
    {
        enunciado: "Qual renomado autor de fantasia colaborou com a FromSoftware para criar a lore de Elden Ring?",
        alternativas: [
            {
                texto: "George R. R. Martin",
                afirmacao: [
                    "Certo",
                    ""
                ],
                proxima: 5,
            },
            {
                texto: " J.K. Rowling",
                afirmacao: [
                    "Errado",
                    ""
                ],
                proxima: 6,
            },
        ]
    },
    {
        enunciado: "Qual é a função das Sites of Grace no jogo?",
        alternativas: [
            {
                texto: "Áreas seguras onde inimigos não podem atacar",
                afirmacao: [
                    "Errado",
                    ""
                ],
                proxima: 7,
            },
            {
                texto: "Pontos de recuperação de HP e FP, e lugares para subir de nível",
                afirmacao: [
                    "Certo",
                    ""
                ],
                proxima: 7,
            },
        ]
    },
    {
        enunciado: "Qual é o nome do mundo em que se passa Elden Ring?",
        alternativas: [
            {
                texto: " Drangleic",
                afirmacao: [
                    "Errado",
                    ""
                ],
                proxima: 7,
            },
            {
                texto: "The Lands Between",
                afirmacao: [
                    "Certo",
                    ""
                ],
                proxima: 7,
            },
        ]
    },
    {
        enunciado: "Qual dos seguintes jogos da FromSoftware possui referências e semelhanças notáveis com Elden Ring?",
        alternativas: [
            {
                texto: "Bloodborne",
                afirmacao: [
                    "Errado",
                    ""
                ],
            },
            {
                texto: " Dark Souls",
                afirmacao: [
                    "Certo",
                    "Temos um expert em Elden Ring por aqui!",
                    "Parábens jovem rapaz gamer!"
                ],
            },
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

botaoIniciar.addEventListener('click', iniciaJogo);

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
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacoes + " ";
    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = `Em 2049, ${nome}`;
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    caixaResultado.classList.add("mostrar");
    botaoJogarNovamente.addEventListener("click", jogaNovamente);
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
}

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}

substituiNome();