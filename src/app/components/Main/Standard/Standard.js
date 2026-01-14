"use client";

import { useEffect, useRef } from "react";
import styles from "./Standard.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Standard() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    // 애니메이션 반응형
    const mm = gsap.matchMedia();

    mm.add("(min-width:769px), (max-width:768px)", (ctx) => {
      const { isMobile, isDesktop } = ctx.conditions;

      // 쉽게, 하지만 엄격하게 텍스트 애니메이션
      const stTopTl = gsap
        .timeline({ paused: true })
        .to(`.${styles["standard-top"]} .${styles["title-area"]} *`, {
          opacity: 1,
          immediateRender: false,
          stagger: {
            each: 0.05,
          },
        });

      if (!isMobile) {
        stTopTl.to(`.${styles["img-area"]}`, {
          xPercent: (idx) => {
            return idx < 4 ? 10 : -10;
          },
          duration: 0.4,
          opacity: 1,
          stagger: {
            each: 0.1,
            from: "center",
          },
        });
      } else {
        stTopTl
          .to(`.${styles["img-area"]}:nth-child(-n+4)`, {
            opacity: 1,
            duration: 0.4,
            stagger: {
              each: 0.1,
              from: "center",
            },
          })
          .to(
            `.${styles["img-area"]}:nth-child(n+5):nth-child(-n+8)`,
            {
              opacity: 1,
              duration: 0.4,
              stagger: {
                each: 0.1,
                from: "center",
              },
            },
            "<"
          );
      }

      // 모바일용 별도 ScrollTrigger 생성
      if (isMobile) {
        let hasPlayed = false;

        ScrollTrigger.create({
          trigger: `.${styles["standard-top"]}`,
          start: "top-=100 center",
          end: "100% 100%",
          animation: stTopTl,
          invalidateOnRefresh: false,
          onEnter: () => {
            if (!hasPlayed) {
              hasPlayed = true;
              stTopTl.play();
            }
          },
          onLeave: () => {
            hasPlayed = true;
          },
        });
      } else {
        ScrollTrigger.create({
          trigger: `.${styles["standard-top"]}`,
          start: "0% 0%",
          end: "0% 0%",
          animation: stTopTl,
          invalidateOnRefresh: false,
          toggleActions: "restart none none reverse",
        });
      }

      ScrollTrigger.create({
        trigger: `.${styles["standard-top"]}`,
        start: "0% 50%",
        end: "50% 50%",
        animation: gsap.fromTo(
          `.${styles["standard-top"]} .${styles["eye-box"]}`,
          {
            motionPath: {
              path: "#backPath",
              align: "#backPath",
              alignOrigin: [0.5, 0.5],
              start: 0,
              end: 1,
            },
          },
          {
            motionPath: {
              path: "#backPath",
              align: "#backPath",
              alignOrigin: [0.5, 0.5],
              start: 1,
              end: 0,
            },
          }
        ),
        scrub: 0,
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === section || section.contains(trigger.vars?.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles["sc-standard"]}>
      <div className={styles["standard-top"]}>
        <div className={styles["title-area"]}>
          <h2>쉽게, 하지만 엄격하게</h2>
        </div>
        <div className={styles["img-area"]}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles["img-box"]}>
              <img src={`/assets/main/img-standard${i + 1}.webp`} alt={`standard ${i + 1}`} />
            </div>
          ))}
        </div>
        <div className={styles["eye-box"]}>
          <svg viewBox="0 0 100 100">
            <path id="backPath" d="M10,50 Q50,10 90,50 Q50,90 10,50" />
          </svg>
        </div>
      </div>
      <div className={styles.corp}>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              initialSlide: 6,
              slidesPerView: 5,
            },
          }}
        >
          {[...Array(10)].map((_, i) => (
            <SwiperSlide key={i}>
              <div>기업 로고 {i + 1}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
