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
        // AOS 초기화
        AOS.init({
            duration: 1000,
            once: false, // 스크롤할 때마다 애니메이션 재실행
            mirror: true, // 스크롤 올릴 때도 애니메이션 재실행
        });

        // ScrollTrigger 리프레시
        const handleLoad = () => {
            ScrollTrigger.refresh();
            AOS.refresh();
        };

        window.addEventListener("load", handleLoad);

        // 초기 마운트 시에도 AOS 새로고침
        AOS.refresh();

        // 리사이즈 이벤트 처리 (데스크탑만)
        function setupResizeRefresh() {
            if (window.matchMedia("(pointer: fine)").matches) {
                // 데스크탑만 실행
                window.addEventListener("resize", () => {
                    //location.reload();
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
