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

// ------------------------------------------------------------------------
//localStorage
let noteArr = [];

function noteLocalStorage() {
  const notes = localStorage.getItem("notes");
  let parseNotes = JSON.parse(notes);

  for (let i = 0; i < parseNotes.length; i++) {
    newListItem(parseNotes[i].id, parseNotes[i].note);
  }
}

window.addEventListener("load", noteLocalStorage);

// ------------------------------------------------------------------------
// App functionality
function newListItem(id, note) {
  // Unique ID generator
  const uniqueIdentifier = id || crypto.randomUUID().split("-").splice(0, 3).join("");
  const noteContent = note || textBox.value;

  const element = `
  <div class="item-menu">
    <button class="menu-button delete-button" id="DB-${uniqueIdentifier}"><span class="material-symbols-outlined"> close </span>
      </button>
    <button class="menu-button edit-button" id="EB-${uniqueIdentifier}"><span class="material-symbols-outlined"> menu </span>
      </button>
  </div>
  <div class="list-content">
    ${noteContent}
  </div>`;

  //listItem creation
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItem.id = uniqueIdentifier;
  listItem.innerHTML = element;

  //conditional check for text content within a note
  if (noteContent) {
    ListContainer.appendChild(listItem);
    noteArr.push({ id: uniqueIdentifier, note: noteContent });
    localStorage.setItem("notes", JSON.stringify(noteArr));
    // ------------------------------------------------------------------------

    const noteIndex = noteArr.findIndex((obj) => obj.id === uniqueIdentifier);

    //Delete button functionality
    const deleteButton = document.querySelector(`#DB-${uniqueIdentifier}`);

    deleteButton.addEventListener("click", function () {
      //Delete Local Storage update
      noteArr.splice(noteIndex, 1);
      localStorage.setItem("notes", JSON.stringify(noteArr));

      // Delete Animation
      listItem.classList.add("scale-out-center");
      setTimeout(function () {
        listItem.remove();
      }, 400);
    });
    // ------------------------------------------------------------------------
    //Edit Button Functionality
    const editButton = document.querySelector(`#EB-${uniqueIdentifier}`);

    editButton.addEventListener("click", function () {
      const listItemContent = listItem.querySelector(".list-content");
      const inputElement = document.createElement("input");
      inputElement.value = listItemContent.innerText;
      inputElement.classList.add("text-field");

      listItemContent.parentNode.replaceChild(inputElement, listItemContent);

      inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          console.log("inputElement.value:", inputElement.value);
          console.log("listItemContent.textContent:", listItemContent.textContent);

          noteArr[noteIndex].note = inputElement.value;
          localStorage.setItem("notes", JSON.stringify(noteArr));

          listItemContent.textContent = inputElement.value;
          inputElement.parentNode.replaceChild(listItemContent, inputElement);
        }
      });
    });
  }
  textBox.value = "";
}
