"use client";

import { useEffect, useRef } from "react";
import styles from "./Standard.module.scss";
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
    const standardTop = section.querySelector(`.${styles["standard-top"]}`);
    const eyeBox = section.querySelector(
      `.${styles["standard-top"]} .${styles["eye-box"]}`
    );

    // 애니메이션 반응형
    const mm = gsap.matchMedia();

    mm.add("(min-width:769px), (max-width:768px)", (ctx) => {
      const { isMobile } = ctx.conditions;

      // 텍스트 + 이미지 타임라인
      const stTopTl = gsap
        .timeline({ paused: true })
        .to(`.${styles["standard-top"]} .${styles["title-area"]} *`, {
          opacity: 1,
          immediateRender: false,
          stagger: {
            each: 0.05,
          },
        });

      // 모바일은 onEnter 시 한 번만 재생
      if (isMobile) {
        let hasPlayed = false;

        ScrollTrigger.create({
          trigger: standardTop,
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
        // 데스크톱은 기준 지점에서 재생/리버스
        ScrollTrigger.create({
          trigger: standardTop,
          start: "0% 0%",
          end: "0% 0%",
          animation: stTopTl,
          invalidateOnRefresh: false,
          toggleActions: "restart none none reverse",
        });
      }

      // eye-box 모션 패스 애니메이션
      ScrollTrigger.create({
        trigger: standardTop,
        start: "0% 50%",
        end: "50% 50%",
        animation: gsap.fromTo(
          eyeBox,
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
        // markers: true,
      });
    });

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerNode = trigger.trigger;
        if (triggerNode instanceof Element && (triggerNode === section || section.contains(triggerNode))) {
          trigger.kill();
        }
      });
    };
  }, []);

  const corpItems = [
    {
      href: "https://oklasikbusan.com/",
      img: "/assets/main/img-standard1.svg",
      blind: "밝은성모안과의원 부산점 바로가기",
    },
    {
      href: "https://www.amc.seoul.kr/asan/main.do",
      img: "/assets/main/img-standard1.svg",
      blind: "서울아산병원 바로가기",
    },
    {
      href: "https://www.samsunghospital.com/home/main/index.do",
      img: "/assets/main/img-standard1.svg",
      blind: "삼성서울병원 바로가기",
    },
    {
      href: "https://sev.severance.healthcare/sev/index.do",
      img: "/assets/main/img-standard1.svg",
      blind: "세브란스 바로가기",
    },
    {
      href: "https://www.cmcsungmo.or.kr/page/main",
      img: "/assets/main/img-standard1.svg",
      blind: "가톨릭대학교 여의도성모병원 바로가기",
    },
    {
      href: "https://www.cmcseoul.or.kr/page/main",
      img: "/assets/main/img-standard1.svg",
      blind: "가톨릭대학교 서울성모병원 바로가기",
    },
  ];

  return (
    <section ref={sectionRef} className={styles["sc-standard"]}>
      <div className={styles["standard-top"]}>
        <div className={styles["title-area"]}>
          <h2 className={styles.title}>
            <div className={styles["img-wrap"]}>
              <img
                src="/assets/main/img-standard-text.webp"
                alt="100인의 one team 당신의 시력을 함께 지킵니다."
                className={styles.img}
              />
            </div>
          </h2>
          <p className={styles.desc}>
            의료팀부터 상담팀, 수술팀까지 당신의 소중한 시력을 위해
            <br />
            100명이 한마음으로 고민합니다.
          </p>
        </div>

        <div className={styles["path-area"]}>
          <svg
            width="1472"
            height="584"
            viewBox="0 0 1472 584"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="backPath"
              d="M1028 89.0003C1086.67 25.5003 1241.3 -65.6996 1390.5 77.5003C1577 256.5 1396 503.5 1278.5 551.5C1161 599.5 1061 596 785.5 517C510 438 287 243.5 -48.5 224C-316.9 208.4 -387.667 404.833 -389.5 505"
              stroke="black"
            />
          </svg>
        </div>

        <div className={styles["eye-box"]}>
          <img src="/assets/main/ico-eye.svg" alt="" className={styles.img} />
        </div>

        <div className={styles["doctor-img-wrap"]}>
          <img
            className={styles.pc}
            src="/assets/main/main-doctors_260116.png"
            alt="의료진 단체 사진"
          />
          <img
            className={styles.mo}
            src="/assets/main/main-doctors-m_260116.png"
            alt="의료진 단체 사진 (모바일)"
          />
        </div>
      </div>

      <div className={styles.corp}>
        <div className={`${styles.inner} ${styles.type02}`}>
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
            className={styles["swiper-corp"]}
          >
            {corpItems.map((item, i) => (
              <SwiperSlide key={i}>
                <a href={item.href} target="_blank" rel="noreferrer" className={styles.link}>
                  <img src={item.img} alt={item.blind} />
                  <span className={styles.blind}>{item.blind}</span>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
