const svg = document.querySelector("#svg");
let rc = rough.svg(svg);
const widthConst = 100;
const heightConst = 100;
const gap = 50;
const defHeight =
  document.getElementById("svgCont").offsetHeight / 2 - heightConst / 2;
const defWidth =
  document.getElementById("svgCont").offsetWidth / 2 - widthConst / 2;
var config = {
  directions: [{ y: defHeight, x: defWidth }],
  data: { width: widthConst, height: heightConst, gap: gap },
};
let init = rc.rectangle(
  defWidth,
  defHeight,
  config.data.width,
  config.data.height,
  {
    fill: "red",
  }
);
var currentIndex = { x: 0, y: 0 };
svg.appendChild(init);
var controls = document.getElementsByClassName("controls");
for (let i = 0; i <= controls.length - 1; i++) {
  controls[i].addEventListener("click", (e) => {
    generateItems(e.target.id);
  });
}
function generateItems(direction) {
  let x = config.directions[config.directions.length - 1].x;
  let y = config.directions[config.directions.length - 1].y;
  console.log(x, y);
  switch (direction) {
    case "left":
      x -= config.data.width + config.data.gap;
      break;
    case "right":
      x += config.data.width + config.data.gap;
      break;
    case "bottom":
      y += config.data.height + config.data.gap;
      break;
    case "top":
      y -= config.data.height + config.data.gap;
      break;
  }
  if (!config.directions.some((el) => el.x === x && el.y === y)) {
    generateRect(x, y);
  }
}
function generateRect(x, y) {
  let xBack = config.directions[config.directions.length - 1].x;
  let yBack = config.directions[config.directions.length - 1].y;
  var ne = rc.rectangle(x, y, config.data.width, config.data.height);
  svg.appendChild(ne);
  var line;
  if (xBack > x) {
    line = rc.line(
      xBack,
      yBack + config.data.height / 2,
      x + config.data.width,
      y + config.data.height / 2
    );
  } else if (xBack < x) {
    line = rc.line(
      xBack + config.data.width,
      yBack + config.data.height / 2,
      x,
      y + config.data.height / 2
    );
  } else if (yBack > y) {
    line = rc.line(
      xBack + config.data.width / 2,
      yBack,
      x + config.data.width / 2,
      y + config.data.height
    );
  } else {
    line = rc.line(
      xBack + config.data.width / 2,
      yBack + config.data.height,
      x + config.data.width / 2,
      y
    );
  }
  svg.appendChild(line);
  var temp = { y: y, x: x };
  console.log(config.directions);
  console.log(temp);
  hideButtons(x, y);
  config.directions.push(temp);
}
function hideButtons(x, y) {
  for (var i = 0; i <= 3; i++) {
    let tempx = x;
    let tempy = y;
    let direction;
    switch (i) {
      case 0:
        tempx += config.data.width + config.data.gap;
        direction = "right";
        break;
      case 1:
        tempx -= config.data.width + config.data.gap;
        direction = "left";
        break;
      case 2:
        tempy += config.data.height + config.data.gap;
        direction = "bottom";
        break;
      case 3:
        tempy -= config.data.height + config.data.gap;
        direction = "top";
        break;
    }
    if (config.directions.some((el) => el.x == tempx && el.y == tempy)) {
      console.log(direction);
      document.querySelector(`#${direction}`).style.visibility = "hidden";
    } else {
      console.log(tempx, tempy);
      document.querySelector(`#${direction}`).style.visibility = "visible";
    }
  }
}
