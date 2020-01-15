function createTodoListItem() {
  const text = "Buy shampoo";
  const li = document.createElement("li");
  const input = document.querySelector("input[type=text]");
  li.textContent = input.value;
  const ul = document.querySelector("ul");
  ul.appendChild(li);
}

const addButton = document.querySelector("button");
addButton.addEventListener("click", createTodoListItem);
