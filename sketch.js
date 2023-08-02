const density = '         $@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/()1{}[]?-_+~<>i!lI;:,"^`';

let video;
let asciiDiv;

function setup() {
  video = createVideo("video.mp4", videoLoad);
  video.position(20, 20);
  video.size(129, 40);
  asciiDiv = createDiv();
}

function videoLoad() {
  video.play();
  video.loop();
}

window.onload = function() {
  videoLoad();
};
window.onforeunload = function() {
  videoLoad();
};

function draw() {
  video.loadPixels();

  let asciiImage = "";

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));

      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += '<span style="color: rgb(' + r + ',' + g + ',' + b + ')">' + c + '</span>';
    }
    asciiImage += '<br/>';
    //console.log(row);
  }
  asciiDiv.html(asciiImage);
}
draw();
function loop() {
draw();
}

setInterval(loop, 1000);
