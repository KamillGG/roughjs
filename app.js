const svg = document.querySelector("#svg");
let rc = rough.svg(svg);
var defHeight = document.getElementById("svgCont").offsetHeight / 2;
var defWidth = document.getElementById("svgCont").offsetWidth / 2;
var config = [
  { directions: [[{ y: defHeight, x: defWidth }]] },
  { width: "100px", height: "100px", gap: "10px" },
];
let init = rc.rectangle(defWidth, defHeight, 100, 100);
var currentIndex = { x: 0, y: 0 };
svg.appendChild(init);
var controls = document.getElementsByClassName("controls");
for (let i = 0; i <= controls.length - 1; i++) {
  controls[i].addEventListener("click", (e) => {
    generateItems(e.target.id);
  });
}
function generateItems(direction) {
  switch (direction) {
    case "left":
      generateLeft();
      break;
    case "right":
      generateRight();
      break;
    case "bottom":
      generateBottom();
      break;
    case "up":
      generateUp();
      break;
  }
  console.log(config);
}
function generateLeft() {
  config[0].directions[currentIndex.x][currentIndex.y - 1] = { x: 100, y: 200 };
}
function generateRight() {
  config[0].directions[currentIndex.x][currentIndex.y + 1] = { x: 100, y: 200 };
}
function generateUp() {
  if (config[0].directions[currentIndex.x + 1] == undefined) {
    config[0].directions[currentIndex.x + 1] = [];
  }
  if (config[0].directions[currentIndex.x + 1][currentIndex.y])
    console.table(config[0].directions);
  config[0].directions[currentIndex.x + 1][currentIndex.y].push({
    x: 100,
    y: 200,
  });
}
function generateBottom() {
  config[0].directions[currentIndex.x - 1][currentIndex.y] = { x: 100, y: 200 };
}
