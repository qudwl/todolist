import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const addTodoBtn = document.getElementById("newTodo");

addTodoBtn.addEventListener("click", () => {
  if (addTodoBtn.childElementCount == 3) {
    return;
  }
  const icon = addTodoBtn.children[0];
  const text = addTodoBtn.children[1];

  text.innerText = "";

  const input = document.createElement("input");
  const form = document.createElement("form");
  input.type = "text";
  form.append(input);

  addTodoBtn.append(form);
  input.focus();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const li = document.createElement("li");
    li.innerText = input.value;
    document.getElementById("todolist").prepend(li);
    text.innerText = "Add New";
    addTodoBtn.removeChild(form);
  });
});
