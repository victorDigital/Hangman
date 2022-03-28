///<reference path="p5.d.ts" />

let guessesLeft = 10;

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
  haswon() ? text("you win, the word was \n '" + word.word + "'",width/2,height/1.3) : null;
  stroke(255,100);
  drawBorder();
  drawMan()
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
  stroke(255,100);
  strokeWeight(10);
  //point(C2.x,C2.y);
  if(guessesLeft <= 9) {
    circle(C2.x+150,C2.y-300,100);
  }
}