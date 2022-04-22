function getWord() {
  const url = "https://palabras-aleatorias-public-api.herokuapp.com/random";
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      let word = data.body.Word;
      makeWordPuzzle(word);
      console.log(word);

      // document.querySelector(".hint").innerText = decodeURI(
      //   data.body.DefinitionMD
      // );
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

//const makeHint = (word) => {};

const makeWordPuzzle = (word) => {
  clearLetters();
  wordArr = [...word].map((letter) => letter.toUpperCase());
  wordArr.forEach((letter) => {
    let letterDiv = document.createElement("span");
    letterDiv.classList.add("letter", "clay");
    letterDiv.innerHTML = letter;
    document.querySelector("#wordPuzzle").appendChild(letterDiv);
    hideLetters();
  });
};

const clearLetters = () => {
  let letterList = document.querySelector("#wordPuzzle");
  while (letterList.firstChild) {
    letterList.removeChild(letterList.lastChild);
  }
};

const hideLetters = () => {
  let letterList = document.querySelectorAll(".letter");
  Array.from(letterList)
    .slice(1, -1)
    .forEach((letter) => {
      letter.classList.add("hide");
    });
};

const checkGuess = (word) => {
  let guess = document.querySelector("input").value.toLowerCase();
  console.log(`The guess is ${guess}`);
  uncoverLetter();
  word === guess ? console.log("correct") : console.log("incorrect");
};

const uncoverLetter = () => {
  let currLetterList = Array.from(document.querySelectorAll(".hide"));

  if (currLetterList.some((ele) => ele.classList.contains("hide"))) {
    currLetterList[
      Math.floor(Math.random() * currLetterList.length)
    ].classList.remove("hide");
  } else {
    console.log("There are no letters to uncover.");
  }
};

let word = getWord();

document.getElementById("getWord").addEventListener("click", getWord);

document
  .getElementById("guess")
  .addEventListener("click", checkGuess.bind(this, word));
