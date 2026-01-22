"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Service.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/app/hooks/useLenis";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Service() {
    const sectionRef = useRef(null);
    const lenis = useLenis();
    const [serviceSwiper, setServiceSwiper] = useState(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const section = sectionRef.current;
        const scrollbarWidth = window.innerWidth - document.body.clientWidth;

        // 애니메이션 반응형
        const mm = gsap.matchMedia();

        mm.add("(min-width:769px)", (ctx) => {
            gsap.set(`.${styles["slide-wrap"]}`, { opacity: 0 });

            const titleTl = gsap
                .timeline({ paused: true })
                .set(`.${styles["title-area"]} .${styles.title}`, {
                    width() {
                        return this.targets()[0].offsetWidth;
                    },
                    height() {
                        return this.targets()[0].offsetHeight;
                    },
                })
                .to(`.${styles["title-area"]} .${styles.title}`, {
                    width: () => window.innerWidth,
                    height: () => window.innerHeight,
                    borderRadius: 0,
                    onStart: () => {
                        if (lenis?.current) lenis.current.stop();
                        document.body.style.paddingRight = `${scrollbarWidth}px`;
                        setTimeout(() => {
                            if (lenis?.current) lenis.current.start();
                            document.body.style.paddingRight = "0";
                        }, 1000);
                    },
                })
                .to(`.${styles["title-area"]}`, {
                    opacity: 0,
                })
                .to(
                    `.${styles["slide-wrap"]}`,
                    {
                        opacity: 1,
                    },
                    "<"
                );

            // 폭넓은 선택 애니메이션
            ScrollTrigger.create({
                trigger: `.${styles["title-wrap"]}`,
                start: "0% 0%",
                end: "0% 0%",
                invalidateOnRefresh: false,
                onEnter: () => {
                    if (lenis?.current) lenis.current.stop();
                    document.body.style.paddingRight = `${scrollbarWidth}px`;
                    titleTl.play();
                    setTimeout(() => {
                        if (lenis?.current) lenis.current.start();
                        document.body.style.paddingRight = "0";
                    }, 1000);
                },
                onLeaveBack: () => {
                    if (lenis?.current) lenis.current.stop();
                    document.body.style.paddingRight = `${scrollbarWidth}px`;
                    titleTl.reverse();
                    setTimeout(() => {
                        if (lenis?.current) lenis.current.start();
                        document.body.style.paddingRight = "0";
                    }, 1000);
                },
            });

            const bgItems = section.querySelectorAll(`.${styles["bg-item"]}`);
            const navItems = section.querySelectorAll(`.${styles["nav-item"]}`);
            const textAreas = section.querySelectorAll(`.${styles["text-area"]}`);
            const imgBoxes = section.querySelectorAll(`.${styles["img-box"]} .${styles.img}`);

            let serviceSt = ScrollTrigger.create({
                trigger: `.${styles["slide-wrap"]}`,
                start: "0% 0%",
                end: "100% 0%",
                onUpdate: ({ progress }) => {
                    let idx = Math.floor((progress * 100) / 25);
                    if (idx < bgItems.length) {
                        navItems.forEach((item, i) => {
                            if (i === idx) {
                                item.classList.add(styles.active);
                            } else {
                                item.classList.remove(styles.active);
                            }
                        });
                        bgItems.forEach((item, i) => {
                            if (i === idx) {
                                item.classList.add(styles.active);
                            } else {
                                item.classList.remove(styles.active);
                            }
                        });
                        textAreas.forEach((item, i) => {
                            if (i === idx) {
                                item.classList.add(styles.active);
                            } else {
                                item.classList.remove(styles.active);
                            }
                        });
                        imgBoxes.forEach((item, i) => {
                            if (i === idx) {
                                item.classList.add(styles.show);
                            } else {
                                item.classList.remove(styles.show);
                            }
                        });
                    }
                },
            });

            // service nav 클릭 이벤트
            navItems.forEach((item, idx) => {
                const link = item.querySelector("a");
                if (link) {
                    link.addEventListener("click", (e) => {
                        e.preventDefault();
                        const slideWrap = section.querySelector(`.${styles["slide-wrap"]}`);
                        if (slideWrap) {
                            const rect = slideWrap.getBoundingClientRect();
                            const scrollTop = window.scrollY || window.pageYOffset;
                            const sectionTop =
                                rect.top + scrollTop + (slideWrap.offsetHeight / bgItems.length) * idx;

                            gsap.to(window, {
                                duration: 0.5,
                                ease: "power2.inOut",
                                scrollTo: sectionTop,
                            });
                        }
                    });
                }
            });

            return () => {
                serviceSt.kill();
            };
        });

        mm.add("(max-width: 768px)", (ctx) => {
            gsap.set(`.${styles["slide-wrap"]}`, { opacity: 0 });

            const titleTl = gsap
                .timeline({ paused: true })
                .set(`.${styles["title-area"]} .${styles.title}`, {
                    width() {
                        return this.targets()[0].offsetWidth;
                    },
                    height() {
                        return this.targets()[0].offsetHeight;
                    },
                })
                .to(`.${styles["title-area"]} .${styles.title}`, {
                    width: () => window.innerWidth,
                    height: () => window.innerHeight * 1.2,
                    borderRadius: 0,
                    onStart: () => {
                        if (lenis?.current) lenis.current.stop();
                        document.body.style.paddingRight = `${scrollbarWidth}px`;
                        setTimeout(() => {
                            if (lenis?.current) lenis.current.start();
                            document.body.style.paddingRight = "0";
                        }, 1000);
                    },
                })
                .to(`.${styles["title-wrap"]}`, {
                    opacity: 0,
                })
                .to(
                    `.${styles["slide-wrap"]}`,
                    {
                        opacity: 1,
                    },
                    "<"
                );

            // 폭넓은 선택 애니메이션
            ScrollTrigger.create({
                trigger: `.${styles["title-wrap"]}`,
                start: "0% 0%",
                end: "0% 0%",
                invalidateOnRefresh: false,
                onEnter: () => {
                    if (lenis?.current) lenis.current.stop();
                    document.body.style.paddingRight = `${scrollbarWidth}px`;
                    titleTl.play();
                    setTimeout(() => {
                        if (lenis?.current) lenis.current.start();
                        document.body.style.paddingRight = "0";
                    }, 1000);
                },
            });

            ScrollTrigger.create({
                trigger: `.${styles["title-wrap"]}`,
                start: "-3% 0%",
                end: "0% 0%",
                invalidateOnRefresh: false,
                onLeaveBack: () => {
                    if (lenis?.current) lenis.current.stop();
                    document.body.style.paddingRight = `${scrollbarWidth}px`;
                    titleTl.reverse();
                    setTimeout(() => {
                        if (lenis?.current) lenis.current.start();
                        document.body.style.paddingRight = "0";
                    }, 1000);
                },
            });

            // 모바일 서비스 아이템 초기화
            const bgItems = section.querySelectorAll(`.${styles["bg-item"]}`);
            const textAreas = section.querySelectorAll(`.${styles["text-area"]}`);
            if (bgItems[0]) bgItems[0].classList.add(styles.active);
            if (textAreas[0]) textAreas[0].classList.add(styles.active);

            // updateActiveClass 함수
            function updateActiveClass(slide) {
                bgItems.forEach((item, i) => {
                    if (i === slide) {
                        item.classList.add(styles.active);
                    } else {
                        item.classList.remove(styles.active);
                    }
                });
                textAreas.forEach((item, i) => {
                    if (i === slide) {
                        item.classList.add(styles.active);
                    } else {
                        item.classList.remove(styles.active);
                    }
                });
            }

            // Swiper 초기화는 컴포넌트에서 처리
            // serviceSwiper가 변경되면 이벤트 리스너 추가
            if (serviceSwiper) {
                serviceSwiper.on("slideChange", function () {
                    updateActiveClass(this.realIndex);
                });
            }
        });

        return () => {
            mm.revert();
            ScrollTrigger.getAll().forEach((trigger) => {
                // if (trigger.vars?.trigger === section || section.contains(trigger.vars?.trigger)) {
                //   trigger.kill();
                // }
            });
        };
    }, [lenis, serviceSwiper]);

    return (
        <section ref={sectionRef} className={styles["sc-service"]}>
            {/* title-wrap */}
            <div className={styles["title-wrap"]}>
                <div className={styles.sticky}>
                    <div className={styles["title-area"]}>
                        <h2 className={styles.title}>
                            <div className={styles.bg} />
                            <Image
                                src="/assets/main/img-service-text.webp"
                                alt="당신을 위한 폭넓은 선택"
                                width={800} height={200}
                                className={styles.show}
                            />
                        </h2>
                    </div>
                </div>
            </div>

            {/* slide-wrap */}
            <div className={styles["slide-wrap"]}>
                <div className={styles.sticky}>
                    {/* PC 영역 */}
                    <div className={styles.pc}>
                        {/* nav */}
                        <nav className={styles.nav}>
                            <span className={styles.text}>진료과목</span>
                            <ol className={styles["nav-list"]}>
                                <li className={`${styles["nav-item"]} ${styles.active}`}>
                                    <a href="#svc-section-01">01. 시력교정</a>
                                </li>
                                <li className={styles["nav-item"]}>
                                    <a href="#svc-section-02">02. 투데이라섹</a>
                                </li>
                                <li className={styles["nav-item"]}>
                                    <a href="#svc-section-03">03. 노안백내장</a>
                                </li>
                                <li className={styles["nav-item"]}>
                                    <a href="#svc-section-04">04. 눈종합검진</a>
                                </li>
                            </ol>
                        </nav>

                        {/* img-box (PC 이미지 4장) */}
                        <div className={styles["img-box"]}>
                            <Image
                                src="/assets/main/img-service01.webp"
                                alt="시력교정"
                                fill
                                className={`${styles.img} ${styles.show}`}
                            />
                            <Image
                                src="/assets/main/img-service02.webp"
                                alt="투데이라섹"
                                fill
                                className={styles.img}
                            />
                            <Image
                                src="/assets/main/img-service03.webp"
                                alt="노안백내장"
                                fill
                                className={styles.img}
                            />
                            <Image
                                src="/assets/main/img-service04.webp"
                                alt="눈종합검진"
                                fill
                                className={styles.img}
                            />
                        </div>
                    </div>

                    {/* MO 영역 (Swiper 그대로 재사용) */}
                    <div className={styles.mo}>
                        <Swiper
                            modules={[Autoplay]}
                            slidesPerView={1.2}
                            spaceBetween={40}
                            loop={true}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            onSwiper={setServiceSwiper}
                            className={styles["swiper-service"]}
                        >
                            <SwiperSlide>
                                <span className={styles.num}>01. 시력교정</span>
                                <div className={styles["img-box"]}>
                                    <Image
                                        src="/assets/main/img-service01.webp"
                                        alt="시력교정"
                                        fill
                                        className={styles.img}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <span className={styles.num}>02. 투데이라섹</span>
                                <div className={styles["img-box"]}>
                                    <Image
                                        src="/assets/main/img-service02.webp"
                                        alt="투데이라섹"
                                        fill
                                        className={styles.img}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <span className={styles.num}>03. 노안백내장</span>
                                <div className={styles["img-box"]}>
                                    <Image
                                        src="/assets/main/img-service03.webp"
                                        alt="노안백내장"
                                        fill
                                        className={styles.img}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <span className={styles.num}>04. 눈종합검진</span>
                                <div className={styles["img-box"]}>
                                    <Image
                                        src="/assets/main/img-service04.webp"
                                        alt="눈종합검진"
                                        fill
                                        className={styles.img}
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    {/* bg-area */}
                    <div className={styles["bg-area"]}>
                        <div className={`${styles["bg-item"]} ${styles.active}`} />
                        <div className={styles["bg-item"]} />
                        <div className={styles["bg-item"]} />
                        <div className={styles["bg-item"]} />
                    </div>

                    {/* bg_txt_area */}
                    <div className={styles["bg_txt_area"]}>
                        <Image
                            src="/assets/main/service_bg_text.webp"
                            alt="서비스 배경 텍스트"
                            fill
                            className={styles.img}
                        />
                        <Image
                            src="/assets/main/service_bg_text.webp"
                            alt="서비스 배경 텍스트"
                            fill
                            className={styles.img}
                        />
                    </div>

                    {/* text-wrap */}
                    <div className={styles["text-wrap"]}>
                        <div className={`${styles["text-area"]} ${styles.active}`} id="svc-section-01">
                            <div className={styles["title-box"]}>
                                <span className={styles.text}>Vision Correction</span>
                                <strong className={styles.title}>내 눈에 가장 잘 맞는 수술</strong>
                            </div>
                            <p className={styles.desc}>
                                각자의 눈 상태, 생활 습관, 취미, 직업 환경을
                                고려한 다양한 시력교정 방법을 제공합니다.
                                눈 건강과 일상에 맞춘 맞춤형 시력교정으로
                                더 선명하고 편안한 하루를 선물합니다.
                            </p>
                            <a
                                href="https://oklasik.com/?p=27"
                                target="_blank"
                                rel="noreferrer"
                                className={`${styles.link} ${styles["link-service"]} ${styles.pc}`}
                            >
                                <i className={`${styles.ico} ${styles["ico-service"]}`} />
                            </a>
                        </div>

                        <div className={styles["text-area"]} id="svc-section-02">
                            <div className={styles["title-box"]}>
                                <span className={styles.text}>2DAY LASEK</span>
                                <strong className={styles.title}>
                                    2일만에 빠른 상처회복, <br />
                                    일상회복
                                </strong>
                            </div>
                            <p className={styles.desc}>
                                기존 라섹의 단점을 개선하여 눈부심과 안구건조증 등 부작용이 줄어들었습니다.
                                회복기간 역시 개선되어 평균적으로 2일이면 일상생활이 가능합니다.
                                커스텀 옵션을 통해 선명한 시력의 질을 기대할 수 있습니다.
                            </p>
                            <a
                                href="https://oklasik.com/?p=21"
                                target="_blank"
                                rel="noreferrer"
                                className={`${styles.link} ${styles["link-service"]} ${styles.pc}`}
                            >
                                <i className={`${styles.ico} ${styles["ico-service"]}`} />
                            </a>
                        </div>

                        <div className={styles["text-area"]} id="svc-section-03">
                            <div className={styles["title-box"]}>
                                <span className={styles.text}>Presbyopia ◦ Cataract</span>
                                <strong className={styles.title}>노안백내장 다양한 인공수정체</strong>
                            </div>
                            <p className={styles.desc}>
                                개인의 눈 상태에 따라 다양한 인공수정체를 선택할 수 있어
                                노안과 백내장을 동시에 개선하는 맞춤형 시력 회복이 가능합니다.
                                대학병원 수준의 정밀 검사와 첨단 수술 장비를 통해
                                신뢰할 수 있는 진료를 제공합니다.
                            </p>
                            <a
                                href="https://oklasik.com/?p=53"
                                target="_blank"
                                rel="noreferrer"
                                className={`${styles.link} ${styles["link-service"]} ${styles.pc}`}
                            >
                                <i className={`${styles.ico} ${styles["ico-service"]}`} />
                            </a>
                        </div>

                        <div className={styles["text-area"]} id="svc-section-04">
                            <div className={styles["title-box"]}>
                                <span className={styles.text}>General Eye Medical Check-up</span>
                                <strong className={styles.title}>ALL IN ONE 종합 검진</strong>
                            </div>
                            <p className={styles.desc}>
                                불필요한 검사는 없습니다. 꼭 필요한 항목을 포함한
                                All-in-One 눈 종합검진으로 실명 위험 질환을 조기에
                                발견하고 눈 건강을 지킬 수 있습니다.
                            </p>
                            <a
                                href="https://oklasik.com/?p=17"
                                target="_blank"
                                rel="noreferrer"
                                className={`${styles.link} ${styles["link-service"]} ${styles.pc}`}
                            >
                                <i className={`${styles.ico} ${styles["ico-service"]}`} />
                            </a>
                        </div>
                    </div>

                    {/* wave */}
                    <div className={styles.wave} />
                </div>
            </div>
        </section>
    );
}
