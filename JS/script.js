// Funções utilitárias
const idElemento = (id) => document.getElementById(id);
const valorElemento = (id) => idElemento(id).value;
const valorNumero = (id) => Number(valorElemento(id));
const isNegativo = (id) => valorNumero(id) < 0;

// Número entre 1 e 100
let numberSecret = Math.floor(Math.random() * 100) + 1;
console.log(numberSecret);
let tentativas = 10;
idElemento("tentativas-jogador").textContent = tentativas;

// Restaura a formatação inicial quando o jogador digita novamente no input
idElemento("numero").addEventListener("input", () => {
  idElemento("resultado").style.display = "none";
  idElemento("dicas").style.display = "flex";
  idElemento("tentativas").style.display = "flex";
});

// Função referente ao botão chutar
idElemento("btn").addEventListener("click", () => {
  const palpiteJogador = valorNumero("numero");

  // validações
  // verificando se o valor do input é negativo ou está acima de 100
  if (isNegativo("numero")) {
    idElemento("resultado").style.display = "flex";
    idElemento("dicas").style.display = "none";
    idElemento("tentativas").style.display = "none";
    idElemento("resultado-jogador").textContent =
      "Valor inválido! Por favor, insira um valor positivo";
    return;
  } else if (palpiteJogador > 100) {
    idElemento("resultado").style.display = "flex";
    idElemento("dicas").style.display = "none";
    idElemento("tentativas").style.display = "none";
    idElemento("resultado-jogador").textContent =
      "Valor inválido! Por favor, insira um valor entre 1 e 100";
    return;
  }

  // se acertou
  if (palpiteJogador === numberSecret) {
    idElemento("resultado").style.display = "flex";
    idElemento("dicas").style.display = "none";
    idElemento("tentativas").style.display = "none";

    // se acertar na primeira tentativa
    if (tentativas === 10) {
      idElemento("resultado-jogador").innerHTML =
        "Parabéns!! Você acertou na primeira tentativa!";
    // quando ele acertar vai aparecer quantas tentativas restavam
    } else {
      idElemento(
        "resultado-jogador"
      ).innerHTML = `Parabéns!! Você acertou faltando ${tentativas} tentativa!`;
    }

    setTimeout(() => {
      // reinicia jogo
      numberSecret = Math.floor(Math.random() * 100) + 1;
      console.log(numberSecret);
      tentativas = 10;
      idElemento("tentativas-jogador").textContent = tentativas;
      idElemento("resultado").style.display = "none";
      idElemento("dicas").style.display = "flex";
      idElemento("tentativas").style.display = "flex";
      idElemento("dicas-jogador").textContent = "";
      idElemento("numero").value = "";
    }, 3000);

    return; // não precisa continuar
  }

  // se errou
  tentativas--;
  idElemento("tentativas-jogador").textContent = tentativas;

  // verifica se acabou as tentativas
  if (tentativas === 0) {
    idElemento("resultado").style.display = "flex";
    idElemento("dicas").style.display = "none"; // esconde as dicas
    idElemento("dicas-jogador").textContent = ""; // limpa texto de dica
    idElemento("tentativas").style.display = "none";
    idElemento("resultado-jogador").innerHTML =
      "Game Over! Suas tentativas acabaram!<br/>O número secreto era " +
      numberSecret;

    setTimeout(() => {
      // reinicia jogo
      numberSecret = Math.floor(Math.random() * 100) + 1;
      console.log(numberSecret);
      tentativas = 10;
      idElemento("tentativas-jogador").textContent = tentativas;
      idElemento("resultado").style.display = "none";
      idElemento("dicas").style.display = "flex";
      idElemento("tentativas").style.display = "flex";
    }, 3000);
    return;
  }

  // mostra dica se ainda tiver tentativas
  if (palpiteJogador > numberSecret) {
    idElemento("dicas-jogador").textContent = "Tente com um número MENOR";
  } else {
    idElemento("dicas-jogador").textContent = "Tente com um número MAIOR";
  }
});
