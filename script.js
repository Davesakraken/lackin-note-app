//input selectors
const addButton = document.querySelector(".add-button");
const textBox = document.querySelector(".text-field");

//list selectors
const listWrapper = document.querySelector(".list-container");
const mainList = document.querySelector(".list-container");

//Listeners
addButton.addEventListener("click", newListItem);
textBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    newListItem();
  }
});

/*Creates a new list item by creating a div and appending the innerHTML with a template literal. 
conditional will check if there is content within the text box and append the listWrapper*/
function newListItem() {

  const d = crypto.randomUUID().split("-").splice(0, 3).join("");
  const uniqueIdentifier = d.valueOf();

  const element = `
  <div class="item-menu">
    <button class="menu-button delete-button" id="DB-${uniqueIdentifier}"><span class="material-symbols-outlined"> close </span>
      </button>
    <button class="menu-button edit-button" id="MB-${uniqueIdentifier}"><span class="material-symbols-outlined"> menu </span>
      </button>
  </div>
  <div class="list-content">
    <p>${textBox.value}</p>
  </div>`;

  const listItem = document.createElement("div");

  listItem.classList.add("list-item");
  listItem.id = uniqueIdentifier;
  listItem.innerHTML = element;

  if (textBox.value) {
    listWrapper.appendChild(listItem);

    //delete button functionality
    const deleteButton = document.querySelector(`#DB-${uniqueIdentifier}`);
    deleteButton.addEventListener("click", function () {
      listItem.classList.add("scale-out-center")
      setTimeout(function () {
        listItem.remove();
      }, 1000);
    });
  }

  textBox.value = "";
}