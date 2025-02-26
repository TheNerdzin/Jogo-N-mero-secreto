let listaDeNumerosSorteados = []
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 01 e 10');

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 01 e 10');
}
exibirMensagemInicial()// Toda função deve ser chamada , obrigatoriamente , fora da função

function verificarChute() {
    //Recebe o valor pois usa o campo imput e value para pegar o valor
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns')
        let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`;
        let mensagensTentativas = `Você encontrou o número secreto com ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensagensTentativas)
        //Aqui vai afetar o botão novo Jogo, 
        // getElemenById vai agir sobre o id, nesse caso do botão, 
        // que deve ser escrito igualmente
        //remove.Attribute: Remove atributos, no caso [disabled] do botão, que está na parte html
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O Numero é menor')
    } else {
        exibirTextoNaTela('p', 'O Número é maior')
    }
    tentativas++;
    limpaCampo()
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];

    }
    // vai usar numero da lista caso já tenha saído o numero, ela retorna com um novo
    //o mesmo numero não é sorteado duas vezes
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}
//Apos cada numero errado o campo automaticamente limpa
function limpaCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limpaCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)// setAttrinute(Estaus, verdadeiro ou falso), no caso , tue pois que que seja disable   
}