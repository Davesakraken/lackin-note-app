//Global Vars
const header = document.querySelector('header')
const addButton = document.querySelector(".add-button");
const textBox = document.querySelector(".text-field");
const listWrapper = document.querySelector(".list-wrapper");

const mainList = document.querySelector(".list-wrapper");
const mainListChildren = mainList.getElementsByTagName('div');

//Listeners
addButton.addEventListener("click", newListItem);
textBox.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {newListItem()} 
  });

//core app functionality 
function newListItem () {

  let newDiv = document.createElement("div");
  let childParagraph = document.createElement("p")
  
  newDiv.classList.add("list-item");
}
