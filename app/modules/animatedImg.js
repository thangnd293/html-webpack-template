export default class AnimatedImg {
  constructor(elm, onLoad) {
    this.canvas = elm;
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.path = this.canvas.getAttribute("path");
    this.ext = this.canvas.getAttribute("ext");
    this.from = parseInt(this.canvas.getAttribute("from"));
    this.to = parseInt(this.canvas.getAttribute("to"));
    this.numLength = this.canvas.getAttribute("from").length;
    this.totalFrames = this.to - this.from;
    this.frameCount = this.to - this.from;
    this.currentFrame = this.from;
    this.images = [];
    this.init();
    this.onLoad = onLoad;
  }
  init() {
    this.loadImages();
  }
  loadImages() {
    for (let i = this.from; i <= this.to; i++) {
      const image = new Image();
      image.src = this.getImagePath(i); // Adjust the path according to your file structure
      this.images.push(image);
      if (i === 0) {
        image.onload = (e) => this.draw(0);
      }
      if (i === this.to) {
        image.onload = (e) => this.onLoad();
      }
    }
  }
  getStringOfFile(frame) {
    return frame.toString().padStart(this.numLength, "0");
  }
  getImagePath(frame) {
    return `${this.path}${this.getStringOfFile(frame)}${this.ext}`;
  }
  draw(frame) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(this.images[frame], 0, 0, this.width, this.height);
  }
  play(fps) {
    let frame = 0;
    setInterval(() => {
      this.draw(frame);
      frame++;
      if (frame === this.images.length) frame = 0;
    }, 1000 / fps);
  }
}
