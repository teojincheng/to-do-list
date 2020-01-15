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
  editButton.addEventListener("click", handleEditButtonClick);
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

function handleEditButtonClick(event) {
  //console.log(event);
  const paragraph = event.target.previousSibling;
  //console.log(paragraph.value);

  //console.log(paragraph.textContent);

  // if there is no value inside a paragraph
  if (!paragraph.textContent) {
    return;
  }

  //const paragraphValue = paragraph.textContent;
  const arrOfHtmlElements = Array.from(document.querySelectorAll("li p"));
  const arrItemValues = arrOfHtmlElements.map(item => item.textContent);
  localStorage.setItem("arrOfToDoItems", JSON.stringify(arrItemValues));
  const items = localStorage.getItem("arrOfToDoItems");
  //console.log(items);

  //console.log(arrOfValue);
  //console.log(nodeListOfParagraphElem);
}

/**
 * when user keys text at the input text field OR when user clicks on add button
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
  liItem.appendChild(createEditButton());
  liItem.appendChild(createDeleteButton());
  ul.appendChild(liItem);
  input.value = "";
}

function createToDoListItemFromLocalStorage(arrOfValues) {
  const ul = document.querySelector("ul");
  const liItem = document.createElement("li");

  liItem.appendChild(createCheckBox());

  for (let i = 0; i < arrOfValues.length; i++) {
    const p = createPElementAndRegisterListener(arrOfValues[i]);
    liItem.appendChild(p);
    liItem.appendChild(createEditButton());
    liItem.appendChild(createDeleteButton());
    ul.appendChild(liItem);
  }

  let liElements = document.querySelectorAll("ul li");
  for (let j = 0; j < liElements.length; j++) {
    liElements[j].parentNode.removeChild(liElements[j]);
  }
}

//add button at the top of the page.
const addButton = document.querySelector("button");
addButton.addEventListener("click", createTodoListItem);

const inputElement = document.querySelector(".textbox");
inputElement.addEventListener("keypress", createTodoListItem);

if (localStorage.getItem("arrOfToDoItems") !== null) {
  createToDoListItemFromLocalStorage(localStorage.getItem("arrOfToDoItems"));
}
