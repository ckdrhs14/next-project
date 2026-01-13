'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './MainSlider.module.css';

export default function MainSlider() {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const handleSwiper = (swiper) => {
        setSwiperInstance(swiper);
        setCurrentSlideIndex(swiper.activeIndex); 
    };

    useEffect(() => {
        if (swiperInstance) {
        const updateSlideInfo = () => {
            setCurrentSlideIndex(swiperInstance.activeIndex);
        };
        swiperInstance.on('slideChange', updateSlideInfo);

        return () => {
            swiperInstance.off('slideChange', updateSlideInfo);
        };
        }
    }, [swiperInstance]);

    const totalSlides = swiperInstance ? swiperInstance.slides.length : 0;

    return (
        <div className={styles.mainSlider}>
            <Swiper
                className={styles.mainSwiper} 
                modules={[Autoplay, Pagination, EffectFade]}
                loop={true} 
                effect={'fade'}
                fadeEffect={{
                    crossFade:true,
                }}
                slidesPerView={1} 
                spaceBetween={0}
                speed={800}
                // autoplay={{
                //     // delay: 3000,
                //     // disableOnInteraction: false,
                // }}
                pagination={{
                    el: `.${styles['swiper-custom-pagination']}`, 
                    clickable: true,
                    renderBullet: function (index,className) {
                        return `<span class="${className} ${styles['custom-bullet']}">
                        <button type="button" class="btn play"><span class="blind">실행</span></button>
                        <button type="button" class="btn stop"><span class="blind">정지</span></button>
                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <circle class="circle" cx="20" cy="20" r="19" fill="none" stroke="#fff" stroke-width="2"></circle>
                        </svg>
                        </span>`;
                    },
                }}
                onSwiper={handleSwiper}
                navigation={false}
            >
                <SwiperSlide>
                    <img src="/assets/main/main_slider_01.png" alt="Slide 1" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>당신의 시력을 책임질 밝은성모안과</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>나이에 상관없이</p></div>
                            <div><p>누구에게나 선명한 세상을</p></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/main/main_slider_02.png" alt="Slide 2" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>본연의 눈에 가장 가까운 편안함과 선명함을 선사합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>정교함의 끝, 실크라식</p></div>
                            <div><p>선명함의 기준을 높이다</p></div>
                        </div>
                        <Link href="/" target="_blank" className="btn_theme_1">
                            <span>바로가기</span>
                        </Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <video src="/assets/main/main_slider_03.mp4" alt="Slide 3" autoPlay={true} muted={true} loop={true} />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>빠른 속도와 정확도로 높은 수준의 시력을 제공합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>지능적이고 혁신적인 기술</p></div>
                            <div><p>아토스 스마트 스마일라식</p></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/main/main_slider_04.jpg" alt="Slide 4" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>단 2일만의 상처회복, 일상회복이 가능합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>올레이저로 안전하고 정밀하게</p></div>
                            <div><p>만족도 높은 투데이 라섹</p></div>
                        </div>
                        <Link href="/" target="_blank" className="btn_theme_1">
                            <span>바로가기</span>
                        </Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/main/main_slider_05.jpg" alt="Slide 5" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>다양한 인공수정체로 눈 특성에 맞는 맞춤수술이 가능합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>밝은성모안과만의 검증된</p></div>
                            <div><p>노안·백내장 수술</p></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/main/main_slider_06.jpg" alt="Slide 6" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>건조하고 불편한 안구건조증도 치료가 가능합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>신의료기술로 등재된</p></div>
                            <div><p>아쿠아셀 IPL 레이저</p></div>
                        </div>
                        <Link href="/" target="_blank" className="btn_theme_1">
                            <span>바로가기</span>
                        </Link>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className={styles['swiper-option-box']}>
                <div className={styles['swiper-custom-pagination']}></div>

                <div className={styles.numbering}>
                    <span className={styles.current}>{currentSlideIndex + 1}</span> <span className={styles.bar}>/</span> <span>{totalSlides}</span>
                </div>
            </div>
            
        </div>
    );
}