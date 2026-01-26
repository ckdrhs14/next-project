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
    useLenis(); // Lenis 초기화만 수행
    useViewportFix();

    useEffect(() => {
        window.scrollTo(0, 0);

        // AOS 초기화
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
        });

        const handleLoad = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh();
                    AOS.refresh();
                });
            });
        };

        window.addEventListener("load", handleLoad);

        // 초기 마운트 시에도 AOS 새로고침
        AOS.refresh();

        let resizeTimer;
        let lastWidth = window.innerWidth;

        const handleResize = () => {
            const currentWidth = window.innerWidth;

            if (currentWidth !== lastWidth) {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    window.scrollTo(0, 0);
                    setTimeout(() => {
                        location.reload();
                    }, 0);
                }, 150);
            }

            lastWidth = currentWidth;
        };
        window.addEventListener("resize", handleResize);

        const handleBeforeUnload = () => {
            window.scrollTo(0, 0);
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("load", handleLoad);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return <>{children}</>;
}
