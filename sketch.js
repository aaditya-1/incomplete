
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var dog;
var database;
var food;
var foodStock;
var foodx;
var position;
var pos;
var feedTime;

var feed, add;

var bottle = [];
var pox = 0;

var feed_time_database;
var time;
// function preload()
// {

// }

function setup() {

  createCanvas(1000, 700);

  engine = Engine.create();
  world = engine.world;

  feedTime = hour();
  // database = firebase.database();
  database = firebase.database();

  dog = new Dog(width / 2, height / 2);
  Engine.run(engine);


  foodStock = database.ref("food");
  foodStock.on("value", readData);

  feed_time_database = database.ref("feedTime/feedTime");
  feed_time_database.on("value", readTime);

  feed = createButton("Feed the dog");
  feed.position(500, 20);
  feed.mousePressed((food) => {

    if (foodx <= 0) {
      foodx = 0;

    } else {
      foodx = foodx - 1;
    }

    database.ref("/").update({ food: foodx });
    updateTime();

  });


  add = createButton("Add food");
  add.position(430, 20);
  add.mousePressed((food) => {

    foodx = foodx + 1;
    bottle.push(new Food());

    database.ref("/").update({
      food: foodx
    })

  });




}


function draw() {
  // resizeCanvas(windowWidth, windowHeight);

  rectMode(CENTER);
  background(46, 148, 87);

  dog.keyPressed();


  dog.display();

  fill("yellow")
  noStroke();
  textSize(20);
  text("Food Left " + food, 600, 37);
  text("last fed " + time, 200, 37);

  for (var i = 0; i < bottle.length; i++) {
    bottle[i].display();
  }

  // bottle.display();

}

function move(xoff, yoff) {
  dog.body.position.x = dog.body.position.x + xoff;
  dog.body.position.y = dog.body.position.y + yoff;

}



function readData(data) {
  food = data.val();
  foodx = food;

}

function readTime(data) {
  time = data.val();
}

function updateTime() {
  database.ref("feedTime").update({ feedTime: hour() });
}