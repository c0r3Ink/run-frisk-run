var dino,dinoImg,dinoF;
var paredes;
var chao; 
var chaoImg;
var chaofake;
var nuvem;
var nuvemImg;
var cacto;
var score = 0;
var grupoCacto;
var grupoNuvem;
var gameOver2;
var core;
var music;

var gameOver, gameOverImg;
var restart, restartImg;

var JOGAR = 0;
var FIM = 1;
var modo = JOGAR;

function preload(){
  //pré carrega os arquivos 
  //som, imagem, etc
 
  dinoImg = loadAnimation("frisk1.png","frisk2.png");
  dinoF = loadImage("trex_collided.png");
  chaoImg = loadImage("chao.png");
  
  cactoImg = loadImage("flowey1.png");
  cactoImg2 = loadImage("flowey2.png");
  cactoImg3 = loadImage("flowey3.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  checkPoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  pular = loadSound("jump.mp3");
  gameOver2 = loadImage("gameOver.jpg");
  core = loadImage("heart.png");
  stars = loadImage("stars.png");
  music = loadSound("quietwater.mp3");
  

}

function setup(){
  //função de configuração

  //tamanho da tela
  createCanvas(1000,600)

  chao = createSprite(width/2,height/2+2);
  chao.addImage(chaoImg);
  chao.x = chao.width/2;
  chao.scale = 1;
  
  chao2 = createSprite(width/2,height/2-100);
  chao2.addImage(stars);
  chao2.x = chao2.width/2;
  chao2.scale = 1;
  chao2.velocityX=-3;

  dino = createSprite(50,height-100,10,10);
  dino.addAnimation("running",dinoImg);
  dino.scale = 0.2;
  dino.mirrorX(-1);

  dino.addImage("F",dinoF);

  chaofake = createSprite(width/2,height-70,width,20);
  chaofake.visible = false;

  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart = createSprite(width/2,height/2+70);
  restart.addImage(restartImg);
  restart.visible = false;

  //randomizaçao de numeros
  var teste = Math.round(random(1,10))
  console.log(teste)

  grupoCacto = new Group()

  grupoNuvem = new Group()

  paredes = createEdgeSprites();



  imageMode(CENTER);
}

function draw(){
  background('white');

  if(!music.isPlaying()){
    music.play();
    music.setVolume(0.3);
  }
  
  textSize(14);
  fill("black");
  text("score: " + score,width-100,20);
 
  if(modo === JOGAR) {
    score = score + Math.round(frameRate() / 60);
                     //ou dino.isTouching(chao)
    if(keyDown("space") && dino.y > 478){
      
      dino.velocityY = -11;
      pular.play();
    }
console.log(dino.y)
    if(chao.x < 0) {
      chao.x = chao.width/2;
    }

    if(chao2.x < 0) {
      chao2.x = chao2.width/2;
    }

      //gravidade
  dino.velocityY = dino.velocityY + 0.8;
  chao.velocityX = -(5 + score/100);
  dino.collide(paredes[3]);
  dino.collide(chaofake);


  
 
  spawn_cacto();
 
  if(dino.isTouching(grupoCacto)) {
    modo = FIM;
    die.play();
    //dino.velocityY = -10;   inteligencia artificial
    //pular.play();
  }

  drawSprites();

  } else if(modo === FIM) {
    chao.velocityX = 0;
    dino.changeAnimation("F");
    dino.velocityY = 0;
   
    grupoCacto.setVelocityXEach(0);
    grupoCacto.setLifetimeEach(-1);
   

  
    background("black");
    image(gameOver2,width/2,height/2,500,300);
    image(core,width/2,height/2+200,100,100);

    if(keyDown("r")) {
      reset();
    }

    fill("white")
    textSize(25);
    text("Pressione R para reiniciar",width/2-150,height-10);

  }

 
}



function spawn_cacto() {
    
if(frameCount %60 === 0){
  cacto =  createSprite(width+10,height-100,20,20);
  cacto.velocityX = -(5 + score/100);
  cacto.scale = 0.13
  cacto.debug= false;
  cacto.setCollider("circle",0,0,150);
  
  var ajudante = Math.round(random(1,3));
  switch(ajudante){
    case 1: cacto.addImage(cactoImg);
    break;
    case 2: cacto.addImage(cactoImg2);
    break;
    case 3: cacto.addImage(cactoImg3);
    break;
    


   }

  cacto.lifetime = width;

  grupoCacto.add(cacto);

}  

}

function reset() {
  modo = JOGAR
  grupoCacto.destroyEach();
  
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  dino.changeAnimation("running");
} 
