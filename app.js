/**
 * Create li element and set its value equal to value retrieve from input box.
 * append it to the ul elemnt.
 */
function createTodoListItem() {
  const text = "Buy shampoo";
  const li = document.createElement("li");
  const input = document.querySelector("input[type=text]");

  if (input.value === "") {
    return;
  }

  li.textContent = input.value;
  const ul = document.querySelector("ul");
  ul.appendChild(li);
  input.value = "";
}

const addButton = document.querySelector("button");
addButton.addEventListener("click", createTodoListItem);
