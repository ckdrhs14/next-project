"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// GSAP 플러그인 등록
gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  MorphSVGPlugin,
  MotionPathPlugin
);

// GSAP 기본 설정
gsap.defaults({
  ease: "none",
});

export { gsap, ScrollTrigger, ScrollToPlugin, MorphSVGPlugin, MotionPathPlugin };
