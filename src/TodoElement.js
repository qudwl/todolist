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
    form.appendChild(input);
    span.innerText = "";
    span.classList.toggle("nowidth");
    li.appendChild(form);
    input.focus();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      td.title = input.value;
      span.innerText = input.value;
      span.classList.toggle("nowidth");
      li.removeChild(form);
      span.focus();
    });
  });

  span.tabIndex = 0;
  return li;
};

export default TodoElement;
