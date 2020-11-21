var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

var fox, fox_running,fox_collided;
var food, foodImage;
var obstacle, obstacleImage;
var ground, groundImage;
var invisibleGround;
var star, starImage;
var moon, moonImage;

function preload() {
  fox_running = loadAnimation("fox_4.png", "fox_3.png", "fox_2.png", "fox_1.png", "fox_0.png");
  fox_collided = loadAnimation("fox_4.png");
  foodImage = loadImage("bone.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.png");
  starImage = loadImage("star.png");
  moonImage = loadImage("moon.png");
}

function setup() {
  createCanvas(600, 400);



  ground = createSprite(210, 240, 400, 20);
  ground.addImage("ground", groundImage);
  ground.velocityX = -6;

  fox = createSprite(50, 330, 10, 10);
  fox.addAnimation("running", fox_running);
  fox.scale = 0.5
  fox.setCollider("rectangle",0,0,fox.width,fox.height);
   fox.debug = false;

  invisibleGround = createSprite(200, 370, 400, 10);
  invisibleGround.visible = false;

  moon = createSprite(550, 35);
  moon.addImage("moon", moonImage);
  moon.scale = 0.4

  score = 0;

  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  starGroup = createGroup();

}

function draw() {
  background("#663399");


  text("Score: " + score, 50, 50);

  if (gameState === PLAY) {

    ground.velocityX = -(4 + 3 * score / 100)

    score = score + Math.round(getFrameRate() / 60);

    if (ground.x < 200) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && fox.y >= 300) {
      fox.velocityY = -12;
    }


    fox.velocityY = fox.velocityY + 0.8
    
    
     if (obstaclesGroup.isTouching(fox)) {
    gameState = END;
  }
    
  } else if (gameState === END) {

    text("GAME OVER!!",300,200)
    
    ground.velocityX = 0;
    fox.velocityY = 0;


    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
    
    

  }

  fox.collide(invisibleGround);

  obstacles();
  Food();
  Star();
  drawSprites();
}

function obstacles() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(600, 350, 60, 60);
    obstacle.x = Math.round(random(400, 370));
    obstacle.velocityX = -5
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.16;
    obstacle.lifetime = 70;
    obstaclesGroup.add(obstacle);
  }

}

function Star() {
  if (frameCount % 60 === 0) {
    var star = createSprite(600, 120, 60, 60);
    star.y = Math.round(random(80, 120));
    star.velocityX = -5
    star.addImage("star", starImage);
    star.scale = 0.12;
    star.lifetime = 120;
    starGroup.add(star);
  }

}

function Food() {
  if (frameCount % 100 === 0) {
    var food = createSprite(600, 300, 60, 60);
    food.y = Math.round(random(200, 300));
    food.velocityX = -5
    food.addImage("food", foodImage);
    food.scale = 0.2;
    food.lifetime = 120;
    foodGroup.add(food);
  }

}
