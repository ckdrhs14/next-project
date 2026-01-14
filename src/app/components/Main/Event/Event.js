"use client";

import { useEffect, useRef } from "react";
import styles from "./Event.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Event() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Swiper는 컴포넌트에서 직접 처리
  }, []);

  return (
    <section ref={sectionRef} className={styles["sc-event"]}>
      <div className={styles.container}>
        <h2 className={styles.title}>이벤트</h2>
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={15}
          navigation={{
            nextEl: `.${styles["swiper-btn"]}.${styles.next}`,
            prevEl: `.${styles["swiper-btn"]}.${styles.prev}`,
          }}
          breakpoints={{
            768: {
              spaceBetween: 40,
            },
          }}
        >
          {[...Array(5)].map((_, i) => (
            <SwiperSlide key={i} className={styles.slide}>
              <div className={styles["event-item"]}>
                <img src={`/assets/main/img-event${i + 1}.webp`} alt={`event ${i + 1}`} />
                <h3>이벤트 {i + 1}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles["swiper-btn"] + " " + styles.prev}>이전</div>
        <div className={styles["swiper-btn"] + " " + styles.next}>다음</div>
      </div>
    </section>
  );
}
