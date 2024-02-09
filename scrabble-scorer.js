// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");

   word = input.question("Enter a word to score:");
   // console.log(oldScrabbleScorer(word));
};

function simpleScorer(word){
   let wordPoints = 0;
 
	for (let i = 0; i < word.length; i++){
      wordPoints++
   }
   return wordPoints;
};
// console.log(simpleScorer("sejal"));

function vowelBonusScorer(word){
    word = word.toUpperCase()
   let scorePoints = 0;
   let vowels = ["A","E","I","O","U"];
   for (let i = 0; i < word.length; i++){
      if (vowels.includes(word[i])){
      scorePoints += 3;
      } else {
      scorePoints += 1;
      };
   };
   return scorePoints;
};
// console.log(vowelBonusScorer("shreya"));

function scrabbleScorer(word) {
   newPointStructure = transform(oldPointStructure);
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]];
   }
   return letterPoints;
}


let scrabbleScorerObject = {
   'name':'Scrabble',
   'description':'The traditional scoring algorithm.',
   'scorerFunction': scrabbleScorer
};

let simpleScorerObject = {
   'name':'Simple Score',
   'description':'Each letter is worth 1 point.',
   'scorerFunction': simpleScorer
};

let vowelBonusScorerObject = {
   'name':'Bonus Vowels',
   'description':'Vowels are 3 pts, consonants are 1 pt.',
   'scorerFunction': vowelBonusScorer
};

const scoringAlgorithms = [simpleScorerObject,vowelBonusScorerObject,scrabbleScorerObject];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n");
   for(let i=0;i<scoringAlgorithms.length;i++){
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`); 
   }

   let alogorithmChoiceQuestion = ""
   for(let i=0;i<scoringAlgorithms.length;i++){
      if(i===0){
         alogorithmChoiceQuestion += "Enter: 0";
      } else if(i===(scoringAlgorithms.length-1)){
         alogorithmChoiceQuestion += `, or ${i}: `;
      } else {
         alogorithmChoiceQuestion += `, ${i}`;
      };
   };

   let alogorithmChoice = input.question(alogorithmChoiceQuestion);
   return scoringAlgorithms[alogorithmChoice];
};

function transform(pointStructure) {
   let tempPointStructure = {};
   for (key in pointStructure){
      for(let index=0; index<pointStructure[key].length; index++){
         tempPointStructure[pointStructure[key][index].toLowerCase()] = Number(key);
      };
   };
   return tempPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   // console.log(oldScrabbleScorer(word));
   // console.log(`SimpleScorer\t: Word ${word} Score is : ${simpleScorer(word)}`);
   // console.log(`VowelScorer\t: Word ${word} Score is : ${vowelBonusScorer(word)}`);
   scrabbleObject = scorerPrompt();
   console.log(`Score for '${word}': ${scrabbleObject.scorerFunction(word)}`);
   // console.log(scrabbleScorer(word));
   // console.log(`Score using NewPointStructure for '${word}': ${scrabbleScorer(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};