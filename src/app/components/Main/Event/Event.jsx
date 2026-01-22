"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./Event.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Event() {
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    // 더미 이벤트 데이터 (실제로는 API나 props로 받아올 수 있음)
    const eventData = [
        { id: 1, title: "이벤트 1", sDate: "2026-01-01", eDate: "2026-01-31", img: "/assets/main/event-sample01.jpg" },
        { id: 2, title: "이벤트 2", sDate: "2026-02-01", eDate: "2026-02-28", img: "/assets/main/event-sample02.gif" },
        { id: 3, title: "이벤트 3", sDate: "2026-03-01", eDate: "2026-03-31", img: "/assets/main/event-sample03.jpg" },
        { id: 4, title: "이벤트 4", sDate: "2026-04-01", eDate: "2026-04-30", img: "/assets/main/event-sample04.jpg" },
        { id: 5, title: "이벤트 5", sDate: "2026-05-01", eDate: "2026-05-31", img: "/assets/main/event-sample05.jpg" },
        { id: 6, title: "이벤트 6", sDate: "2026-06-01", eDate: "2026-06-31", img: "/assets/main/event-sample06.jpg" },
    ];

    return (
        <section className={styles["sc-event"]}>
            <div className={`${styles.inner} ${styles.type02}`}>
                <div className={styles["title-area"]} data-aos="fade-up">
                    <h2 className={styles.title}>밝은성모안과 EVENT</h2>
                    <p className={styles.desc}>
                        밝은성모안과에서 진행 중인 다양한 이벤트를 확인해보세요.
                    </p>
                </div>
                <div className={styles.contents}>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={4}
                        spaceBetween={15}
                        className={`${styles["event-swiper"]} ${styles.swiper}`}
                        navigation={false}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevButtonRef.current;
                            swiper.params.navigation.nextEl = nextButtonRef.current;
                        }}
                        onInit={(swiper) => {
                            if (prevButtonRef.current && nextButtonRef.current) {
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                        data-aos="fade-up"
                    >
                        {eventData.map((event) => (
                            <SwiperSlide key={event.id} className={styles["swiper-slide"]}>
                                <a
                                    href={`https://oklasik.com/?p=39_view&idx=${event.id}`}
                                    className={styles.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <div className={styles.thumbnail}>
                                        <Image src={event.img} alt={event.title} fill className={styles.img} />
                                    </div>
                                    <div className={styles["info-area"]}>
                                        <strong className={styles["link-title"]}>{event.title}</strong>
                                        <div className={styles.date}>
                                            <time dateTime={event.sDate} className={styles.start}>
                                                {event.sDate}
                                            </time>
                                            ~
                                            <time dateTime={event.eDate} className={styles.end}>
                                                {event.eDate}
                                            </time>
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}
                        <div className={styles["swiper-controller"]}>
                            <button
                                ref={prevButtonRef}
                                className={`${styles["swiper-btn"]} ${styles.prev}`}
                                aria-label="이전"
                            ></button>
                            <button
                                ref={nextButtonRef}
                                className={`${styles["swiper-btn"]} ${styles.next}`}
                                aria-label="다음"
                            ></button>
                        </div>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
