///<reference path="p5.d.ts" />

let word = {
  letters: [],
  guessed: [0,1,0,0,1],
  pos: []
}
function setup() {
  createCanvas(600,600);
  word.letters = stringToArray("hello")
}

function stringToArray(str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i]);
  }
  return arr;
}

function draw() {
  background(51);
  drawLetters(255);
}

function drawLetters(color) {
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
      textSize(62)
      noStroke()
      fill(color)
      text(word.letters[i],word.pos[i]+width/numOfLetters/3.3,580)
    }
  }
}