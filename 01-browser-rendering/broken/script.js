const box = document.querySelector("#box");
const button = document.querySelector("#moveButton");

let position = 0;

button.addEventListener("click", () => {
  for (let i = 0; i < 500; i++) {
    position += 1;

    box.style.width = position + "px";

    console.log(box.offsetWidth);
  }
});
