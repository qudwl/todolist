import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import TodoElement from "./TodoElement";
import Project from "./Project";

const projects = [];

let curProject = new Project("default");
projects.push(curProject);

const addTodoBtn = document.getElementById("newTodo");

addTodoBtn.addEventListener("click", () => {
  if (addTodoBtn.childElementCount == 3) {
    return;
  }
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
    const td = curProject.addTodo(input.value, 0);
    const el = TodoElement(td);
    document.getElementById("todolist").insertBefore(el, addTodoBtn);
    text.innerText = "Add New";
    addTodoBtn.removeChild(form);
  });
});
