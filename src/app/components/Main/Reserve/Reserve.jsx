"use client";

import styles from "./Reserve.module.scss";

export default function Reserve() {
    const handleNumericInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    };

    const handlePhoneInput = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "");

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length > 7) {
            value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7);
        } else if (value.length > 3) {
            value = value.slice(0, 3) + "-" + value.slice(3);
        }

        e.target.value = value;
    };

    const handleFormCheck = (e) => {
        e.preventDefault();
        if (typeof window !== "undefined" && window.qFrmChk) {
            window.qFrmChk();
        }
    };

    const handleOpenOverModal = (modalName) => {
        if (typeof window !== "undefined" && window.openOverModal) {
            window.openOverModal(modalName);
        }
    };

    return (
        <section className={styles["sc-reserve"]}>
            <div className={`${styles.inner} ${styles.type02}`}>
                <div className={styles["reserve-left"]}>
                    <h2 className={styles.title} data-aos="fade-up">
                        비용 상담 신청
                    </h2>
                    <p className={styles.desc} data-aos="fade-up">
                        상담 신청을 남겨주시면 담당자 확인 후 연락드립니다.
                    </p>
                    <form
                        className={styles.form}
                        data-aos="fade-up"
                        id="qFrm"
                        name="qFrm"
                    >
                        <fieldset>
                            <legend>상담신청</legend>
                            <div className={styles["form-group"]}>
                                <div className={styles["form-box"]}>
                                    <input
                                        type="text"
                                        id="qUserName"
                                        name="userName"
                                        placeholder="* 이름"
                                        className={styles["form-control"]}
                                    />
                                </div>
                                <div className={styles["form-box"]}>
                                    <input
                                        type="text"
                                        id="qUserBirth"
                                        name="userBirth"
                                        placeholder="* 나이"
                                        onInput={handleNumericInput}
                                        maxLength={2}
                                        className={styles["form-control"]}
                                    />
                                </div>
                                <div className={`${styles["form-box"]} ${styles["phone-box"]}`}>
                                    <input
                                        type="text"
                                        id="qUserPhone"
                                        name="userPhone"
                                        className={`${styles.phoneNumberFormat} ${styles["form-control"]}`}
                                        onInput={handlePhoneInput}
                                        placeholder="* 연락처(숫자만 입력해주세요.)"
                                        maxLength={13}
                                    />
                                </div>
                                {/* <div className={`${styles["form-box"]} ${styles["select-box"]}`}>
                                    <select name="" id="" className={styles["form-control"]}>
                                        <option value="" disabled selected>진료과목을 선택해주세요.</option>
                                        <option value="1">옵션 1</option>
                                        <option value="2">옵션 2</option>
                                    </select>
                                </div> */}

                                <button
                                    className={`${styles.btn} ${styles["btn-apply"]}`}
                                    type="button"
                                    onClick={handleFormCheck}
                                >
                                    <div className={styles.txt}>신청하기</div>
                                </button>
                            </div>
                            <div className={styles["fancy-area"]}>
                                <div className={styles["fancy-ani-box"]}>
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="qAgree"
                                        className="blind"
                                    />
                                    <label
                                        htmlFor="qAgree"
                                        className={styles["form-check-txt"]}
                                    ></label>
                                </div>
                                <p className={styles.chk}>
                                    <button
                                        className={styles.all}
                                        type="button"
                                        onClick={() => handleOpenOverModal("costConsultation")}
                                    >
                                        개인정보 수집 및 이용
                                    </button>
                                    에 대한 동의
                                </p>
                            </div>
                            <div
                                className="g-recaptcha"
                                data-theme="light"
                                data-sitekey="1234567890"
                            ></div>
                        </fieldset>
                    </form>
                    <div className={styles["title-area"]} data-aos="fade-up">
                        <h3 className={styles.title}>진료시간 안내</h3>
                    </div>
                    <ul className={styles["time-list"]}>
                        <li className={styles["time-item"]} data-aos="fade-up">
                            <dl className={styles.info}>
                                <dt className={styles["info-title"]}>월화목</dt>
                                <dd className={styles["info-txt"]}>10:00 ~ 18:00</dd>
                            </dl>
                        </li>
                        <li className={styles["time-item"]} data-aos="fade-up">
                            <dl className={styles.info}>
                                <dt className={styles["info-title"]}>금요일</dt>
                                <dd className={styles["info-txt"]}>10:00 ~ 19:30</dd>
                            </dl>
                            <div className={styles["ico-box"]}>
                                <i className={`${styles.ico} ${styles.ico01}`}></i>
                                <span className={styles.txt}>야간진료</span>
                            </div>
                        </li>
                        <li className={styles["time-item"]} data-aos="fade-up">
                            <dl className={styles.info}>
                                <dt className={styles["info-title"]}>토요일</dt>
                                <dd className={styles["info-txt"]}>09:00 ~ 15:00</dd>
                            </dl>
                            <div className={styles["ico-box"]}>
                                <i className={`${styles.ico} ${styles.ico02}`}></i>
                                <span className={styles.txt}>연장진료</span>
                            </div>
                        </li>
                        <li className={styles["time-item"]} data-aos="fade-up">
                            <dl className={styles.info}>
                                <dt className={styles["info-title"]}>점 심</dt>
                                <dd className={styles["info-txt"]}>12:30 ~ 14:00</dd>
                            </dl>
                        </li>
                        <li className={styles["time-item"]} data-aos="fade-up">
                            <dl className={styles.info}>
                                <dt className={styles["info-title"]}>휴 진</dt>
                                <dd className={styles["info-txt"]}>수요일 / 일요일 / 공휴일</dd>
                            </dl>
                        </li>
                    </ul>
                    {/* <div className={styles.address} data-aos="fade-up">
                        <div className={styles["ico-box"]}>
                            <i className={`${styles.ico} ${styles.ico03}`}></i>
                            <span className={styles.txt}>전화상담</span>
                        </div>
                        <address className={styles.phone}>02.2202.1515</address>
                    </div> */}
                </div>
                <div className={styles["reserve-right"]}>
                    <div className={styles["link-area"]}>
                        <a
                            href="https://m.booking.naver.com/booking/13/bizes/573847?theme=place&area=ple"
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.link} ${styles["link-naver"]}`}
                            data-aos="fade-up"
                        >
                            <span className={styles.txt}>NAVER 예약</span>
                        </a>
                        <a
                            href="https://pf.kakao.com/_TfQNZ"
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.link} ${styles["link-kakao"]}`}
                            data-aos="fade-up"
                        >
                            <span className={styles.txt}>KAKAO 상담</span>
                        </a>
                        <a
                            href="https://www.oklasik.com/?p=41_write"
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.link} ${styles["link-online"]}`}
                            data-aos="fade-up"
                        >
                            <span className={styles.txt}>온라인상담</span>
                        </a>
                        <a
                            href="tel:0222021515"
                            className={`${styles.link} ${styles["link-phone"]}`}
                            data-aos="fade-up"
                        >
                            <span className={styles["txt-sm"]}>전화상담</span>
                            <span className={styles.txt}>02.2202.1515</span>
                        </a>
                    </div>
                    {/* <video src="inc/img/main/staff_video01.mp4" loop autoPlay muted playsInline className={styles.video}></video> */}
                </div>
            </div>
        </section>
    );
}
