const getGutterForTasks = () => {
  let tasksBlock = document.querySelector(".tasks");
  if (tasksBlock) {
    if (innerWidth > 1760) {
      tasksBlock.style.setProperty("--gutter", `-${(innerWidth - 1760) / 2}px`);
    }
  }
};

window.addEventListener("resize", () => {
  getGutterForTasks();
});

getGutterForTasks();
