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
  for(let i = 0 ; i < word.letters.length ; i++) {
    if(key.toLowerCase() === word.letters[i].toLowerCase()) {
      word.guessed[i] = true;
    }
  }
}

function haswon() {
  for(let i = 0 ; i < word.guessed.length ; i++) {
    if(!word.guessed[i]) {
      return false;
    }
  }
  print(word);
  return true;
}
