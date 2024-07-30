import "./app.scss";
import Animation from "./modules/animation";

window.addEventListener("load", function (event) {
  console.log("Hello 2223");

  const test = "t";
  let a = 1;

  console.log(test);
  console.log(test);

  function b() {
    console.log("a", a);
  }

  b();

  new Animation();
});

const p = document.querySelector("p");

p.innerText = "thang 12";
