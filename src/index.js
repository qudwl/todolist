import "./style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import TodoElement from "./TodoElement";
import Project from "./Project";
import ProjectElement from "./ProjectElement";

const df_project = new Project("Todos");
let curProject = df_project;

const addTodoBtn = document.getElementById("newTodo");
const addProjectBtn = document.getElementById("newProject");
const todolist = document.getElementById("todolist");
const projectList = document.getElementById("projects");

const df_ul = document.getElementById("todo");
const df = ProjectElement(curProject);
df.addEventListener("click", () => {
  curProject = df_project;
  changeProject();
});
df_ul.appendChild(df);


addTodoBtn.addEventListener("click", () => {
  if (addTodoBtn.childElementCount == 3) {
    return;
  }
  const text = addTodoBtn.children[1];

  text.innerText = "";
  text.classList.toggle("nowidth");

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
    todolist.insertBefore(el, addTodoBtn);
    text.innerText = "Add New";
    addTodoBtn.removeChild(form);
    text.classList.toggle("nowidth");
    addTodoBtn.focus();
  });
});

addProjectBtn.addEventListener("click", () => {
  if (addProjectBtn.childElementCount == 3) {
    return;
  }
  const text = addProjectBtn.children[1];

  text.innerText = "";
  text.classList.toggle("nowidth");

  const input = document.createElement("input");
  const form = document.createElement("form");
  input.type = "text";
  form.append(input);

  addProjectBtn.append(form);
  input.focus();

  form.addEventListener("submit", (e) => {
    e.preventDefault();;
    const newProject = new Project(input.value);
    curProject = newProject;
    changeProject();
    text.innerText = "Add New";
    text.classList.toggle("nowidth");
    addProjectBtn.removeChild(form);

    const ProjectEl = ProjectElement(newProject, changeProject);
    changeProject();
    ProjectEl.addEventListener("click", () => {
      curProject = newProject;
      changeProject();
    });
    projectList.insertBefore(ProjectEl, addProjectBtn);
  });
});

function changeProject () {
  while (todolist.childElementCount > 1) {
    todolist.removeChild(todolist.firstChild);
  }
  const size = curProject.length;
  for (let i = 0; i < size; i++) {
    const el = TodoElement(curProject.at(i));
    todolist.insertBefore(el, addTodoBtn);
  }
}

document.body.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    console.log(document.activeElement.click());
  }
});
