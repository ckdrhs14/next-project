"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis() {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Lenis 초기화
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // ScrollTrigger와 통합
        function raf(time) {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // ScrollTrigger의 스크롤 함수를 Lenis로 변경
        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (arguments.length) {
                    lenis.scrollTo(value, { immediate: true });
                } else {
                    return lenis.scroll;
                }
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: document.body.style.transform ? "transform" : "fixed",
        });

        // cleanup
        return () => {
            lenis.destroy();
            ScrollTrigger.scrollerProxy(document.body, null);
        };
    }, []);

    return lenisRef;
}
