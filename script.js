//Global Vars
const addButton = document.getElementById("add-button");
const textField = document.getElementById("text-field");

const mainList = document.querySelector(".list-wrapper");
const mainListChildren = mainList.getElementsByTagName('div');

//Listeners
addButton.addEventListener("click", newListItemGenerator);
textField.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {newListItemGenerator()} 
  });

//core app functionality 
function newListItemGenerator () {

  let newDiv = document.createElement("div");
  let newParagraph = document.createElement("p")
  let list = document.querySelector(".list-wrapper");
  
   let content = newParagraph.textContent = textField.value

  newDiv.classList.add("list-item");

  //checks for user text input in textField
  if (textField.value) {
    newDiv.textContent = `${mainListChildren.length + 1}. ${content}`;
    list.append(newDiv);
  }

  textField.value = "";
}