"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Lenis 인스턴스 생성
    const lenis = new Lenis({
      // duration: 1,
      // syncTouch: true, // 모바일 주소표시줄 고정
    });

    lenisRef.current = lenis;

    // RAF 루프
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 초기에는 멈춤 상태
    lenis.stop();

    // 컴포넌트 마운트 후 시작
    const timer = setTimeout(() => {
      lenis.start();
    }, 100);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return lenisRef.current;
}
