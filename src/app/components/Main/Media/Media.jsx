"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Media.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Media() {
    const [activeTab, setActiveTab] = useState("media1");
    const [allSwiper, setAllSwiper] = useState(null);
    const [ytSwiper, setYtSwiper] = useState(null);
    const [newsSwiper, setNewsSwiper] = useState(null);

    // 더미 데이터 (실제로는 API나 props로 받아올 수 있음)
    const youtubeData = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `유튜브 영상 ${i + 1}`,
        img: "/assets/main/media-youtube-sample-01.jpg",
        linkUrl: `https://youtube.com/watch?v=${i + 1}`,
        linkTarget: "_blank",
        source_type: "youtube",
    }));

    const newsData = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `언론보도 ${i + 1}`,
        img: "/assets/main/media-news-sample-01.jpg",
        idx: i + 1,
        linkTarget: "_blank",
        source_type: "media",
    }));

    // 전체 탭용 데이터 (유튜브 + 뉴스 합친 것)
    const allData = [
        ...youtubeData.map((item) => ({ ...item, source_type: "youtube", uniqueId: `yt-${item.id}` })),
        ...newsData.map((item) => ({ ...item, source_type: "media", uniqueId: `news-${item.id}` }))
    ];

    useEffect(() => {
        // 탭 전환 후 해당 swiper 업데이트
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

    const getMediaLink = (item) => {
        if (item.source_type === "media") {
            return `https://oklasik.com/?p=15&page=1&viewMode=view&idx=${item.idx}&searchTxt=&cate=3`;
        }
        return item.linkUrl || "#";
    };

    return (
        <section className={styles["sc-media"]}>
            <div className={styles["bg-area"]}>
                <p className={styles.txt}>
                    An eye care practice that <br />
                    adheres to fundamentals <br />
                    and principles
                </p>
            </div>
            <div className={styles["title-area"]}>
                <h2 className={styles.title} data-aos="fade-up">
                    밝은성모안과 미디어룸
                </h2>
            </div>
            <div className={styles.contents}>
                <div className={styles["tab-menu"]} data-aos="fade-up">
                    <ul className={styles["tab-list"]}>
                        <li
                            className={`${styles["tab-item"]} ${activeTab === "media1" ? styles.active : ""}`}
                            data-tab="#media1"
                            onClick={() => handleTabClick("media1")}
                        >
                            <button className={styles["tab-txt"]}>전체</button>
                        </li>
                        <li
                            className={`${styles["tab-item"]} ${activeTab === "media2" ? styles.active : ""}`}
                            data-tab="#media2"
                            onClick={() => handleTabClick("media2")}
                        >
                            <button className={styles["tab-txt"]}>유튜브</button>
                        </li>
                        <li
                            className={`${styles["tab-item"]} ${activeTab === "media3" ? styles.active : ""}`}
                            data-tab="#media3"
                            onClick={() => handleTabClick("media3")}
                        >
                            <button className={styles["tab-txt"]}>언론보도</button>
                        </li>
                    </ul>
                </div>

                <div className={styles["tab-con"]} data-aos="fade-up">
                    <div id="media1" className={`${styles.con} ${activeTab === "media1" ? styles.active : ""}`}>
                        <Swiper
                            modules={[]}
                            slidesPerView="auto"
                            spaceBetween={15}
                            onSwiper={setAllSwiper}
                            className={`${styles["all-swiper"]} ${styles.swiper}`}
                        >
                            {allData.map((item) => (
                                <SwiperSlide key={item.uniqueId} className={styles["swiper-slide"]}>
                                    <a
                                        href={getMediaLink(item)}
                                        className={styles["link-media"]}
                                        target={item.linkTarget || "_blank"}
                                        rel="noreferrer"
                                    >
                                        <div className={styles["img-area"]}>
                                            <Image src={item.img} alt={item.title} fill />
                                        </div>
                                        <div className={styles["txt-area"]}>
                                            <div className={styles["ttl-area"]}>
                                                <div className={styles["tag-list"]}>
                                                    <span
                                                        className={`${styles.tag} ${item.source_type === "media" ? styles["tag-blue"] : styles["tag-red"]
                                                            }`}
                                                    >
                                                        {item.source_type === "media" ? "언론보도" : "유튜브"}
                                                    </span>
                                                </div>
                                                <h3 className={styles.title}>{item.title}</h3>
                                            </div>
                                        </div>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* 유튜브 탭 */}
                    <div id="media2" className={`${styles.con} ${activeTab === "media2" ? styles.active : ""}`}>
                        <Swiper
                            slidesPerView="auto"
                            spaceBetween={15}
                            watchSlidesProgress={true}
                            onSwiper={setYtSwiper}
                            className={`${styles["yt-swiper"]} ${styles.swiper}`}
                        >
                            {youtubeData.map((item) => (
                                <SwiperSlide key={`yt-${item.id}`} className={styles["swiper-slide"]}>
                                    <a
                                        href={item.linkUrl}
                                        className={styles["link-media"]}
                                        target={item.linkTarget || "_blank"}
                                        rel="noreferrer"
                                    >
                                        <div className={styles["img-area"]}>
                                            <Image src={item.img} alt={item.title} fill />
                                        </div>
                                        <div className={styles["txt-area"]}>
                                            <div className={styles["ttl-area"]}>
                                                <div className={styles["tag-list"]}>
                                                    <span className={`${styles.tag} ${styles["tag-red"]}`}>유튜브</span>
                                                </div>
                                                <h3 className={styles.title}>{item.title}</h3>
                                            </div>
                                        </div>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* 언론보도 탭 */}
                    <div id="media3" className={`${styles.con} ${activeTab === "media3" ? styles.active : ""}`}>
                        <Swiper
                            modules={[]}
                            slidesPerView="auto"
                            spaceBetween={15}
                            watchSlidesProgress={true}
                            onSwiper={setNewsSwiper}
                            className={`${styles["news-swiper"]} ${styles.swiper}`}
                        >
                            {newsData.map((item) => (
                                <SwiperSlide key={`news-${item.id}`} className={styles["swiper-slide"]}>
                                    <a
                                        href={`https://oklasik.com/?p=15&page=1&viewMode=view&idx=${item.idx}&searchTxt=&cate=3`}
                                        className={styles["link-media"]}
                                        target={item.linkTarget || "_blank"}
                                        rel="noreferrer"
                                    >
                                        <div className={styles["img-area"]}>
                                            <Image src={item.img} alt={item.title} fill />
                                        </div>
                                        <div className={styles["txt-area"]}>
                                            <div className={styles["ttl-area"]}>
                                                <div className={styles["tag-list"]}>
                                                    <span className={`${styles.tag} ${styles["tag-blue"]}`}>언론보도</span>
                                                </div>
                                                <h3 className={styles.title}>{item.title}</h3>
                                            </div>
                                        </div>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
