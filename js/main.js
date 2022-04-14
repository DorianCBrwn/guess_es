//Example fetch using pokemonapi.co
document.getElementById("getWord").addEventListener("click", getFetch);

function getFetch() {
  const url = "https://palabras-aleatorias-public-api.herokuapp.com/random";
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      let word = data.body.Word;
      makeWordPuzzle(word);
      console.log(word);

      document.querySelector(".hint").innerText = decodeURI(
        data.body.DefinitionMD
      );
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

//const makeHint = (word) => {};

const makeWordPuzzle = (word) => {
  wordArr = [...word].map((letter) => letter.toUpperCase());
  wordArr.forEach((letter) => {
    let letterDiv = document.createElement("span");
    letterDiv.classList.add("letter");
    letterDiv.innerHTML = letter;
    document.querySelector("#wordPuzzle").appendChild(letterDiv);
  });
};
