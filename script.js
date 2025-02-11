const listaPalavras = [
    "ferro", "fornalha", "pedra", "bigorna", "redstone", "carvao", "quartz", 
    "enxada", "aldeao", "trigo", "lobo", "papagaio", "livro", "diamante", "netherite", 
    "gato", "bussola", "pistao", "tnt", "afiação", "mapa", "esmeralda", "enderman", 
    "sela", "peixe", "tocha", "terra", "areia", "caldeirão", "tridente", "slime", "madeira", "picareta", "pa", "espada", "Lapis lazuli"
];

let palavraEscolhida, letrasAdivinhadas, tentativas;

function iniciarJogo() {
    palavraEscolhida = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    letrasAdivinhadas = [];
    tentativas = 6;
    
    document.getElementById('mensagem').textContent = "";
    document.getElementById('btnReiniciar').style.display = "none"; // Esconde o botão de reinício
    
    exibirPalavra();
    exibirLetras();
    atualizarBackground(tentativas);
}

function exibirPalavra() {
    const containerPalavra = document.getElementById('containerPalavra');
    containerPalavra.innerHTML = palavraEscolhida
        .split('')
        .map(letra => (letrasAdivinhadas.includes(letra) || letra === ' ' ? letra : '_'))
        .join(' ');
}

function exibirLetras() {
    const containerLetras = document.getElementById('containerLetras');
    containerLetras.innerHTML = '';

    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i).toLowerCase();
        const divLetra = document.createElement('div');
        divLetra.className = 'letra';
        divLetra.textContent = letra;
        divLetra.addEventListener('click', () => adivinharLetra(letra, divLetra));
        containerLetras.appendChild(divLetra);
    }
}

function adivinharLetra(letra, divLetra) {
    if (!letrasAdivinhadas.includes(letra) && tentativas > 0) {
        letrasAdivinhadas.push(letra);

        if (palavraEscolhida.includes(letra)) {
            divLetra.classList.add('correta');
        } else {
            tentativas--;
            divLetra.classList.add('errada');
            document.getElementById('mensagem').textContent = `Tentativas restantes: ${tentativas}`;
        }

        atualizarJogo();
    }
}

function atualizarBackground(tentativas) {
    const body = document.body;
    const newBackground = `url(./img/back${6 - tentativas}.png)`;

    // Adiciona a classe "loading" para evitar fundo branco durante a troca
    body.classList.add('loading');

    // Aplica a nova imagem de fundo com transição
    setTimeout(() => {
        body.style.backgroundImage = newBackground;
        body.classList.remove('loading'); // Remove a classe "loading" após a troca
    }, 100); // Delay de 100ms para evitar visualização do fundo branco
}

function atualizarJogo() {
    exibirPalavra();
    atualizarBackground(tentativas);

    if (tentativas === 0) {
        document.getElementById('mensagem').textContent = `Game Over! A palavra era: ${palavraEscolhida}`;
        finalizarJogo();
    } else if (palavraEscolhida.split('').every(letra => letra === ' ' || letrasAdivinhadas.includes(letra))) {
        document.getElementById('mensagem').textContent = 'Parabéns! Você venceu!';
        finalizarJogo();
    }
}

function finalizarJogo() {
    document.querySelectorAll('.letra').forEach(divLetra => divLetra.style.pointerEvents = 'none');
    document.getElementById('btnReiniciar').style.display = "block"; // Mostra o botão de reinício
}

// Reinicia o jogo ao clicar no botão
document.getElementById('btnReiniciar').addEventListener('click', iniciarJogo);

window.onload = iniciarJogo;
