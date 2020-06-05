const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);
    bird = new Bird(200,50);
    box1 = new Box(640,320,150,200);
    box2 = new Box(940,320,150,200);
    log1 = new Log(740,310,150,250);
    log2 =  new Log(1040,310,150,250);
    pig1 = new Pigm(720, 220);
    pig2 = new Pigv(1020, 220);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    
    pig1.score();
    log1.display();
    
    pig2.score();
    log2.display();
    pig2.display();
    bird.display();
    platform.display();
    slingshot.display();   
    pig1.display(); 
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
     }
}


function mouseReleased(){
    slingshot.flyhigh();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed<0.5){
        bird.trajectory = []
        Matter.Body.setPosition(bird.body,{x:200,y:50});
        Matter.Body.setAngle(bird.body,0);
        slingshot.attach(bird.body);
      }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/school.png";
    }
    else{
        bg = "sprites/home.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}