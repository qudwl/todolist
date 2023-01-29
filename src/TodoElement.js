/**
 *
 * @param {Todo} td
 * @returns DOM Element.
 */
const TodoElement = (td) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const i = document.createElement("i");
  i.classList = "bi bi-circle";
  span.innerText = td.title;
  li.append(i, span);
  i.tabIndex = 0;
  li.setAttribute("data-index", td.index);

  i.addEventListener("click", () => {
    i.classList.toggle("bi-circle");
    i.classList.toggle("bi-circle-fill");
    span.classList.toggle("complete");
  });

  span.addEventListener("click", () => {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.value = span.innerText;
    input.focus();
    form.appendChild(input);
    span.innerText = "";
    li.appendChild(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      td.title = input.value;
      span.innerText = input.value;
      li.removeChild(form);
    });
  });

  return li;
};

export default TodoElement;
