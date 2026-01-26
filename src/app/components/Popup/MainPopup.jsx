"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './MainPopup.module.scss';

export default function MainPopup() {
    const [isChecked, setIsChecked] = useState(false);
    const [isVisible, setIsVisible] = useState(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [mobileSwiperInstance, setMobileSwiperInstance] = useState(null);
    const [mobileActiveSlideIndex, setMobileActiveSlideIndex] = useState(0);

    // 쿠키 설정 함수 (24시간 유효)
    const setCookie = (name, value, hours) => {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    };

    // 쿠키 읽기 함수
    const getCookie = (name) => {
        if (typeof window === 'undefined') return null;
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    // 컴포넌트 마운트 후 쿠키 확인 및 상태 설정 (클라이언트에서만 실행)
    useEffect(() => {
        const cookieValue = getCookie('mainPopupHide');
        const shouldShow = cookieValue !== 'true'; // 쿠키가 있으면 false, 없으면 true
        setIsVisible(shouldShow);
    }, []);

    const handleClose = () => {
        // 체크박스가 체크되어 있으면 쿠키 저장 (24시간)
        if (isChecked) {
            setCookie('mainPopupHide', 'true', 24);
        }
        setIsVisible(false);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    // remote_list 클릭 핸들러
    const handleRemoteListClick = (index) => {
        if (swiperInstance) {
            swiperInstance.slideTo(index);
        }
    };

    // 초기 상태(null)이거나 쿠키가 있으면 컴포넌트를 렌더링하지 않음
    if (isVisible === null || !isVisible) {
        return null;
    }

    // 모바일 팝업 데이터
    const popupData = [
        { id: 1, image: '/assets/popup/popup-sample-01-m.jpg', link: 'https://www.oklasik.com/?p=39_view&idx=38&page=1&searchTxt=' },
        { id: 2, image: '/assets/popup/popup-sample-02-m.jpg', link: 'https://oklasik.com/?p=39_view&idx=24&page=1&searchTxt=' },
        { id: 3, image: '/assets/popup/popup-sample-01-m.jpg', link: 'https://www.oklasik.com/?p=39_view&idx=38&page=1&searchTxt=' },
        { id: 4, image: '/assets/popup/popup-sample-02-m.jpg', link: 'https://oklasik.com/?p=39_view&idx=24&page=1&searchTxt=' },
        { id: 5, image: '/assets/popup/popup-sample-01-m.jpg', link: 'https://www.oklasik.com/?p=39_view&idx=38&page=1&searchTxt=' },
        { id: 6, image: '/assets/popup/popup-sample-02-m.jpg', link: 'https://oklasik.com/?p=39_view&idx=24&page=1&searchTxt=' },
        { id: 7, image: '/assets/popup/popup-sample-01-m.jpg', link: 'https://www.oklasik.com/?p=39_view&idx=38&page=1&searchTxt=' },
        { id: 8, image: '/assets/popup/popup-sample-02-m.jpg', link: 'https://oklasik.com/?p=39_view&idx=24&page=1&searchTxt=' },

    ];

    // PC용 팝업 데이터
    const popupDataPC = [
        { id: 1, image: '/assets/popup/popup-sample-01.jpg', link: 'https://www.oklasik.com/?p=39_view&idx=38&page=1&searchTxt=' },
        { id: 2, image: '/assets/popup/popup-sample-02.jpg', link: 'https://oklasik.com/?p=39_view&idx=24&page=1&searchTxt=' },
        { id: 3, image: '/assets/popup/popup-sample-01.jpg', link: 'https://www.oklasik.com/?p=39_view&idx=38&page=1&searchTxt=' },
        { id: 4, image: '/assets/popup/popup-sample-02.jpg', link: 'https://oklasik.com/?p=39_view&idx=24&page=1&searchTxt=' },
        { id: 5, image: '/assets/popup/popup-sample-01.jpg', link: 'https://www.oklasik.com/?p=39_view&idx=38&page=1&searchTxt=' },
        { id: 6, image: '/assets/popup/popup-sample-02.jpg', link: 'https://oklasik.com/?p=39_view&idx=24&page=1&searchTxt=' },
        { id: 7, image: '/assets/popup/popup-sample-01.jpg', link: 'https://www.oklasik.com/?p=39_view&idx=38&page=1&searchTxt=' },
        { id: 8, image: '/assets/popup/popup-sample-02.jpg', link: 'https://oklasik.com/?p=39_view&idx=24&page=1&searchTxt=' },
    ];

    return (
        <div className={styles.main_popup_wrap}>
            {/* 1200px 이하 기존 팝업 */}
            <div className={styles.main_popup}>
                <div className={styles.main_popup_top}>
                    <div className={styles.paging}>
                        <span className={styles.current}>{mobileActiveSlideIndex + 1}</span>
                        <span className={styles.barSpace}>/</span>
                        <span className={styles.total}>{popupData.length}</span>
                    </div>
                    <ul className={styles.main_popup_nav}>
                        <li>
                            <button 
                                className={styles.swiper_button_prev_popup} 
                                title="슬라이드 이전으로 넘기기" 
                                tabIndex={0} 
                                role="button" 
                                aria-label="Previous slide"
                                onClick={() => {
                                    if (mobileSwiperInstance) {
                                        mobileSwiperInstance.slidePrev();
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="1em" fill="#fff">
                                    <path d="M-1.9 256l17-17L207 47l17-17L257.9 64 241 81 65.9 256 241 431l17 17L224 481.9l-17-17L15 273l-17-17z"></path>
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button 
                                className={styles.swiper_button_next_popup} 
                                title="슬라이드 다음으로 넘기기" 
                                tabIndex={0} 
                                role="button" 
                                aria-label="Next slide"
                                onClick={() => {
                                    if (mobileSwiperInstance) {
                                        mobileSwiperInstance.slideNext();
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="1em" fill="#fff">
                                    <path d="M321.9 256l-17 17L113 465l-17 17L62.1 448l17-17 175-175L79 81l-17-17L96 30.1l17 17L305 239l17 17z"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={styles.main_popup_mid}>
                    <Swiper
                        className={styles.main_popup_slide}
                        onSwiper={(swiper) => {
                            setMobileSwiperInstance(swiper);
                            setMobileActiveSlideIndex(swiper.realIndex);
                        }}
                        onSlideChange={(swiper) => {
                            setMobileActiveSlideIndex(swiper.realIndex);
                        }}
                        slidesPerView={2}
                        spaceBetween={15}
                        loop={true}
                    >
                        {popupData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className={styles.img}>
                                    <Link href={item.link} target="_self">
                                        <Image src={item.image} alt="" width={800} height={600} sizes="100vw" loading="lazy" style={{ width: '100%', height: 'auto' }} />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={styles.main_popup_btm}>
                    <div className={styles.main_popup_close_wrap}>
                        <label htmlFor="popupCheck1">
                            <input
                                type="checkbox"
                                id="popupCheck1"
                                className={`blind ${styles.popup_check}`}
                                tabIndex={1}
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <span className={styles.svg}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className={`${styles.off} ${!isChecked ? styles.show : ''}`}>
                                    <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className={`${styles.on} ${isChecked ? styles.show : ''}`}>
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                                </svg>
                            </span>
                            오늘 하루 그만 보기
                        </label>
                        <button type="button" className={styles.main_popup_close} onClick={handleClose} tabIndex={1}>
                            닫기
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="1.2em" fill="#fff">
                                <path className={styles.fa_secondary} opacity=".4" d=""></path>
                                <path className={styles.fa_primary} d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.6 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* 1200px 이상 새 팝업 */}
            <div className={styles.popup_group_1} id="popup_group_1">
                <div className={styles.group_1_swi_gr}>
                    <Swiper
                        className={`${styles.group_1_swiper} ${styles.is_8layout}`}
                        onSwiper={setSwiperInstance}
                        onSlideChange={(swiper) => {
                            setActiveSlideIndex(swiper.activeIndex);
                        }}
                    >
                        {popupDataPC.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Link href={item.link} target="_self">
                                    <Image src={item.image} alt="" width={1190} height={800} sizes="100vw" loading="lazy" style={{ width: '100%', height: 'auto' }} />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className={styles.group_1_remote_gr}>
                        {popupDataPC.map((item, index) => (
                            <div
                                key={item.id}
                                className={`${styles.group_1_remote_list} ${activeSlideIndex === index ? styles.on : ''}`}
                                onClick={() => handleRemoteListClick(index)}
                            >
                                <span>이벤트 {index + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.main_popup_btm}>
                    <div className={styles.main_popup_close_wrap}>
                        <label htmlFor="popupCheck2">
                            <input
                                type="checkbox"
                                id="popupCheck2"
                                className={`blind ${styles.popup_check}`}
                                tabIndex={1}
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <span className={styles.svg}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className={`${styles.off} ${!isChecked ? styles.show : ''}`}>
                                    <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className={`${styles.on} ${isChecked ? styles.show : ''}`}>
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                                </svg>
                            </span>
                            오늘 하루 그만 보기
                        </label>
                        <button type="button" className={styles.main_popup_close} onClick={handleClose} tabIndex={1}>
                            닫기
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="1.2em" fill="#fff">
                                <path className={styles.fa_secondary} opacity=".4" d=""></path>
                                <path className={styles.fa_primary} d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.6 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* 팝업 dim */}
            <div className={styles.main_popup_bg} onClick={handleClose}></div>
        </div>
    );
}
