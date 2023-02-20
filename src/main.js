function insertDom() {
  const buttonDom = document.querySelector(".button");
  const button = document.createElement("button");
  button.innerHTML = "点击";
  buttonDom.appendChild(button);

  button.addEventListener("click", () => {
    console.log("click");
  });
}

insertDom();
