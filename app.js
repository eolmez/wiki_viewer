const inputField = document.querySelector(".searchBar");
const randomButton = document.querySelector(".randomizer");
const api =
  "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=35&gsrsearch=";

const init = () => {
  inputField.addEventListener("keyup", getSearch);
  randomButton.addEventListener("click", () => {
    window
      .open("https://en.wikipedia.org/wiki/Special:Random", "_blank")
      .focus();
  });
};

const getSearch = (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    getApi(inputField.value);

    inputField.value = "";
  } else if (inputField.value == "") {
    inputField.classList.add("animated", "shake", "alert"); // Add the alert class

    setTimeout(() => {
      // Remove alert after animation complete
      inputField.classList.remove("animated", "shake", "alert");
    }, 750);
  }
};

const getApi = (input) => {
  apiURL = `${api}%27${input.replace(/[\s]/g, "_")}%27`;
  // console.log(apiURL)
  fetchData();
};

const fetchData = () => {
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      createDom(data);
    });
};

const createDom = (data) => {
  const searchResults = document.querySelector(".searchResults");
  searchResults.innerHTML = "";
  // console.log(searchResults);
  for (let i in data.query.pages) {
    const searchLink = document.createElement("a");
    searchLink.classList.add("links", "animated", "fadeInDown");
    searchLink.setAttribute("target", "_blank");
    searchLink.setAttribute(
      "href",
      `https://en.wikipedia.org/wiki/${data.query.pages[i].title}`
    );
    searchLink.appendChild(
      document.createTextNode(`${data.query.pages[i].title}`)
    );
    searchResults.appendChild(searchLink);
    // console.log("Ich bin baba, so Wie Müslüm");
  }
};

window.addEventListener("load", init);
