///<reference path="p5.d.ts" />

let guessesLeft = 7;

let word = {
  word: "",
  letters: [],
  guessed: [],
  pos: []
}

function setup() {
  createCanvas(600,600);
}

function stringToArray(str) {
  let arr = [];
  word.guessed = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i]);
    word.guessed.push(0);
  }
  return arr;
}

function draw() {
  background(51);
  if(word.word == "") {
    word.word = prompt("Enter a word");
    word.letters = stringToArray(word.word);
  } 
  drawLetters(255);
  textAlign(CENTER);
  textSize(31);
  haswon() ? text("You win, the word was \n '" + word.word + "'",width/2,height/1.3) : null;
  stroke(255,100);
  drawBorder();
  drawMan()
  isDead();
}

function drawLetters(color) {
  textAlign(CENTER);
  stroke(color,100);
  strokeWeight(4);
  let numOfLetters = word.letters.length
  word.pos = []
  for(let i = 0; i < width; i+= width/numOfLetters) {
    line(i+5,height-20,i+width/numOfLetters-5,height-20);
    word.pos.push(i)
  }
  for(let i = 0 ; i < word.letters.length ; i++) {
    if(word.guessed[i]) {
      textSize(map(word.letters.length,1,30,100,2));
      noStroke()
      fill(color)
      text(word.letters[i],word.pos[i]+width/numOfLetters-(width/numOfLetters/2),580)
    }
    if(word.letters[i] == " ") {
      word.guessed[i] = true;
      text("_",word.pos[i]+width/numOfLetters-(width/numOfLetters/2),580)
    }
  }
}

function keyTyped() {
  let letterFound = false;
  for(let i = 0 ; i < word.letters.length ; i++) {
    if(key.toLowerCase() === word.letters[i].toLowerCase()) {
      letterFound = true;
      word.guessed[i] = true;
    }
  }
  if(!letterFound) { 
    guessesLeft--;
    print(guessesLeft);
  }
}

function haswon() {
  for(let i = 0 ; i < word.guessed.length ; i++) {
    if(!word.guessed[i]) {
      return false;
    }
  }
  print(word);
  noLoop();
  return true;
}

function drawBorder() {
  stroke(255,100);
  strokeWeight(4);
  line(0,height/1.5,width,height/1.5);
  line(width/2,height/1.5,width/2,0);
}

function drawMan() {
  let C2 = createVector(width/2,height/1.5);
  let BC = createVector(C2.x+150,C2.y-175);
  stroke(255);
  strokeWeight(4);
  noFill();
  if(guessesLeft <= 7) {
    line(C2.x+150,C2.y-350,C2.x+150,0);
  }
  if(guessesLeft <= 6) {
    circle(C2.x+150,C2.y-300,100);
  }
  if(guessesLeft <= 5) {
    circle(C2.x+150,C2.y-175,150);
  }
  if(guessesLeft <= 4) {
    line(BC.x-50,BC.y+56,BC.x-50,BC.y+100);
  }
  if(guessesLeft <= 3) {
    line(BC.x+50,BC.y+56,BC.x+50,BC.y+100);
  }
  if(guessesLeft <= 2) {
    line(BC.x-50,BC.y-56,BC.x-100,BC.y);
  }
  if(guessesLeft <= 1) {
    line(BC.x+50,BC.y-56,BC.x+100,BC.y);
  }
  noStroke();
  fill(255)
  // display the number of guesses left
  textSize(31);
  text("Guesses Left: "+guessesLeft,width/2+115,height/1.3-70)
  
  textSize(100);
  text("Hang\nMan\nGame",150,100)
  textSize(31);
}

function isDead() {
  if(guessesLeft <= 0) {
    noLoop();
    noStroke();
    fill(255,0,0);
    text("You lose, the word was \n '" + word.word + "'",width/2,height/1.3)
  }
}