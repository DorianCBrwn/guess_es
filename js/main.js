getWord();
document.getElementById("getWord").addEventListener("click", getWord);
// document.querySelector("#guess").addEventListener("click", checkGuess(word));

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
  let guess = document.querySelector("#guess").value.toLowerCase();
  word === guess ? console.log("correct") : console.log("incorrect");
};
