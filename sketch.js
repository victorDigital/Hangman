///<reference path="p5.d.ts" />

let allLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let guessesLeft = 7;
let lettersUsed = [" "];
let diff;
let word = {
  word: "",
  letters: [],
  guessed: [],
  pos: []
}

function setup() {
  diff = createSelect();
  diff.position(width/2,height+300);
  diff.option("Very easy");
  diff.option("Easy");
  diff.option("Normal");
  diff.option("Hard");
  diff.option("Insane");
  diff.option("IMPOSSIBLE");
  diff.changed(resetgame);
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
  background(0);
  drawButtons();
  if(word.word == "") {
    word.word = wordList[floor(random(wordList.length))];
    //prompt("Enter a word");
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
  strokeWeight(4);
  let numOfLetters = word.letters.length
  word.pos = []
  for(let i = 0; i < width; i+= width/numOfLetters) {
    word.pos.push(i)
  }
  for(let i = 0 ; i < word.letters.length ; i++) {
    stroke(color,100);
    if(word.guessed[i]) {
      stroke(0,255,0);
    }
    line(word.pos[i]+5,height-20,word.pos[i]+width/numOfLetters-5,height-20);
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
  //noLoop();
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
    //noLoop();
    noStroke();
    fill(255,0,0);
    text("You lose, the word was \n '" + word.word + "'",width/2,height/1.3)
  }
}

function drawNotUsedLetters() {
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

function hintButton() {

  if(mouseX > width-50 && mouseX < width && mouseY > 0 && mouseY < 50) {
    print(word.guessed)
    let lettersNotGuessedIndex = [];
    for(let i = 0 ; i < word.guessed.length ; i++) {
      if(!word.guessed[i]) {
        lettersNotGuessedIndex.push(i);
      }
    }
    guessesLeft -= 2;
    let randomIndex = floor(random(lettersNotGuessedIndex.length));
    word.guessed[lettersNotGuessedIndex[randomIndex]] = true;
  }
}

function retryButton() {
  if(mouseX > width-50 && mouseX < width && mouseY > 50 && mouseY < 100) {
    console.log("retry");
    guessesLeft = 7;
    word.word = wordList[floor(random(wordList.length))];
    word.letters = stringToArray(word.word);
    lettersUsed = [];
  }
}

function resetgame() {
  let nextWordLength = {min:5,max:10};
  if(diff.value() === "Very easy") {nextWordLength.min = 3, nextWordLength.max = 5}
  if(diff.value() === "Easy") {nextWordLength.min = 5, nextWordLength.max = 7}
  if(diff.value() === "Normal") {nextWordLength.min = 5, nextWordLength.max = 10}
  if(diff.value() === "Hard") {nextWordLength.min = 10, nextWordLength.max = 20}
  if(diff.value() === "Very hard") {nextWordLength.min = 20, nextWordLength.max = 30}
  if(diff.value() === "IMPOSSIBLE") {nextWordLength.min = 30, nextWordLength.max = 100}

  print(nextWordLength.min, nextWordLength.max)
  let wordFound = false;
  while(!wordFound) {
    word.word = wordList[floor(random(wordList.length))];
    if(word.word.length >= nextWordLength.min && word.word.length <= nextWordLength.max) {
      wordFound = true;
      guessesLeft = 7;
      word.word = wordList[floor(random(wordList.length))];
      word.letters = stringToArray(word.word);
      lettersUsed = [];
    }
  }
}

function drawButtons() {
  stroke(255);
  noFill();
  rect(width,50,-50,50);
  text("R",width-25,85);
  rect(width,0,-50,50);
  text("H",width-25,35);
}

function mouseClicked() {
  hintButton();
  retryButton(); 
}
