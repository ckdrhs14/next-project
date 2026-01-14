"use client";

import { useEffect, useRef } from "react";
import styles from "./Since.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Since() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    function addCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const sinceTl02 = gsap
      .timeline({ paused: true })
      .to(`.${styles.num}`, {
        innerHTML: 400000,
        snap: { innerHTML: 1 },
        ease: "power2.inOut",
        onUpdate: function () {
          const el = this.targets()[0];
          const value = Math.ceil(Number(el.textContent.replace(/,/g, "")));

          el.innerHTML = value >= 10000 ? addCommas(value) : value;
        },
      })
      .to(
        `.${styles["text-box"]} .${styles.text}`,
        {
          yPercent: -100,
        },
        "<"
      )
      .to(
        `.${styles["desc-box"]} .${styles.desc}`,
        {
          yPercent: -100,
        },
        "<"
      );

    ScrollTrigger.create({
      trigger: `.${styles["bg-top"]}`,
      start: "100% 50%",
      end: "100% 50%",
      animation: sinceTl02,
      toggleActions: "restart none none reverse",
      onEnter: () => {
        const numEl = section.querySelector(`.${styles["title-area"]} .${styles.num}`);
        if (numEl) numEl.classList.add(styles["since-on"]);
      },
      onLeaveBack: () => {
        const numEl = section.querySelector(`.${styles["title-area"]} .${styles.num}`);
        if (numEl) numEl.classList.remove(styles["since-on"]);
      },
    });

    // bg-box scrub 애니메이션
    const bgBoxes = section.querySelectorAll(`.${styles["bg-box"]} .${styles.bg}`);
    bgBoxes.forEach((box, idx) => {
      const img = box.querySelector("img");
      if (!img) return;

      gsap.to(img, {
        y() {
          return idx % 2 === 0 ? gsap.utils.random(-50, 50) : gsap.utils.random(-100, 100);
        },
        duration: () => gsap.utils.random(0.5, 2),
        stagger: {
          each: 1,
          from: "random",
        },
        scrollTrigger: {
          trigger: `.${styles["bg-area"]}`,
          start: "0% 100%",
          end: "100%",
          scrub: gsap.utils.random(0.1, 0.5),
          invalidateOnRefresh: false,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles["sc-since"]}>
      <div className={styles.sticky}>
        <div className={styles["sticky-inner"]}>
          <h2 className={styles["title-area"]}>
            <span className={styles["title-box"]}>
              <span className={styles.num}>2000</span>
            </span>
            <span className={styles["text-box"]}>
              <span className={styles.text}>년</span>
              <span className={styles.text}>안</span>
            </span>
          </h2>
          <div className={styles["desc-box"]}>
            <span className={styles.desc}>40만 건 이상의 시력교정술</span>
            <span className={styles.desc}>우리가 만난 40만 개의 시선과 삶</span>
          </div>
          <div className={styles["scroll-area"]}>
            <div className={styles["ico-box"]}>
              <i className={`${styles["ico"]}`}></i>
            </div>
            <span className={styles["scroll-text"]}>Scroll</span>
          </div>
        </div>
      </div>
      <div className={styles["bg-area"]}>
        <div className={`${styles["bg-box"]} ${styles["bg-top"]}`}>
          <div className={styles.bg}>
            <img src="/assets/main/img-since01.webp" alt="bg" />
          </div>
          <div className={styles.bg}>
            <img src="/assets/main/img-since02.webp" alt="bg" />
          </div>
          <div className={styles.bg}>
            <img src="/assets/main/img-since03.webp" alt="bg" />
          </div>
          <div className={styles.bg}>
            <img src="/assets/main/img-since04.webp" alt="bg" />
          </div>
        </div>
        <div className={`${styles["bg-box"]} ${styles["bg-bottom"]}`}>
          <div className={styles.bg}>
            <img src="/assets/main/img-since05.webp" alt="bg" />
          </div>
          <div className={styles.bg}>
            <img src="/assets/main/img-since06.webp" alt="bg" />
          </div>
          <div className={styles.bg}>
            <img src="/assets/main/img-since07.webp" alt="bg" />
          </div>
          <div className={styles.bg}>
            <img src="/assets/main/img-since08.webp" alt="bg" />
          </div>
        </div>
      </div>
    </section>
  );
}
