var engine = {
    "cores": ["green", "purple", "pink", "red", "yellow", "orange", "grey", "black", "white", "brown"],
    "hexadecimais": {
        "green": "#02ef00",
        "purple": "#790093",
        "pink": "#f02a7e",
        "red": "#e90808",
        "yellow": "#e7d703",
        "orange": "#f16529",
        "grey": "#ebebeb",
        "black": "#141414",
        "white": "#fff",
        "brown": "#964b00",
    },
    "moedas": 0
}

const audioMoeda = new Audio("audio/moeda.mp3");
const audioErrou = new Audio("audio/errou.mp3");

function sortearCor(){
    var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
    var legendaCorDaCaixa = document.getElementById("cor-caixa");
    var nomeCorSorteada = engine.cores[indexCorSorteada];

    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();

    return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor){
    var caixaDasCores = document.getElementById("cor-atual");

    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage = "url('./img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";
}

function atualizaPontuacao(valor){
    var pontuacao = document.getElementById("pontuacao-atual");

    engine.moedas += valor;

    if(valor < 0){
        audioErrou.play();
    }
    else{
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor());

// API de reconhecimento de voz
var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respostaCorreta = "";

if(window.SpeechRecognition || window.webkitSpeechRecognition){
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "en-US";

    gravador.onstart = function(){
        btnGravador.innerText = "Estou ouvindo";
        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    }

    gravador.onend = function(){
        btnGravador.innerText = "Responder";
        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";
    }

    gravador.onresult = function(event){
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById("cor-caixa").innerText.toUpperCase();

        if(transcricaoAudio === respostaCorreta){
            atualizaPontuacao(1);
        }
        else{
            atualizaPontuacao(-1);
        }

        aplicarCorNaCaixa(sortearCor());
        console.log(transcricaoAudio);
    }
}
else{
    alert("Seu navegador não tem suporte");
}

btnGravador.addEventListener("click", function(e){
    gravador.start();
})