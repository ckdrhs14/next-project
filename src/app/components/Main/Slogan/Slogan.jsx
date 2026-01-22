"use client";

import { useEffect, useRef } from "react";
import styles from "./Slogan.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Slogan() {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const section = sectionRef.current;
        const scrollbarWidth = window.innerWidth - document.body.clientWidth;

        // 슬로건 애니메이션
        const sloganTl = gsap
            .timeline({ paused: true })
            .from(`.${styles["sc-slogan"]} .${styles["img-box-01"]}`, {
                opacity: 0,
                xPercent: 300,
            })
            .from(`.${styles["sc-slogan"]} .${styles["img-box"]}:not(.${styles["img-box-01"]})`, {
                xPercent: -100,
                opacity: 0,
                stagger: {
                    each: 0.5,
                },
            });

        ScrollTrigger.create({
            trigger: section,
            start: "0% 0%",
            end: "0% 100%",
            animation: sloganTl,
            toggleActions: "restart none none reverse",
        });

        // clip-path 사이즈 조정 함수
        function updateClipPath() {
            const box = section.querySelector(`.${styles["ani-box"]}`);
            const clipPath = section.querySelector("#triangle path");
            const isMobile = window.innerWidth <= 768;

            if (!box || !clipPath) return;

            const { width, height } = box.getBoundingClientRect();
            const imgBox = section.querySelector(`.${styles["img-box"]}`);
            const imgHt = imgBox ? imgBox.getBoundingClientRect().height : 0;

            const scaleX = isMobile ? 0.49 : width / 344;
            const scaleY = isMobile ? 0.58 : imgHt / 290;

            clipPath.setAttribute("transform", `scale(${scaleX}, ${scaleY})`);
        }

        // 애니메이션 반응형
        const mm = gsap.matchMedia();

        mm.add("(min-width:769px)", (ctx) => {
            updateClipPath();

            // 슬로건 세모 애니메이션
            const sloganTl02 = gsap
                .timeline()
                .set(`.${styles["sc-slogan"]} .${styles["img-box"]}:nth-child(4)`, {
                    marginLeft: () => {
                        const imgBoxes = section.querySelectorAll(`.${styles["img-box"]}`);
                        if (imgBoxes[1]) {
                            const computedStyle = window.getComputedStyle(imgBoxes[1]);
                            return parseInt(computedStyle.marginLeft) || 0;
                        }
                        return 0;
                    },
                })
                .set(`.${styles["sc-slogan"]} .${styles["ani-box"]}`, {
                    width: () => {
                        const aniBox = section.querySelector(`.${styles["ani-box"]}`);
                        return aniBox ? aniBox.offsetWidth : 0;
                    },
                    height: () => {
                        const imgBox = section.querySelector(`.${styles["img-box"]}`);
                        return imgBox ? imgBox.offsetHeight : 0;
                    },
                    left: "50%",
                })
                .set(
                    `.${styles["sc-slogan"]} .${styles.contents} .${styles["text-area"]} *, .${styles["sc-slogan"]} .${styles.contents} .${styles["btn-area"]}`,
                    {
                        opacity: 0,
                        yPercent: 20,
                    }
                )
                .to(
                    `.${styles["sc-slogan"]} .${styles["bg-area"]} path`,
                    {
                        morphSVG: {
                            shape:
                                "M24.25,0 H265.55 A24.25,24.25 0 0 1 289.8,24.25 V265.55 A24.25,24.25 0 0 1 265.55,289.8 H24.25 A24.25,24.25 0 0 1 0,265.55 V24.25 A24.25,24.25 0 0 1 24.25,0 Z",
                        },
                    },
                    "<"
                )
                .set(`.${styles["sc-slogan"]} .${styles["img-box"]}:nth-child(4)`, {
                    marginLeft: () => {
                        const aniBox = section.querySelector(`.${styles["ani-box"]}`);
                        const imgBoxes = section.querySelectorAll(`.${styles["img-box"]}`);
                        if (aniBox && imgBoxes[1]) {
                            const computedStyle = window.getComputedStyle(imgBoxes[1]);
                            return aniBox.offsetWidth + parseInt(computedStyle.marginLeft) * 2;
                        }
                        return 0;
                    },
                })
                .set(`.${styles["sc-slogan"]} .${styles["ani-box"]}`, {
                    onComplete: () => {
                        const aniBox = section.querySelector(`.${styles["ani-box"]}`);
                        if (aniBox) aniBox.classList.add(styles.on);
                    },
                })
                .set(`.${styles["sc-slogan"]} .${styles["img-box"]}:nth-child(4)`, {
                    onReverseComplete: () => {
                        const aniBox = section.querySelector(`.${styles["ani-box"]}`);
                        if (aniBox) aniBox.classList.remove(styles.on);
                    },
                })
                .to(`.${styles["sc-slogan"]} .${styles["ani-box"]}`, {
                    left: "0%",
                    width: () => window.innerWidth,
                    height: () => window.innerHeight,
                })
                .to(
                    `.${styles["sc-slogan"]} .${styles["bg-area"]} path`,
                    {
                        morphSVG: {
                            shape:
                                "M 1920 920 L 1918.85 920 L 1.86 920 L 0 920 L 0 0 L 0.71 0 L 1918.6 0 L 1920 0 L 1920 920 Z",
                        },
                        scale: function () {
                            if (window.innerWidth > 1920) {
                                return window.innerWidth / 1920;
                            }
                            return 1;
                        },
                    },
                    "<"
                )
                .to(`.${styles["sc-slogan"]}`, {
                    opacity: 0,
                }, "+=.5");

            const sloganSt = ScrollTrigger.create({
                trigger: section,
                start: "20% 0%",
                end: "100% 100%",
                animation: sloganTl02,
                scrub: 0,
                invalidateOnRefresh: false,
            });

            return () => {
                sloganSt.kill();
                const aniBox = section.querySelector(`.${styles["ani-box"]}`);
                if (aniBox) aniBox.classList.remove(styles.on);
            };
        });

        // 슬로건 텍스트 애니메이션
        mm.add("(min-width:769px), (max-width:768px)", (ctx) => {
            const { isMobile, isDesktop } = ctx.conditions;

            // 슬로건 텍스트 애니메이션
            const sloganTl03 = gsap
                .timeline({ paused: true })
                .set(`.${styles["sc-slogan"]} .${styles.contents} .${styles["text-area"]}, .${styles["sc-slogan"]} .${styles.contents} .${styles["btn-area"]}`, {
                    zIndex: 10,
                })
                .set(`.${styles["sc-slogan"]} .${styles.contents} .${styles["text-area"]} *, .${styles["sc-slogan"]} .${styles.contents} .${styles["btn-area"]}`, {
                    opacity: 0,
                    yPercent: 20,
                })
                .to(`.${styles["sc-slogan"]} .${styles.contents} .${styles["text-area"]} *, .${styles["sc-slogan"]} .${styles.contents} .${styles["btn-area"]}`, {
                    duration: 0.3,
                    opacity: 1,
                    yPercent: 0,
                    stagger: {
                        each: 0.05,
                    },
                });

            ScrollTrigger.create({
                trigger: section,
                start: () => {
                    return isDesktop ? '50% center' : '55% 55%';
                },
                end: () => {
                    return isDesktop ? '50% center' : '55% 75%';
                },
                animation: sloganTl03,
                toggleActions: 'restart none reset none',
                invalidateOnRefresh: false,
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars?.trigger === section) {
                    trigger.kill();
                }
            });
            mm.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles["sc-slogan"]}>
            <div className={styles.sticky}>
                <div className={styles["img-area"]}>
                    <div className={`${styles["img-box"]} ${styles["img-box-01"]}`}>
                        <img src="/assets/main/img-slogan01.webp" alt="slogan" />
                    </div>
                    <div className={styles["img-box"]}>
                        <img src="/assets/main/img-slogan02.webp" alt="slogan" />
                    </div>
                    <div className={`${styles["img-box"]} ${styles["ani-box"]}`}>
                        <div className={styles.mask}></div>
                    </div>
                    <div className={styles["img-box"]}>
                        <img src="/assets/main/img-slogan04.webp" alt="slogan" />
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles["bg-area"]}>
                        <svg id="triangle" viewBox="0 0 344 290" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <clipPath id="triangleMask">
                                    <path
                                        d="M171.79 0 C171.81 0 171.84 0 171.86 0 182.82 0.02 193.77 4.87 199.41 14.54 246.35 93.69 293.29 172.85 340.22 252.01 350.72 269.39 335.58 289.8 312.42 289.8 218.4 289.8 124.39 289.8 30.38 289.8 8.14 289.8 -7.01 269.42 3.27 252.03 50.04 172.87 96.81 93.71 143.58 14.55 149.41 4.86 160.4 0 171.79 0 "
                                        transform="matrix(1,0,0,1,0,0)"
                                        data-original="M171.79 0 C171.81 0 171.84 0 171.86 0 182.82 0.02 193.77 4.87 199.41 14.54 246.35 93.69 293.29 172.85 340.22 252.01 350.72 269.39 335.58 289.8 312.42 289.8 218.4 289.8 124.39 289.8 30.38 289.8 8.14 289.8 -7.01 269.42 3.27 252.03 50.04 172.87 96.81 93.71 143.58 14.55 149.42 4.86 160.4 0 171.79 0"
                                        data-svg-origin="0 0"
                                    ></path>
                                </clipPath>
                            </defs>
                        </svg>
                        <svg
                            id="triangle02"
                            xmlns="http://www.w3.org/2000/svg"
                            width="170"
                            height="170"
                            viewBox="0 0 170 170"
                        >
                            <defs>
                                <clipPath id="triangleMask02">
                                    <path
                                        d="M84 0 C86 0 86 0 86 0 88 0 93 0 99 8 122.12 54.61 145.24 101.22 168.37 147.83 173.46 158.03 165.99 170 154.52 170 108.17 170 61.82 170 15.47 170 4.01 170 -3.46 158.04 1.62 147.84 24.77 101.4 47.93 54.97 71.08 8.53 75 0 82 0 84 0 "
                                        data-original="M 71.0866 8.5381 C 75 0 82 0 84 0 C 86 0 86 0 86 0 C 88 0 93 0 99 8 L 168.37 147.832 C 173.467 158.034 165.992 170 154.523 170 H 15.477 C 4.0127 170 -3.4622 158.043 1.6247 147.841 L 71.0866 8.5381 Z"
                                        data-svg-origin="0 0"
                                        transform="matrix(1,0,0,1,0,0)"
                                    ></path>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className={styles["text-area"]}>
                        <h2 className={styles.title}>
                            <i className={`${styles.ico} ${styles["ico-slogan"]}`}></i>
                            <img src="/assets/main/img-slogan-text01.webp" alt="밝은성모안과는" className={styles.img} />
                        </h2>
                        <div className={styles["text-box"]}>
                            <p className={styles.text}>
                                대한민국 시력교정 불모지에서 1세대로 출발하여 <br />
                                어느덧 400,000안을 수술하였습니다.
                            </p>
                            <p className={styles.text}>
                                골똘히 환자의 눈을 들여다보면 각자의 다른 삶이 있습니다. <br />
                                운동선수가 되고자 하는 희망에 찬 눈, 찬란한 20대를 꿈꾸는 눈. <br />
                            </p>
                            <p className={styles.text}>
                                당신의 눈은 어떤 내일을 꿈꾸고 있나요? <br />
                                우리는 각자의 삶에 맞는 좋은 방법을 제공합니다. <br />
                            </p>
                        </div>
                    </div>
                    <div className={styles["btn-area"]}>
                        <button>버튼</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
