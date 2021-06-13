var player,player_running;
var obstacleGroup,obstacleimage;
var bananaGroup,bananaimage;
var scene,sceneimage;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score;
function preload(){
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_10.png");
 bananaimage=loadImage("banana.png");
  obstacleimage=loadImage("stone.png");
sceneimage=loadImage("jungle.jpg");


}
function setup() {
  createCanvas(displayWidth-20, displayHeight-20);
  scene=createSprite(width/2,height/2,width,height);
  scene.addImage(sceneimage);
  scene.scale=2;
  scene.x=scene.width/2;
  scene.velocityX=-4;
  
  player=createSprite(100,height-80);
  player.addAnimation("running",player_running);
  player.scale=0.2;
  
  ground=createSprite(width,height-45,width*2,10);
  ground.velocityX=-6;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  score=0;
  }

function draw() {
  background(220);
  camera.position.x=player.x
  
  if(gameState===PLAY){
    if(keyDown("space")){
     player.velocityY=-10; 
    }
   if(ground.x<0){
     ground.x=ground.width/2;
   }
    if(scene.x<0){
      scene.x=scene.width/2;
    }
    player.velocityY=player.velocityY+0.6;
    player.collide(ground);
     spawnbanana();
  spawnobstacle();
    if(bananaGroup.isTouching(player)){
     score=score+2; 
     bananaGroup.destroyEach();  
    }
    
    if(obstacleGroup.isTouching(player)) {
       player.scale=0.08;
    }
  }
  
  
    
  
 
  
  switch(score){
    case 10:player.scale=0.12;
            break;
    case 20:player.scale=0.14; 
            break;
    case 30:player.scale=0.16;
            break;
    case 40:player.scale=0.18;
            break;
    default:break;
  }
  drawSprites();
  textSize(30)
  strokeWeight(10);
  fill("black");
  text("Score:"+score,100,100);
}
function spawnbanana() {
  if(frameCount % 80===0){
    banana=createSprite(width/2,height-70,20,20);
    banana.y=Math.round(random(height/2+20,height/2+50));
    banana.addImage(bananaimage);
    banana.scale=0.08;
    banana.velocityX=-3;
    banana.lifetime=200;
    banana.depth=player.depth;
    bananaGroup.add(banana);
  }
}
function spawnobstacle() {
  if(frameCount%90===0){
    obstacle=createSprite(width/2-50,height-50,20,20);
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleimage);
    obstacle.scale=0.18;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
    
  }
}