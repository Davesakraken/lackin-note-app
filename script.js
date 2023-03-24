//input selectors
const addButton = document.querySelector(".add-button");
const textBox = document.querySelector(".text-field");

//list selectors
const ListContainer = document.querySelector(".list-container");

//Listeners
addButton.addEventListener("click", () => newListItem());
textBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    newListItem();
  }
});

//localStorage
let noteArr = [];

function noteLocalStorage () {
  const notes = localStorage.getItem("notes")
  let parseNotes = JSON.parse(notes)

  for (let i = 0; i < parseNotes.length; i++) {
    newListItem(parseNotes[i].id, parseNotes[i].note)
  }

} 

window.addEventListener('load', noteLocalStorage)

/*Creates a new list item by creating a div and appending the innerHTML with a template literal. 
conditional will check if there is content within the text box and append the listWrapper*/
function newListItem(id, note) {

  const uniqueIdentifier = id || crypto.randomUUID().split("-").splice(0, 3).join("");
  const noteContent = note || textBox.value;

  console.log(uniqueIdentifier)

  const element = `
  <div class="item-menu">
    <button class="menu-button delete-button" id="DB-${uniqueIdentifier}"><span class="material-symbols-outlined"> close </span>
      </button>
    <button class="menu-button edit-button" id="EB-${uniqueIdentifier}"><span class="material-symbols-outlined"> menu </span>
      </button>
  </div>
  <div class="list-content">
    <p>${noteContent}</p>
  </div>`;

  const listItem = document.createElement("div");

  listItem.classList.add("list-item");
  listItem.id = uniqueIdentifier;
  listItem.innerHTML = element;

  if (noteContent) {
    ListContainer.appendChild(listItem);
    noteArr.push({id: uniqueIdentifier, note: noteContent});
    localStorage.setItem("notes", JSON.stringify(noteArr));

    //delete button functionality
    const deleteButton = document.querySelector(`#DB-${uniqueIdentifier}`);

    deleteButton.addEventListener("click", function () {
      listItem.classList.add("scale-out-center");
      setTimeout(function () {
        listItem.remove();
      }, 400);
    });

    //Edit Button Functionality
    const editButton = document.querySelector(`#EB-${uniqueIdentifier}`);

    editButton.addEventListener("click", function () {
      const listItemContent = listItem.querySelector(".list-content");
      const inputElement = document.createElement("input");
      inputElement.value = listItemContent.textContent;
      inputElement.classList.add("text-field");

      listItemContent.parentNode.replaceChild(inputElement, listItemContent);

      inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          listItemContent.textContent = inputElement.value;
          inputElement.parentNode.replaceChild(listItemContent, inputElement);
        }
      });
    });
  }
  textBox.value = "";
}
