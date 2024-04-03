import "./style.scss";
import confetti, { Options } from "canvas-confetti";
import ColorThief from "colorthief";

const confettiButton = document.querySelector("#confetti-button");
const dogImage = document.querySelector<HTMLImageElement>("#dog-image");
const newImageTextbox =
  document.querySelector<HTMLInputElement>("#new-image-textbox");

if (!confettiButton) {
  throw new Error("Confetti issue");
} else if (!dogImage) {
  throw new Error("dog image issue");
} else if (!newImageTextbox) {
  throw new Error("image textbox issue");
}

const colorThief = new ColorThief();
//create a function on image load that does the colorthief.getColor

let fireButtonOptions: Options = {
  particleCount: 80,
  shapes: ["star"],
};

const onImageLoad = () => {
  const color = colorThief.getColor(dogImage);
  document.body.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;
  confetti();
};

const fireConfetti = () => {
  const rect = confettiButton.getBoundingClientRect();

  fireButtonOptions.spread = Math.ceil(Math.random() * 360);
  fireButtonOptions.angle = Math.ceil(Math.random() * 360);
  fireButtonOptions.origin = {
    x: (rect.right + rect.left) / (2 * window.innerWidth),
    y: (rect.top + rect.bottom) / (2 * window.innerHeight),
  };
  confetti(fireButtonOptions);
};

if (dogImage.complete) {
  onImageLoad();
} else {
  dogImage.addEventListener("load", onImageLoad);
}

const alterImageURL = (e: Event) => {
  const target = e.target as HTMLInputElement;

  dogImage.src = target.value;
  const palette = colorThief.getPalette(dogImage);
  const confettiColArr = palette.map((color: Color) => {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  });
  fireButtonOptions.colors = confettiColArr;

  confetti(fireButtonOptions);
};

confettiButton?.addEventListener("click", fireConfetti);
newImageTextbox.addEventListener("change", alterImageURL);
