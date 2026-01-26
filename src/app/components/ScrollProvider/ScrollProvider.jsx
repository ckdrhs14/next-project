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
        // 페이지 로드 시 최상단으로 스크롤
        window.scrollTo(0, 0);

        // AOS 초기화
        AOS.init({
            duration: 1000,
            once: false, // 스크롤할 때마다 애니메이션 재실행
            mirror: true, // 스크롤 올릴 때도 애니메이션 재실행
        });

        // ScrollTrigger 리프레시 (모든 섹션의 높이가 계산된 후)
        const handleLoad = () => {
            // 모든 섹션의 높이가 계산될 때까지 대기
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

        const handleResize = () => {
            window.scrollTo(0, 0);
            setTimeout(() => {
                location.reload();
            }, 0);
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
