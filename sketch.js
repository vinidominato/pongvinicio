//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;


//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//colisao
let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let trilha
let ponto;

//erro do oponente
let chanceDeErrar = 0;

//execução de sons
function preload(){
  trilha = loadSound("trilha.wav");
  ponto = loadSound("ponto.wav");
  raquetada = loadSound("raquetada.wav");
}

//dimensões e cor do fundo da tela
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//chamada de funções
function draw() {
  background(0);
  mostraBolinha ();
  movimentaBolinha ();
  verificaColisaoBorda();
  mostraRaquete (xRaquete, yRaquete);
  mostraRaquete (xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaqueteOponente(); 
  colisaoMinhaRaqueteBiblioteca ();
  incluiPlacar();
  marcaPonto();  
  
}

//desenho da bolinha
function mostraBolinha (){ 
  circle(xBolinha , yBolinha, diametro); 
}

//movimento da bolinha
function movimentaBolinha(){ //movimento da bolinha
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

//colisão com a borda
function verificaColisaoBorda(){ 
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1; 
  }
  if (yBolinha + raio > height || yBolinha - raio <0){
    velocidadeYBolinha *= -1; 
  }
}

//nossa raquete
function mostraRaquete (x, y){
    rect (x, y, raqueteComprimento, raqueteAltura)

}

//movimento da raquete do jogador
function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;

//limitar a movimentação da raquete do jogador para que não ultrapasse as bordas
    yRaquete = constrain(yRaquete, 10, height - raqueteAltura - 10);
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;

//limitar a movimentação da raquete do jogador para que não ultrapasse as bordas
    yRaquete = constrain(yRaquete, 10, height - raqueteAltura - 10);
    
  }
}
//colisao da raquete
function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento
        && yBolinha - raio < yRaquete + raqueteAltura
        && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
            }
}
//colisao minha raquete
function colisaoMinhaRaqueteBiblioteca (){
  colidiu = collideRectCircle(xRaquete, yRaquete,raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    
  }
}

//movimentação da raquete do oponente
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  
//limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaqueteOponente = constrain(yRaqueteOponente, 10, height - raqueteAltura - 10);
}

//calculo com chance de erro
function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

//verificação de colisao de raquete do oponente
function verificaColisaoRaqueteOponente() {
  if (xBolinha + raio > xRaqueteOponente &&
    yBolinha - raio < yRaqueteOponente + raqueteAltura &&
    yBolinha + raio > yRaqueteOponente) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
//placar
function incluiPlacar() {
      fill(255);
      textSize(32);
      text(meusPontos, 250, 40);
      text(pontosDoOponente, 310, 40);
}

//pontuação
function marcaPonto() {
  if (xBolinha + raio > width) {
    meusPontos += 1;
    resetBolinha();
    resetRaquetes();
    ponto.play();
  }
  
//ajuste a condição para marcar ponto quando a bolinha cruzar completamente a borda esquerda
  if (xBolinha - raio < 0) {
    pontosDoOponente += 1;
    resetBolinha();
    resetRaquetes();
    ponto.play();
    }
}

//reinicie a posição da bolinha para o centro da tela
function resetBolinha() {
  
  xBolinha = width / 2;
  yBolinha = height / 2;
}

//reinicia a posição das raquetes
function resetRaquetes() {
  yRaquete = height / 2 - raqueteAltura / 2;
  yRaqueteOponente = height / 2 - raqueteAltura / 2;
}