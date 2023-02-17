const ProjectElement = (project) => {
    const li = document.createElement("li");
    li.tabIndex = 0;
    li.innerText = project.title;
    const curActive = document.querySelector(".active");
    console.log(curActive);
    if (curActive != null) {
        curActive.classList.toggle("active");
    }
    li.classList.toggle("active");
    
    li.addEventListener("click", () => {
        const curActive = document.querySelector(".active");
        curActive.classList.toggle("active");
        li.classList.toggle("active");
    });

    return li;
}

export default ProjectElement;