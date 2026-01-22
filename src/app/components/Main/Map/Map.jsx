"use client";

import styles from "./Map.module.scss";

export default function Map() {
    const handleMessageMap = (e) => {
        e.preventDefault();
        if (typeof window !== "undefined" && window.openModal) {
            window.openModal("messageMap");
        }
    };

    return (
        <section className={styles["sc-map"]}>
            <div className={styles["map-left"]}>
                <div className={styles.inner}>
                    <div className={styles["txt-wrap"]}>
                        <div className={styles["title-area"]}>
                            <h2 className={styles.title} data-aos="fade-up">
                                밝은성모안과 오시는 길
                            </h2>
                            <span className={styles.txt} data-aos="fade-up">
                                서울시 강남구 <strong>테헤란로 110</strong> 캠브리지 빌딩 3F, 16F, 17F, 18F
                            </span>
                            <div className={styles["caution-box"]} data-aos="fade-up">
                                <p className={styles.caution}>
                                    기계식 주차로 입차가능 차량 제한이 있습니다.{" "}
                                </p>
                                <button
                                    className={styles.btn}
                                    onClick={() => {
                                        window.open(
                                            "https://oklasik.com/?p=11#carView",
                                            "_blank"
                                        );
                                    }}
                                >
                                    제한 차량 확인하기
                                </button>
                            </div>
                        </div>
                        <div className={styles["link-area"]} data-aos="fade-up">
                            <a
                                href="https://map.naver.com/p/search/%EB%B0%9D%EC%9D%80%EC%84%B1%EB%AA%A8%EC%95%88%EA%B3%BC%EC%9D%98%EC%9B%90/place/12902083?c=15.00,0,0,0,dh&placePath=%3Fentry%253Dbmp"
                                target="_blank"
                                rel="noreferrer"
                                className={`${styles.link} ${styles["link-naver"]}`}
                            >
                                <span className={styles.txt}>네이버 지도</span>
                            </a>
                            {/* <a href="https://kko.kakao.com/_DsYHkiJj-" target="_blank" className={`${styles.link} ${styles["link-kakao"]}`}><span className={styles.txt}>카카오 지도</span></a> */}
                            {/* <a href="https://map.kakao.com/?itemId=12508362" target="_blank" className={`${styles.link} ${styles["link-kakao"]}`}><span className={styles.txt}>카카오 지도</span></a> */}
                            {/* <a href="https://map.kakao.com/?urlX=506492&urlY=1110720&urlLevel=3&map_type=TYPE_MAP&map_hybrid=false" target="_blank" className={`${styles.link} ${styles["link-kakao"]}`}><span className={styles.txt}>카카오 지도</span></a> */}
                            {/* <a href="https://kko.kakao.com/py_HTN_Fus" target="_blank" className={`${styles.link} ${styles["link-kakao"]}`}><span className={styles.txt}>카카오 지도</span></a> */}
                            <a
                                href="https://place.map.kakao.com/12508362"
                                target="_blank"
                                rel="noreferrer"
                                className={`${styles.link} ${styles["link-kakao"]}`}
                            >
                                <span className={styles.txt}>카카오 지도</span>
                            </a>
                            {/* <a href="https://kko.kakao.com/pWfthNPi1r" target="_blank" className={`${styles.link} ${styles["link-kakao"]}`}><span className={styles.txt}>카카오 지도</span></a> */}
                            <a
                                href="#none"
                                className={`${styles.link} ${styles["link-bk"]}`}
                                onClick={handleMessageMap}
                            >
                                <span className={styles.txt}>문자로 약도 받기</span>
                            </a>
                        </div>
                    </div>
                    <div className={styles["way-area"]}>
                        <p className={styles.desc} data-aos="fade-up">
                            <strong>강남역 1번 출구 걸어서 1분 거리</strong>
                            <br />
                            주요 지하철역, 터미널역이 가까워서 접근성이 좋아요.
                        </p>
                        <ul className={styles["way-list"]}>
                            <li className={styles["way-item"]} data-aos="fade-up">
                                <img
                                    src="/assets/main/img-way01.webp"
                                    alt="서울역 사당"
                                    className={styles.img}
                                />
                                <em className={styles.time}>30분 소요</em>
                            </li>
                            <li className={styles["way-item"]} data-aos="fade-up">
                                <img
                                    src="/assets/main/img-way02.webp"
                                    alt="수서 선릉"
                                    className={styles.img}
                                />
                                <em className={styles.time}>20분 소요</em>
                            </li>
                            <li className={styles["way-item"]} data-aos="fade-up">
                                <img
                                    src="/assets/main/img-way03.webp"
                                    alt="고속터미널 선릉"
                                    className={styles.img}
                                />
                                <em className={styles.time}>10분 소요</em>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles["map-right"]}>
                <div id="map"></div>
            </div>
        </section>
    );
}
