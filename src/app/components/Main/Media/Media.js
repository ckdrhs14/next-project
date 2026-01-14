"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Media.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Media() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState("media1");
  const [allSwiper, setAllSwiper] = useState(null);
  const [ytSwiper, setYtSwiper] = useState(null);
  const [newsSwiper, setNewsSwiper] = useState(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 탭 전환 후 해당 swiper 수동 업데이트
    if (activeTab === "media1" && allSwiper) {
      setTimeout(() => {
        allSwiper.update();
      }, 100);
    } else if (activeTab === "media2" && ytSwiper) {
      setTimeout(() => {
        ytSwiper.update();
      }, 100);
    } else if (activeTab === "media3" && newsSwiper) {
      setTimeout(() => {
        newsSwiper.update();
      }, 100);
    }
  }, [activeTab, allSwiper, ytSwiper, newsSwiper]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section ref={sectionRef} className={styles["sc-media"]}>
      <div className={styles.container}>
        <h2 className={styles.title}>미디어</h2>
        <div className={styles["tab-menu"]}>
          <div
            className={`${styles["tab-item"]} ${activeTab === "media1" ? styles.active : ""}`}
            data-tab="#media1"
            onClick={() => handleTabClick("media1")}
          >
            <button className={styles.btn}>전체</button>
          </div>
          <div
            className={`${styles["tab-item"]} ${activeTab === "media2" ? styles.active : ""}`}
            data-tab="#media2"
            onClick={() => handleTabClick("media2")}
          >
            <button className={styles.btn}>유튜브</button>
          </div>
          <div
            className={`${styles["tab-item"]} ${activeTab === "media3" ? styles.active : ""}`}
            data-tab="#media3"
            onClick={() => handleTabClick("media3")}
          >
            <button className={styles.btn}>뉴스</button>
          </div>
        </div>
        <div className={styles["tab-list"]}>
          <div id="media1" className={`${styles["tab-content"]} ${activeTab === "media1" ? styles.active : ""}`}>
            <Swiper modules={[]} slidesPerView="auto" onSwiper={setAllSwiper}>
              {[...Array(10)].map((_, i) => (
                <SwiperSlide key={i} className={styles.slide}>
                  <div className={styles["media-item"]}>미디어 {i + 1}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div id="media2" className={`${styles["tab-content"]} ${activeTab === "media2" ? styles.active : ""}`}>
            <Swiper modules={[]} slidesPerView="auto" watchSlidesProgress={true} onSwiper={setYtSwiper}>
              {[...Array(10)].map((_, i) => (
                <SwiperSlide key={i} className={styles.slide}>
                  <div className={styles["media-item"]}>유튜브 {i + 1}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div id="media3" className={`${styles["tab-content"]} ${activeTab === "media3" ? styles.active : ""}`}>
            <Swiper modules={[]} slidesPerView="auto" watchSlidesProgress={true} onSwiper={setNewsSwiper}>
              {[...Array(10)].map((_, i) => (
                <SwiperSlide key={i} className={styles.slide}>
                  <div className={styles["media-item"]}>뉴스 {i + 1}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
