///<reference path="p5.d.ts" />

let guessesLeft = 7;
let lettersUsed = [" "];

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
  fill(0,255,0);
  haswon() ? text("You win, the word was \n '" + word.word + "'",width/2,height/1.3) : null;
  fill(255);
  stroke(255,100);
  drawBorder();
  drawMan()
  isDead();
  drawNotUsedLetters();
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
  createP(lettersUsed.length);
  let letterFound = false;
  let letterUsedBefore = false;
  for(let i = 0 ; i < lettersUsed.length ; i++) {
    if(str(lettersUsed[i]) == str(key)) {
      //lettersUsed.push(key.toLowerCase());
      letterUsedBefore = true;
    }
  }
  if(!letterUsedBefore) {
    lettersUsed.push(key.toLowerCase());
  }
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
  line(0,70,width/2,70);
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
  text("Hang Man Game",150,50)
}

function isDead() {
  if(guessesLeft <= 0) {
    noLoop();
    noStroke();
    fill(255,0,0);
    text("You lose, the word was \n '" + word.word + "'",width/2,height/1.3)
  }
}

function drawNotUsedLetters() {
  let allLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","æ","ø","å"];
  for(let i = 0 ; i < allLetters.length ; i++) {
    for (let j = 0; j < lettersUsed.length; j++) {
      if(allLetters[i] === lettersUsed[j]) {
        if(lettersUsed.indexOf(lettersUsed[j]) < 8) {
          text(allLetters[i],(lettersUsed.indexOf(lettersUsed[j])-1)*30+20,100);  
        } else if(lettersUsed.indexOf(lettersUsed[j]) >= 8 && lettersUsed.indexOf(lettersUsed[j]) < 16) {
          text(allLetters[i],(lettersUsed.indexOf(lettersUsed[j])-8)*30+20,150);  
        } else if(lettersUsed.indexOf(lettersUsed[j]) >= 16 && lettersUsed.indexOf(lettersUsed[j]) < 24){ 
          text(allLetters[i],(lettersUsed.indexOf(lettersUsed[j])-16)*30+20,200);  
        } else if(lettersUsed.indexOf(lettersUsed[j]) >= 24 && lettersUsed.indexOf(lettersUsed[j]) < 32){
          text(allLetters[i],(lettersUsed.indexOf(lettersUsed[j])-24)*30+20,250);  
        } else if(lettersUsed.indexOf(lettersUsed[j]) >= 32 && lettersUsed.indexOf(lettersUsed[j]) < 40){
          text(allLetters[i],(lettersUsed.indexOf(lettersUsed[j])-32)*30+20,300);  
        } else if(lettersUsed.indexOf(lettersUsed[j]) >= 40 && lettersUsed.indexOf(lettersUsed[j]) < 48){
          text(allLetters[i],(lettersUsed.indexOf(lettersUsed[j])-40)*30+20,350);  
        }
      }
    }
  }
}

