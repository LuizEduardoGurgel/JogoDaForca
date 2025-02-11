const listaPalavras = ["vida", "jogo", "escola", "trabalho", "hospital", "preto", "branco", "carrro", "pessoa",
                        "trator", "amigo", "colega", "estudar", "correr", "maratona", "livro", "celular",
                        "computador", "consertar", "livro", "aluno", "ganhar", "achar", "perder", "nuvem",
                        "sol", "planeta", "terra", "praia", "piscina", "esporte", "lazer", "construir", "poder"];
let palavraEscolhida = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
let letrasAdivinhadas = [];
let tentativas = 6;

function exibirPalavra() {
    const containerPalavra = document.getElementById('containerPalavra');
    containerPalavra.innerHTML = palavraEscolhida
        .split('')
        .map(letra => (letrasAdivinhadas.includes(letra) ? letra : '_'))
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
        divLetra.addEventListener('click', () => adivinharLetra(letra));
        containerLetras.appendChild(divLetra);
    }
}

function adivinharLetra(letra) {
    if (!letrasAdivinhadas.includes(letra) && tentativas > 0) {
        letrasAdivinhadas.push(letra);
        if (!palavraEscolhida.includes(letra)) {
            tentativas--;
            document.getElementById('mensagem').textContent = `Tentativas restantes: ${tentativas}`;
        }
        atualizarJogo();
    }
}

function atualizarJogo() {
    exibirPalavra();
    const letras = document.querySelectorAll('.letra');
    letras.forEach(divLetra => {
        if (letrasAdivinhadas.includes(divLetra.textContent)) {
            divLetra.classList.add(palavraEscolhida.includes(divLetra.textContent) ? 'correta' : 'errada');
        }
    });
    if (tentativas === 0) {
        document.getElementById('mensagem').textContent = `Game Over! A palavra era: ${palavraEscolhida}`;
    } else if (palavraEscolhida.split('').every(letra => letrasAdivinhadas.includes(letra))) {
        document.getElementById('mensagem').textContent = 'Parabéns! Você venceu!';
    }
}

window.onload = () => {
    exibirPalavra();
    exibirLetras();
};