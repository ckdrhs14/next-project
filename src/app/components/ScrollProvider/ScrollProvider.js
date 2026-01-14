"use client";

import { useEffect } from "react";
import { useLenis } from "@/app/hooks/useLenis";
import { useViewportFix } from "@/app/hooks/useViewportFix";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

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

export default function ScrollProvider({ children }) {
  const lenis = useLenis();
  useViewportFix();

  useEffect(() => {
    // AOS 초기화
    AOS.init({
      duration: 1000,
      startEvent: "load",
    });

    // ScrollTrigger 리프레시
    const handleLoad = () => {
      ScrollTrigger.refresh();
      AOS.refresh();
    };

    window.addEventListener("load", handleLoad);

    // 리사이즈 이벤트 처리 (데스크탑만)
    function setupResizeRefresh() {
      if (window.matchMedia("(pointer: fine)").matches) {
        // 데스크탑만 실행
        window.addEventListener("resize", () => {
          location.reload();
        });
      }
    }
    setupResizeRefresh();

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return <>{children}</>;
}
