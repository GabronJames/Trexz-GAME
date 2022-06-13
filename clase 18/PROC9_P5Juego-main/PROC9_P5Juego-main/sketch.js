var trex,treximg
var piso,pisoimg,piso2
var cloudimg
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var state = "playing"
var grupodeobstacles 
var grupodenubes
var treximgchoca
var gameOver1 
var Reset,Resetimg
var Score = 0

function preload(){
  treximg = loadAnimation("Sprites/trex1.png","Sprites/trex3.png","Sprites/trex4.png")

  pisoimg = loadImage ("Sprites/ground2.png")

  cloudimg = loadImage ("Sprites/cloud.png")

  obstacle1 = loadImage ("Sprites/obstacle1.png")

  obstacle2 = loadImage ("Sprites/obstacle2.png")

  obstacle3 = loadImage ("Sprites/obstacle3.png")

  obstacle4 = loadImage ("Sprites/obstacle4.png")

  obstacle5 = loadImage ("Sprites/obstacle5.png")

  obstacle6 = loadImage ("Sprites/obstacle6.png")

  treximgchoca = loadImage ("Sprites/trex_collided.png")

  gameOver1 = loadImage ("Sprites/gameOver.png")

  Resetimg = loadImage ("Sprites/restart.png")
}


function setup() {
  Reset = createSprite (1000,370)
  gameOver = createSprite (1000,300)
  Reset.addImage("Resetimg",Resetimg)
  gameOver.addImage("gameOver1",gameOver1)
  Reset.scale = 1
  gameOver.scale = 2
  gameOver.visible = false
  Reset.visible = false
  createCanvas(width/2,height/2);
  trex = createSprite (50,height -500,width/2,20)
  trex.addAnimation("trexcorre",treximg)
  trex.addImage("trex_collide",treximgchoca)
  trex.scale = 0.7
  trex.setCollider ("circle",0,0,50)

  piso = createSprite (width/2,height -500,width/2,200)
  piso.addImage("pisodesierto",pisoimg)

  piso2 = createSprite (width/4,height -400,width,300)
  piso2.scale = 0.5
  piso2.visible = false

  grupodenubes = new Group();
  grupodeobstacles = new Group();
  

}


function draw() 
{
  background(rgb(135, 206, 250));
  drawSprites ()
  console.log("trex",trex.y)
  trex.collide (piso2)

  textSize (15)
  fill("black")
  text ("Score: "+ Score,505,25)

  if (state === "playing"){

    if (frameCount %1 === 0){
    Score += 1
    }
    if (touches.lenght > 0 || keyDown ("space") && trex.y >= height/2 - 50){
      trex.velocityY = -9.5
      touches = [] 
      
    }
    trex.velocityY += 0.5
    piso.velocityX = -(9 + 2 * Score/500)
    console.log (piso.velocityX)

    if (piso.x <0){
     piso.x = piso.width/2
    }
    popNube();
  
    obstacles();

    if (grupodeobstacles.isTouching(trex)){

    state = "gameOver"
    }
   

  }



  if (state === "gameOver"){

restart ();
}
}

function popNube(){
  if (frameCount %100 === 0){
  var popNubee
  popNubee = createSprite (width,height -500 ,20,20)
  popNubee.y = Math.round(random(10,90))
  popNubee.x = Math.round(random(2000,2333))
  popNubee.velocityX = -(9 + 2 * Score/500)
  popNubee.addImage(cloudimg)
  trex.depth = popNubee.depth 
  trex.depth = trex.depth + 1 
  popNubee.lifetime = 500
  grupodenubes.add(popNubee)
}
}

function obstacles(){
  if (frameCount %100 === 0){
  var obstacle
 obstacle = createSprite (width,height -500 ,20,20)
 obstacle.velocityX = -(9 + 2 * Score/500)
obstacle.scale = 0.74
obstacle.lifetime = 225
 var numeroAleatorio = Math.round(random(1,6))


 switch(numeroAleatorio){

  
 case 1:obstacle.addImage(obstacle1)
break

case 2:obstacle.addImage(obstacle2)
break

case 3:obstacle.addImage(obstacle3)
break

case 4:obstacle.addImage(obstacle4)
break

case 5:obstacle.addImage(obstacle5)
break

case 6:obstacle.addImage(obstacle6)
break

default:break
 }
 grupodeobstacles.add(obstacle)  

}
}

function restart (){
  Reset.visible = true
  gameOver.visible = true
  piso.velocityX = 0
  trex.velocityY = 0
  grupodeobstacles.setVelocityXEach (0)  
  grupodenubes.setVelocityXEach (0) 
  trex.changeImage("trex_collide",treximgchoca)
  trex.velocityY = 10
  
  
 

if (mousePressedOver(Reset)){
  state = "playing"
  Reset.visible = false
  gameOver.visible = false
  grupodeobstacles.destroyEach()
  grupodenubes.destroyEach()
  trex.changeAnimation("trexcorre",treximg)
  Score = 0
}

}





