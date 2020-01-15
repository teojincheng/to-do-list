function removeItem(event) {
  event.target.parentElement.remove();
}

function toggleComplete(event) {
  const paragraph = event.target.nextSibling;
  paragraph.classList.toggle("todo");
  paragraph.classList.toggle("done");
}

function createCheckBox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", toggleComplete);
  return checkbox;
}

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", removeItem);
  return deleteButton;
}

function createEditButton() {
  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.addEventListener("click", function(event) {});
  return editButton;
}

function createPElementAndRegisterListener(pContent) {
  const p = document.createElement("p");

  p.classList.add("todo");
  p.textContent = pContent;
  p.addEventListener("click", toggleComplete);
  p.setAttribute("contentEditable", true);
  //p.appendChild(createDeleteButton());
  //p.appendChild(createEditButton());
  return p;
}

/**
 * Create p element and set its value equal to value retrieve from input box.
 *
 */
function createTodoListItem(event) {
  const input = document.querySelector("input[type=text]");

  const pressedEnterKeyInTextBox =
    event.type === "keypress" && event.key === "Enter";
  const pressedAddButton = event.type === "click";

  const eventsIwantToCapture = pressedEnterKeyInTextBox || pressedAddButton;

  if (!input.value || !eventsIwantToCapture) {
    return;
  }

  //checkwanted events.
  //use contenteditable attribute

  const ul = document.querySelector("ul");
  const liItem = document.createElement("li");

  liItem.appendChild(createCheckBox());

  const p = createPElementAndRegisterListener(input.value);
  liItem.appendChild(p);
  liItem.appendChild(createDeleteButton());
  ul.appendChild(liItem);
  input.value = "";
}

//add button at the top of the page.
const addButton = document.querySelector("button");
addButton.addEventListener("click", createTodoListItem);

const inputElement = document.querySelector(".textbox");
inputElement.addEventListener("keypress", createTodoListItem);
//const items = document.querySelectorAll("ul p");

/*
items.forEach(item => {
  //console.log(listItem);
  item.addEventListener("click", function(event) {
    item.classList.toggle("done");
    item.classList.toggle("todo");
  });
});
*/
//event delegation

/*
const items = document.querySelector("ul");

items.addEventListener("click", function(event) {
  event.target.classList.toggle("todo");
  event.target.classList.toggle("done");
});
*/
