"use client";

import { useEffect } from "react";

export function useViewportFix() {
  useEffect(() => {
    // 화면 상단 고정
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 고정된 뷰포트 값 저장 (최초 한 번만)
    const FIXED_VIEWPORT_HEIGHT = window.innerHeight;
    const FIXED_SVH = window.visualViewport
      ? window.visualViewport.height
      : FIXED_VIEWPORT_HEIGHT;

    // 고정된 뷰포트 값 강제 설정 함수
    function forceFixedViewportUnits() {
      const html = document.documentElement;
      html.style.setProperty("--vh", `${FIXED_VIEWPORT_HEIGHT * 0.01}px`);
      html.style.setProperty("--svh", `${FIXED_SVH * 0.01}px`);
    }

    // 즉시 설정
    forceFixedViewportUnits();

    // 다른 라이브러리들이 값을 변경할 수 있으므로 주기적으로 강제 설정
    const interval = setInterval(forceFixedViewportUnits, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);
}
