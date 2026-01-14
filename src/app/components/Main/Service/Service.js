"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Service.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLenis } from "@/app/hooks/useLenis";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
            if (lenis) lenis.stop();
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            setTimeout(() => {
              if (lenis) lenis.start();
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
          if (lenis) lenis.stop();
          document.body.style.paddingRight = `${scrollbarWidth}px`;
          titleTl.play();
          setTimeout(() => {
            if (lenis) lenis.start();
            document.body.style.paddingRight = "0";
          }, 1000);
        },
        onLeaveBack: () => {
          if (lenis) lenis.stop();
          document.body.style.paddingRight = `${scrollbarWidth}px`;
          titleTl.reverse();
          setTimeout(() => {
            if (lenis) lenis.start();
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
              const sectionTop = slideWrap.offsetTop + (slideWrap.offsetHeight / bgItems.length) * idx;

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
            if (lenis) lenis.stop();
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            setTimeout(() => {
              if (lenis) lenis.start();
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
          if (lenis) lenis.stop();
          document.body.style.paddingRight = `${scrollbarWidth}px`;
          titleTl.play();
          setTimeout(() => {
            if (lenis) lenis.start();
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
          if (lenis) lenis.stop();
          document.body.style.paddingRight = `${scrollbarWidth}px`;
          titleTl.reverse();
          setTimeout(() => {
            if (lenis) lenis.start();
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
      <div className={styles["title-wrap"]}>
        <div className={styles["title-area"]}>
          <h2 className={styles.title}>폭넓은 선택</h2>
        </div>
      </div>
      <div className={styles["slide-wrap"]}>
        <nav className={styles.nav}>
          <ul>
            <li className={styles["nav-item"]}>
              <a href="#service1">서비스1</a>
            </li>
            <li className={styles["nav-item"]}>
              <a href="#service2">서비스2</a>
            </li>
            <li className={styles["nav-item"]}>
              <a href="#service3">서비스3</a>
            </li>
          </ul>
        </nav>
        <div className={styles["bg-area"]}>
          <div className={styles["bg-item"]}>배경1</div>
          <div className={styles["bg-item"]}>배경2</div>
          <div className={styles["bg-item"]}>배경3</div>
        </div>
        <div className={styles["text-wrap"]}>
          <div className={styles["text-area"]}>텍스트1</div>
          <div className={styles["text-area"]}>텍스트2</div>
          <div className={styles["text-area"]}>텍스트3</div>
        </div>
        <div className={styles["img-box"]}>
          <div className={styles.img}>이미지1</div>
          <div className={styles.img}>이미지2</div>
          <div className={styles.img}>이미지3</div>
        </div>
        {/* 모바일 Swiper */}
        <div className={styles.mo}>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.2}
            spaceBetween={40}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onSwiper={setServiceSwiper}
            className={styles["swiper-service"]}
          >
            <SwiperSlide>슬라이드1</SwiperSlide>
            <SwiperSlide>슬라이드2</SwiperSlide>
            <SwiperSlide>슬라이드3</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
