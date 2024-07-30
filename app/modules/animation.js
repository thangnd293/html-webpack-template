import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedImg from "./animatedImg";
gsap.registerPlugin(ScrollTrigger);

const screenSize = {
  mobile: 768,
  tablet: 992,
  desktop: 1200,
  mediumDesktop: 1600,
  largeDesktop: 1920,
};

export const disableScroll = () => {
  // Get the current page scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // if any scroll is attempted,
  // set this to the previous value
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
};

export const enableScroll = () => {
  window.onscroll = function () {};
};

export default class Animation {
  constructor() {
    this.screenHeight = window.innerHeight;
    this.isMobile = window.innerWidth < screenSize.mobile;
    this.isTablet =
      window.innerWidth < screenSize.desktop &&
      window.innerWidth >= screenSize.mobile;
    this.init();
  }
  init() {
    if (window.pageYOffset !== 0) {
      this.airpodModel3d = new AnimatedImg(
        document.getElementById("snap_intro_model"),
        this.runAnimation.bind(this)
      );
    } else {
      this.airpodModel3d = new AnimatedImg(
        document.getElementById("snap_intro_model"),
        this.loaded.bind(this)
      );
    }
  }
  runAnimation() {
    this.intro();
  }
  loaded() {
    document.querySelector(".snap-intro").classList.add("-playing");
    gsap.fromTo(
      ".snap-intro__model",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5 }
    );
    gsap.fromTo(
      ".snap-intro__model",
      { scale: 0.7 },
      { scale: 1, delay: 0.5, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      ".snap-intro__title.-title-1",
      { scale: 0.9 },
      { scale: 1, delay: 0.5, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      ".snap-intro__title.-title-1",
      { autoAlpha: 0 },
      { autoAlpha: 1, delay: 0.5, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      ".snap-intro__buttons",
      { autoAlpha: 0, y: this.isMobile ? "-10%" : "-200%" },
      { autoAlpha: 1, y: "0%", delay: 0.5, duration: 1.5, ease: "power3.out" }
    );
    disableScroll();
    setTimeout(() => {
      document.querySelector(".snap-intro").classList.remove("-playing");
      this.runAnimation();
      enableScroll();
    }, 2000);
  }

  intro() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".snap-intro",
        pin: true,
        start: "top top",
        end: `+=${this.screenHeight * 1.5}`,
        scrub: 0.7,
        fastScrollEnd: true,
        // markers: true
      },
    });

    var introImgFrame = { val: 0 },
      NewVal = 64;
    if (window.pageYOffset !== 0) {
      gsap.fromTo(
        ".snap-intro__model",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0 }
      );
    }
    tl.fromTo(
      ".snap-intro__title.-title-1",
      { scale: 1, autoAlpha: 1 },
      { scale: 1.19, autoAlpha: 0, duration: 1 },
      "a"
    );
    tl.fromTo(
      ".snap-intro__buttons",
      { autoAlpha: 1, scale: 1 },
      {
        autoAlpha: 0,
        duration: 0.5,
        delay: 0.5,
        onStart: () => {
          spatial_audio.pause();
        },
      },
      "a"
    );
    tl.to(
      introImgFrame,
      {
        val: NewVal,
        duration: 1.5,
        onUpdate: () => {
          this.airpodModel3d.draw(Math.round(introImgFrame.val));
        },
      },
      "a"
    );
    if (this.isTablet) {
      tl.fromTo(
        ".snap-intro__model",
        { scale: 1, top: "38%" },
        { scale: 1.2, top: "25%", duration: 1.2 },
        "a"
      );
    } else if (this.isMobile) {
      tl.fromTo(
        ".snap-intro__model",
        { scale: 1 },
        { scale: 1.3, duration: 1.2 },
        "a"
      );
    }
    tl.fromTo(
      ".snap-intro__title.-title-2",
      { scale: 0.9 },
      { scale: 1, delay: 1, duration: 1.2 },
      "a"
    );
    tl.fromTo(
      ".snap-intro__title.-title-2",
      { autoAlpha: 0 },
      { autoAlpha: 1, delay: 1, duration: 1 },
      "a"
    );
    tl.to(
      ".snap-intro__title.-title-2",
      { autoAlpha: 0, delay: 1.8, duration: 0.2 },
      "a"
    );
  }
}
